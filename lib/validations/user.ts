import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional().or(z.literal("")),
    position: z.string().optional().or(z.literal("")),
    role: z.enum(["ADMIN", "USER"]),
    profile: z.string().optional().or(z.literal("")),
    socialLinks: z
        .object({
            linkedin: z.string().url().optional().or(z.literal("")),
            twitter: z.string().url().optional().or(z.literal("")),
            github: z.string().url().optional().or(z.literal("")),
            website: z.string().url().optional().or(z.literal("")),
        })
        .optional(),
});

export const createUserSchema = userSchema.extend({
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = userSchema.partial().extend({
    id: z.string(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional()
        .or(z.literal("")),
});

export const resetPasswordSchema = z.object({
    id: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
