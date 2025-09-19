import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Users, UserCheck, UserX, Building } from "lucide-react";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
        return null;
    }

    // Get statistics
    const totalUsers = await prisma.user.count({
        where: { deletedAt: null },
    });

    const activeUsers = await prisma.user.count({
        where: {
            deletedAt: null,
            role: "USER",
        },
    });

    const deletedUsers = await prisma.user.count({
        where: { deletedAt: { not: null } },
    });

    const adminUsers = await prisma.user.count({
        where: {
            deletedAt: null,
            role: "ADMIN",
        },
    });

    return (
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                    Welcome back,{" "}
                    <span className="font-semibold text-emerald-600">
                        {user.name}
                    </span>
                    ! Here's an overview of your system.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-blue-700">
                            Total Users
                        </CardTitle>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-900">
                            {totalUsers}
                        </div>
                        <p className="text-sm text-blue-600 font-medium">
                            All active users in the system
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-green-700">
                            Team Members
                        </CardTitle>
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <UserCheck className="h-5 w-5 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-900">
                            {activeUsers}
                        </div>
                        <p className="text-sm text-green-600 font-medium">
                            Active team members
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-purple-700">
                            Administrators
                        </CardTitle>
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <Building className="h-5 w-5 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-purple-900">
                            {adminUsers}
                        </div>
                        <p className="text-sm text-purple-600 font-medium">
                            System administrators
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-red-700">
                            Deleted Users
                        </CardTitle>
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <UserX className="h-5 w-5 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-900">
                            {deletedUsers}
                        </div>
                        <p className="text-sm text-red-600 font-medium">
                            Soft-deleted accounts
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4 text-white" />
                        </div>
                        Recent Activity
                    </CardTitle>
                    <CardDescription className="text-base">
                        Latest updates from your team management system
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-10 w-10 text-slate-400" />
                        </div>
                        <p className="text-lg font-semibold text-slate-600 mb-2">
                            No recent activity to display
                        </p>
                        <p className="text-sm text-slate-500">
                            Activity will appear here as your team uses the
                            system
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
