"use client";

import { useState, useEffect } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";
import {
    MoreHorizontal,
    Edit,
    Trash2,
    Key,
    Users,
    ChevronLeft,
    ChevronRight,
    Grid,
    List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUser } from "@/lib/actions/user-actions";
import { toast } from "sonner";
import { User } from "@/lib/types/user";
import EditUserDialog from "./edit-user-dialog";
import ResetPasswordDialog from "./reset-password-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface UsersTableProps {
    users: User[];
}

const createColumns = (
    setUserToDelete: (user: User) => void,
    setDeleteDialogOpen: (open: boolean) => void
): ColumnDef<User>[] => [
    {
        accessorKey: "profile",
        header: "Avatar",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profile || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold">
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                        {user.email}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "position",
        header: "Position",
        cell: ({ row }) => {
            const user = row.original;
            return user.position || "-";
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => {
            const user = row.original;
            return user.phone || "-";
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                >
                    {user.role}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            const user = row.original;
            return new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                        >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <EditUserDialog user={user}>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                        </EditUserDialog>
                        <ResetPasswordDialog user={user}>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                <Key className="mr-2 h-4 w-4" />
                                Reset Password
                            </DropdownMenuItem>
                        </ResetPasswordDialog>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive"
                            onSelect={() => {
                                setUserToDelete(user);
                                setDeleteDialogOpen(true);
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function UsersTable({ users }: UsersTableProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewMode, setViewMode] = useState<"table" | "cards">("table");
    const isMobile = useIsMobile();

    // Set default view mode based on screen size
    useEffect(() => {
        if (isMobile) {
            setViewMode("cards");
        }
    }, [isMobile]);

    const handleDelete = async () => {
        if (!userToDelete) return;

        setIsDeleting(true);
        try {
            const result = await deleteUser(userToDelete.id);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.success);
                setDeleteDialogOpen(false);
                setUserToDelete(null);
            }
        } catch (error) {
            toast.error("Failed to delete user");
        } finally {
            setIsDeleting(false);
        }
    };

    const columns = createColumns(setUserToDelete, setDeleteDialogOpen);

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <>
            {/* View Mode Toggle - Hidden on mobile */}
            {!isMobile && (
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant={
                                viewMode === "table" ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setViewMode("table")}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                        >
                            <List className="mr-2 h-4 w-4" />
                            Table View
                        </Button>
                        <Button
                            variant={
                                viewMode === "cards" ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setViewMode("cards")}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                        >
                            <Grid className="mr-2 h-4 w-4" />
                            Card View
                        </Button>
                    </div>
                </div>
            )}

            {/* Mobile Card View / Desktop Card View */}
            {viewMode === "cards" || isMobile ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {table.getRowModel().rows.map((row, index) => {
                        const user = row.original;
                        return (
                            <div
                                key={user.id}
                                className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage
                                            src={user.profile || undefined}
                                        />
                                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold">
                                            {user.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-slate-800">
                                            {user.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {user.email}
                                        </p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                                            >
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <EditUserDialog user={user}>
                                                <DropdownMenuItem
                                                    onSelect={(e) =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                            </EditUserDialog>
                                            <ResetPasswordDialog user={user}>
                                                <DropdownMenuItem
                                                    onSelect={(e) =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    <Key className="mr-2 h-4 w-4" />
                                                    Reset Password
                                                </DropdownMenuItem>
                                            </ResetPasswordDialog>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onSelect={() => {
                                                    setUserToDelete(user);
                                                    setDeleteDialogOpen(true);
                                                }}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="space-y-3">
                                    {user.position && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-medium text-slate-600">
                                                Position:
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {user.position}
                                            </Badge>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-slate-600">
                                            Role:
                                        </span>
                                        <Badge
                                            variant={
                                                user.role === "ADMIN"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className="text-xs"
                                        >
                                            {user.role}
                                        </Badge>
                                    </div>

                                    {user.phone && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-medium text-slate-600">
                                                Phone:
                                            </span>
                                            <span className="text-sm text-slate-700">
                                                {user.phone}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-slate-600">
                                            Created:
                                        </span>
                                        <span className="text-sm text-slate-700">
                                            {new Date(
                                                user.createdAt
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Desktop Table View */
                <div className="rounded-2xl border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="border-b border-slate-200"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="text-sm font-semibold text-slate-700 py-4 px-6 first:pl-8 last:pr-8"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 border-b border-slate-100 last:border-b-0 animate-in fade-in-0 slide-in-from-bottom-4"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="py-4 px-6 first:pl-8 last:pr-8"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-32 text-center py-12"
                                    >
                                        <div className="flex flex-col items-center space-y-3">
                                            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                                                <Users className="h-8 w-8 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-slate-600">
                                                    No users found
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    Get started by adding your
                                                    first team member
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Pagination */}
            {table.getPageCount() > 1 && (
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-slate-600">
                        Showing{" "}
                        {table.getState().pagination.pageIndex *
                            table.getState().pagination.pageSize +
                            1}{" "}
                        to{" "}
                        {Math.min(
                            (table.getState().pagination.pageIndex + 1) *
                                table.getState().pagination.pageSize,
                            table.getFilteredRowModel().rows.length
                        )}{" "}
                        of {table.getFilteredRowModel().rows.length} results
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="bg-white hover:bg-slate-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <div className="flex items-center space-x-1">
                            {Array.from(
                                { length: table.getPageCount() },
                                (_, i) => (
                                    <Button
                                        key={i}
                                        variant={
                                            table.getState().pagination
                                                .pageIndex === i
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() => table.setPageIndex(i)}
                                        className={
                                            table.getState().pagination
                                                .pageIndex === i
                                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                                                : "bg-white hover:bg-slate-50"
                                        }
                                    >
                                        {i + 1}
                                    </Button>
                                )
                            )}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="bg-white hover:bg-slate-50"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will soft delete the user "
                            {userToDelete?.name}". They will no longer be able
                            to access the system, but their data will be
                            preserved.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
