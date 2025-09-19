import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/admin-sidebar";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login");
    }

    // Check if user exists and is not deleted
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user || user.deletedAt) {
        redirect("/login");
    }

    // Check if user is admin
    if (user.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-gray-50 w-full">
                <AdminSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="h-4 w-px bg-border" />
                    </header>
                    <main className="flex-1 overflow-auto">
                        <div className="p-6">{children}</div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
