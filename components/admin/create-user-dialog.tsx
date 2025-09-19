"use client";

import { useState } from "react";
import { createUser } from "@/lib/actions/user-actions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "./user-form";

interface CreateUserDialogProps {
    children: React.ReactNode;
}

export default function CreateUserDialog({ children }: CreateUserDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const result = await createUser(formData);

            if (result.success) {
                setOpen(false);
            }

            return result;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                        Add a new team member to your organization.
                    </DialogDescription>
                </DialogHeader>

                <UserForm
                    onSubmit={handleSubmit}
                    submitLabel="Create User"
                    isSubmitting={isSubmitting}
                    showPasswordField={true}
                />
            </DialogContent>
        </Dialog>
    );
}
