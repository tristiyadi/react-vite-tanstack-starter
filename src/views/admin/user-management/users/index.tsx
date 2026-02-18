import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Search, Trash2, User as UserIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useRoles } from "@/hooks/role/useRole";
import {
	type User,
	useUserCreate,
	useUserDelete,
	useUsers,
	useUserUpdate,
} from "@/hooks/user/useUser";
import { toast } from "@/hooks/useToast";
import type { UserValues } from "@/lib/validations/user";
import { UserForm } from "./components/UserForm";

const UsersIndex = () => {
	const queryClient = useQueryClient();

	// Queries
	const { data: users, isLoading, isError, error } = useUsers();
	const { data: roles } = useRoles();

	// Mutations
	const createMutation = useUserCreate();
	const updateMutation = useUserUpdate();
	const deleteMutation = useUserDelete();

	// UI State
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);

	const openDialog = (user?: User) => {
		setEditingUser(user || null);
		setIsDialogOpen(true);
	};

	const handleSave = (data: UserValues) => {
		const handleError = (error: unknown) => {
			const apiError = error as {
				response?: {
					data?: { data?: Record<string, string[]>; message?: string };
				};
			};
			const errorMessage =
				apiError?.response?.data?.message ||
				(apiError instanceof Error ? apiError.message : "An error occurred");

			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		};

		if (editingUser) {
			updateMutation.mutate(
				{
					uid: editingUser.uid,
					data: data as any,
				},
				{
					onSuccess: () => {
						toast({
							title: "Success",
							description: "User updated successfully",
						});
						queryClient.invalidateQueries({ queryKey: ["users"] });
						setIsDialogOpen(false);
					},
					onError: handleError,
				},
			);
		} else {
			createMutation.mutate(data as any, {
				onSuccess: () => {
					toast({
						title: "Success",
						description: "User created successfully",
					});
					queryClient.invalidateQueries({ queryKey: ["users"] });
					setIsDialogOpen(false);
				},
				onError: handleError,
			});
		}
	};

	const handleDelete = (uid: string) => {
		if (!confirm("Are you sure you want to delete this user?")) return;

		deleteMutation.mutate(uid, {
			onSuccess: () => {
				toast({
					title: "Deleted",
					description: "User deleted successfully",
					variant: "destructive",
				});
				queryClient.invalidateQueries({ queryKey: ["users"] });
			},
		});
	};

	return (
		<div className="space-y-6 animate-fade-in">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Users</h1>
				<Button onClick={() => openDialog()}>
					<Plus className="h-4 w-4 mr-2" />
					Add User
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>User List</CardTitle>
					<div className="relative max-w-sm">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input placeholder="Search users..." className="pl-10" />
					</div>
				</CardHeader>

				<CardContent>
					{isLoading && (
						<p className="text-center text-muted-foreground py-6">Loading...</p>
					)}

					{isError && (
						<p className="text-center text-destructive py-6">
							{(error as Error).message}
						</p>
					)}

					{users && (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>User</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Username</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user) => (
									<TableRow key={user.uid}>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
													<UserIcon className="h-4 w-4" />
												</div>
												<span className="font-medium">{user.name}</span>
											</div>
										</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.username || "-"}</TableCell>
										<TableCell>
											<span
												className={`px-2 py-1 rounded-full text-xs ${
													user.status === "active"
														? "bg-green-100 text-green-700"
														: "bg-gray-100 text-gray-700"
												}`}
											>
												{user.status}
											</span>
										</TableCell>
										<TableCell className="text-right space-x-1">
											<Button
												variant="ghost"
												size="icon"
												onClick={() => openDialog(user)}
											>
												<Pencil className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												disabled={deleteMutation.isPending}
												onClick={() => handleDelete(user.uid)}
											>
												<Trash2 className="h-4 w-4 text-destructive" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
					</DialogHeader>

					{roles && (
						<UserForm
							onSubmit={handleSave}
							initialData={editingUser || undefined}
							roles={roles}
							isLoading={createMutation.isPending || updateMutation.isPending}
							isEditing={!!editingUser}
							onCancel={() => setIsDialogOpen(false)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UsersIndex;
