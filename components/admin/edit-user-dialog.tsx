"use client";

import { useState, useEffect } from "react";
import { updateUser } from "@/lib/actions/user-actions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/lib/types/user";
import { transformUserToFormData } from "@/lib/utils/user-form";
import UserForm from "./user-form";

interface EditUserDialogProps {
    user: User;
    children: React.ReactNode;
}

export default function EditUserDialog({
    user,
    children,
}: EditUserDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            formData.append("id", user.id);

            const result = await updateUser(formData);

            if (result.success) {
                setOpen(false);
            }

            return result;
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (open) {
            setFormKey((prev) => prev + 1);
        }
    }, [open, user.id]);

    const defaultValues = transformUserToFormData(user);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Update user information and settings.
                    </DialogDescription>
                </DialogHeader>

                <UserForm
                    key={`${formKey}-${user.id}`}
                    defaultValues={defaultValues}
                    onSubmit={handleSubmit}
                    submitLabel="Update User"
                    isSubmitting={isSubmitting}
                    showPasswordField={false}
                />
            </DialogContent>
        </Dialog>
    );
}
