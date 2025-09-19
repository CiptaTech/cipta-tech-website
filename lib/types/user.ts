export interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    position: string | null;
    role: "ADMIN" | "USER";
    profile: string | null;
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        website?: string;
    } | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserFormData {
    name: string;
    email: string;
    phone?: string;
    position?: string;
    role: "ADMIN" | "USER";
    profile?: string;
    socialLinks?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        website?: string;
    };
}

export interface CreateUserData extends UserFormData {
    password: string;
}

export interface UpdateUserData extends Partial<UserFormData> {
    id: string;
    password?: string;
}
