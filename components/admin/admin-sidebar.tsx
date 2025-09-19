"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Users, LogOut, Home, Settings } from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const handleSignOut = () => {
        signOut({ callbackUrl: "/login" });
    };

    return (
        <Sidebar className="border-r bg-gradient-to-b from-slate-50 to-white">
            <SidebarHeader className="p-4 border-b bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div className="transition-all duration-300 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
                        <h2 className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            CiptaTech
                        </h2>
                        <p className="text-sm text-muted-foreground font-medium">
                            Admin Panel
                        </p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {menuItems.map((item, index) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 hover:shadow-sm data-[active=true]:bg-gradient-to-r data-[active=true]:from-emerald-500 data-[active=true]:to-teal-500 data-[active=true]:text-white data-[active=true]:shadow-lg"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                                        >
                                            <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                                            <span className="font-medium transition-all duration-300 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t bg-gradient-to-r from-slate-50 to-gray-50">
                <Separator className="mb-4 bg-gradient-to-r from-transparent via-border to-transparent" />
                <Button
                    variant="ghost"
                    className="w-full justify-start group hover:bg-red-50 hover:text-red-600 transition-all duration-200 hover:shadow-sm"
                    onClick={handleSignOut}
                >
                    <LogOut className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12" />
                    <span className="font-medium transition-all duration-300 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
                        Sign Out
                    </span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
