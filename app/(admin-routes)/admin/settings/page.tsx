import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, Mail, Phone, Calendar } from "lucide-react";

export default async function SettingsPage() {
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

    return (
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Settings
                </h1>
                <p className="text-lg text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            <div className="grid gap-8">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                <Building className="h-4 w-4 text-white" />
                            </div>
                            Profile Information
                        </CardTitle>
                        <CardDescription className="text-base">
                            Your personal information and account details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                            <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                                <AvatarImage src={user.profile || undefined} />
                                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                                    {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold text-slate-800">
                                    {user.name}
                                </h3>
                                <div className="flex items-center space-x-3">
                                    <Badge
                                        variant={
                                            user.role === "ADMIN"
                                                ? "default"
                                                : "secondary"
                                        }
                                        className="px-3 py-1 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0"
                                    >
                                        {user.role}
                                    </Badge>
                                    {user.position && (
                                        <Badge
                                            variant="outline"
                                            className="px-3 py-1 text-sm font-semibold border-emerald-200 text-emerald-700"
                                        >
                                            {user.position}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                    <Mail className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-600">
                                        Email
                                    </p>
                                    <p className="text-base text-slate-800 font-medium">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {user.phone && (
                                <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                        <Phone className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-600">
                                            Phone
                                        </p>
                                        <p className="text-base text-slate-800 font-medium">
                                            {user.phone}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                    <Calendar className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-600">
                                        Member Since
                                    </p>
                                    <p className="text-base text-slate-800 font-medium">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                    <Building className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-600">
                                        Organization
                                    </p>
                                    <p className="text-base text-slate-800 font-medium">
                                        CiptaTech Sdn Bhd
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
