"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, createUserSchema } from "@/lib/validations/user";
import { UserFormData, CreateUserData } from "@/lib/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, User } from "lucide-react";
import { toast } from "sonner";
import { createFormDataFromObject } from "@/lib/utils/user-form";

interface UserFormProps {
    defaultValues?: Partial<UserFormData>;
    onSubmit: (data: FormData) => Promise<{ error?: string; success?: string }>;
    submitLabel: string;
    isSubmitting?: boolean;
    showPasswordField?: boolean;
}

export default function UserForm({
    defaultValues,
    onSubmit,
    submitLabel,
    isSubmitting = false,
    showPasswordField = false,
}: UserFormProps) {
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(
        defaultValues?.profile || null
    );
    const [profileRemoved, setProfileRemoved] = useState<boolean>(false);

    const form = useForm<UserFormData | CreateUserData>({
        resolver: zodResolver(
            showPasswordField ? createUserSchema : userSchema
        ),
        defaultValues: defaultValues || {},
    });

    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
            setProfilePreview(defaultValues.profile || null);
            setProfileRemoved(false);
        }
    }, [defaultValues, form]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const maxSize = 1 * 1024 * 1024; // 1MB in bytes
            if (file.size > maxSize) {
                toast.error("Profile image must be less than 1MB");
                return;
            }

            setProfileFile(file);
            setProfileRemoved(false);
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const onDropRejected = useCallback((fileRejections: any[]) => {
        const rejection = fileRejections[0];
        if (rejection?.errors?.[0]?.code === "file-too-large") {
            toast.error("Profile image must be less than 1MB");
        } else if (rejection?.errors?.[0]?.code === "file-invalid-type") {
            toast.error(
                "Please select a valid image file (PNG, JPG, GIF, WebP)"
            );
        } else {
            toast.error("Failed to upload image");
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
        },
        maxFiles: 1,
        maxSize: 1 * 1024 * 1024, // 1MB
    });

    const removeProfile = () => {
        setProfileFile(null);
        setProfilePreview(null);
        setProfileRemoved(true);
    };

    const handleFormSubmit = async (data: UserFormData | CreateUserData) => {
        const { profile, ...dataWithoutProfile } = data;
        const formData = createFormDataFromObject(dataWithoutProfile);

        if (profileFile) {
            formData.append("profile", profileFile);
        } else if (profileRemoved) {
            formData.append("profile", "");
        }

        const result = await onSubmit(formData);

        if (result.error) {
            toast.error(result.error);
        } else {
            form.reset();
            setProfileFile(null);
            setProfilePreview(null);
            setProfileRemoved(false);
            toast.success(result.success);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-6"
            >
                <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={profilePreview || undefined} />
                            <AvatarFallback>
                                {profilePreview ? (
                                    <User className="h-8 w-8" />
                                ) : (
                                    form
                                        .watch("name")
                                        ?.split(" ")
                                        .map((n: string) => n[0])
                                        .join("")
                                        .toUpperCase() || "U"
                                )}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                                    isDragActive
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-300 hover:border-gray-400"
                                }`}
                            >
                                <input {...getInputProps()} />
                                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">
                                    {isDragActive
                                        ? "Drop the image here..."
                                        : "Drag & drop an image, or click to select"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PNG, JPG, GIF up to 1MB
                                </p>
                            </div>

                            {profilePreview && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={removeProfile}
                                    className="mt-2"
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter full name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter email address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {showPasswordField && (
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password *</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter phone number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., CEO, CTO, Developer"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role *</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="USER">User</SelectItem>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <Label>Social Links</Label>

                    <FormField
                        control={form.control}
                        name="socialLinks.linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://linkedin.com/in/username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="socialLinks.twitter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://twitter.com/username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="socialLinks.github"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GitHub</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://github.com/username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="socialLinks.website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : submitLabel}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
