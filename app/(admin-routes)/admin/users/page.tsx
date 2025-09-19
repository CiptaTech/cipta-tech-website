import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateUserDialog from "@/components/admin/create-user-dialog";
import { User } from "@/lib/types/user";
import UsersTable from "@/components/admin/users-table";

export default async function UsersPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user || user.deletedAt || user.role !== "ADMIN") {
        redirect("/login");
    }

    const usersData = await prisma.user.findMany({
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

    const users: User[] = usersData.map((user) => ({
        ...user,
        socialLinks: user.socialLinks as User["socialLinks"],
    }));

    return (
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Users
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Manage your team members and administrators
                    </p>
                </div>
                <CreateUserDialog>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </CreateUserDialog>
            </div>

            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
                <UsersTable users={users} />
            </div>
        </div>
    );
}
