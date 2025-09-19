"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
    createUserSchema,
    updateUserSchema,
    resetPasswordSchema,
} from "@/lib/validations/user";
import bcrypt from "bcryptjs";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/utils/file-upload";

async function requireAdmin() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/admin/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user || user.deletedAt || user.role !== "ADMIN") {
        redirect("/admin/login");
    }

    return user;
}

export async function createUser(formData: FormData) {
    try {
        await requireAdmin();

        const rawData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: (formData.get("phone") as string) || undefined,
            position: (formData.get("position") as string) || undefined,
            role: formData.get("role") as "ADMIN" | "USER",
            password: formData.get("password") as string,
            socialLinks: {
                linkedin: (formData.get("linkedin") as string) || undefined,
                twitter: (formData.get("twitter") as string) || undefined,
                github: (formData.get("github") as string) || undefined,
                website: (formData.get("website") as string) || undefined,
            },
        };

        const validatedData = createUserSchema.parse(rawData);

        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });

        if (existingUser) {
            return { error: "User with this email already exists" };
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 12);

        let profilePath: string | null = null;
        const profileFile = formData.get("profile") as File;
        if (profileFile && profileFile.size > 0) {
            try {
                profilePath = await saveUploadedFile(
                    profileFile,
                    "uploads/profiles"
                );
            } catch (error) {
                console.error("Error saving profile image:", error);
                return { error: "Failed to upload profile image" };
            }
        }

        await prisma.user.create({
            data: {
                ...validatedData,
                password: hashedPassword,
                phone: validatedData.phone || null,
                position: validatedData.position || null,
                profile: profilePath,
                socialLinks: validatedData.socialLinks || undefined,
            },
        });

        revalidatePath("/admin/users");
        return { success: "User created successfully" };
    } catch (error) {
        console.error("Error creating user:", error);
        return { error: "Failed to create user" };
    }
}

export async function updateUser(formData: FormData) {
    try {
        await requireAdmin();

        const rawData = {
            id: formData.get("id") as string,
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: (formData.get("phone") as string) || undefined,
            position: (formData.get("position") as string) || undefined,
            role: formData.get("role") as "ADMIN" | "USER",
            password: (formData.get("password") as string) || undefined,
            socialLinks: {
                linkedin: (formData.get("linkedin") as string) || undefined,
                twitter: (formData.get("twitter") as string) || undefined,
                github: (formData.get("github") as string) || undefined,
                website: (formData.get("website") as string) || undefined,
            },
        };

        const validatedData = updateUserSchema.parse(rawData);

        const existingUser = await prisma.user.findUnique({
            where: { id: validatedData.id },
        });

        if (!existingUser || existingUser.deletedAt) {
            return { error: "User not found" };
        }

        if (validatedData.email && validatedData.email !== existingUser.email) {
            const emailExists = await prisma.user.findUnique({
                where: { email: validatedData.email },
            });

            if (emailExists) {
                return { error: "Email already taken" };
            }
        }

        let profilePath: string | null = existingUser.profile;
        const profileFile = formData.get("profile") as File;
        const profileRemoved = formData.get("profile") === "";

        if (profileFile && profileFile.size > 0) {
            try {
                if (existingUser.profile) {
                    deleteUploadedFile(existingUser.profile);
                }
                profilePath = await saveUploadedFile(
                    profileFile,
                    "uploads/profiles"
                );
            } catch (error) {
                console.error("Error saving profile image:", error);
                if (
                    error instanceof Error &&
                    error.message.includes("File size")
                ) {
                    return { error: "Profile image must be less than 1MB" };
                }
                return { error: "Failed to upload profile image" };
            }
        } else if (profileRemoved) {
            if (existingUser.profile) {
                deleteUploadedFile(existingUser.profile);
            }
            profilePath = null;
        }

        const updateData: any = {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone || null,
            position: validatedData.position || null,
            role: validatedData.role,
            profile: profilePath,
            socialLinks: validatedData.socialLinks || undefined,
        };

        if (validatedData.password) {
            updateData.password = await bcrypt.hash(validatedData.password, 12);
        }

        await prisma.user.update({
            where: { id: validatedData.id },
            data: updateData,
        });

        revalidatePath("/admin/users");
        return { success: "User updated successfully" };
    } catch (error) {
        console.error("Error updating user:", error);
        return { error: "Failed to update user" };
    }
}

export async function deleteUser(id: string) {
    try {
        await requireAdmin();

        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user || user.deletedAt) {
            return { error: "User not found" };
        }

        await prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        revalidatePath("/admin/users");
        return { success: "User deleted successfully" };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { error: "Failed to delete user" };
    }
}

export async function resetUserPassword(formData: FormData) {
    try {
        await requireAdmin();

        const rawData = {
            id: formData.get("id") as string,
            password: formData.get("password") as string,
        };

        const validatedData = resetPasswordSchema.parse(rawData);

        const user = await prisma.user.findUnique({
            where: { id: validatedData.id },
        });

        if (!user || user.deletedAt) {
            return { error: "User not found" };
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 12);

        await prisma.user.update({
            where: { id: validatedData.id },
            data: { password: hashedPassword },
        });

        revalidatePath("/admin/users");
        return { success: "Password reset successfully" };
    } catch (error) {
        console.error("Error resetting password:", error);
        return { error: "Failed to reset password" };
    }
}

export async function getUsers() {
    try {
        await requireAdmin();

        const users = await prisma.user.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                position: true,
                role: true,
                profile: true,
                socialLinks: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
