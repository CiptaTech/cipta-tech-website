import { User } from "@/lib/types/user";

export function transformUserToFormData(user: User) {
    return {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        position: user.position || "",
        role: user.role,
        profile: user.profile || undefined,
        socialLinks: {
            linkedin: user.socialLinks?.linkedin || "",
            twitter: user.socialLinks?.twitter || "",
            github: user.socialLinks?.github || "",
            website: user.socialLinks?.website || "",
        },
    };
}

export function createFormDataFromObject(data: Record<string, any>): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (typeof value === "object") {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, String(value));
            }
        }
    });

    return formData;
}
