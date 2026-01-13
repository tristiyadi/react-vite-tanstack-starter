import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Search, Trash2, User as UserIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
	type UserRequest as FormData,
	type User,
	useUserCreate,
	useUserDelete,
	useUsers,
	useUserUpdate,
} from "@/hooks/user/useUser";
import { toast } from "@/hooks/useToast";

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
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		username: "",
		role_id: 2,
		status: "active",
		password: "",
		password_confirmation: "",
	});
	const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

	const openDialog = (user?: User) => {
		if (user) {
			setEditingUser(user);
			setFormData({
				name: user.name,
				email: user.email,
				username: user.username || "",
				role_id: user.role_id,
				status: user.status,
				password: "",
				password_confirmation: "",
			});
		} else {
			setEditingUser(null);
			setFormData({
				name: "",
				email: "",
				username: "",
				role_id: 2,
				status: "active",
				password: "",
				password_confirmation: "",
			});
		}
		setFieldErrors({});
		setIsDialogOpen(true);
	};

	const handleSave = () => {
		setFieldErrors({});

		const handleError = (error: unknown) => {
			const apiError = error as {
				response?: {
					data?: { data?: Record<string, string[]>; message?: string };
				};
			};
			if (apiError?.response?.data?.data) {
				const errors = apiError.response.data.data;
				setFieldErrors(errors);

				toast({
					title: apiError.response?.data?.message || "Validation Failed",
					description: Object.values(errors).flat().join(", "),
					variant: "destructive",
				});
			} else {
				const errorMessage =
					apiError instanceof Error ? apiError.message : "An error occurred";
				toast({
					title: "Error",
					description: errorMessage,
					variant: "destructive",
				});
			}
		};

		if (editingUser) {
			updateMutation.mutate(
				{
					uid: editingUser.uid,
					data: formData,
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
			createMutation.mutate(formData, {
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

			{/* Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Name</Label>
								<Input
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className={fieldErrors.name ? "border-destructive" : ""}
								/>
							</div>
							<div className="space-y-2">
								<Label>Username</Label>
								<Input
									value={formData.username}
									onChange={(e) =>
										setFormData({ ...formData, username: e.target.value })
									}
									className={fieldErrors.username ? "border-destructive" : ""}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label>Email</Label>
							<Input
								type="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className={fieldErrors.email ? "border-destructive" : ""}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Role</Label>
								<Select
									value={formData.role_id.toString()}
									onValueChange={(v) =>
										setFormData({ ...formData, role_id: parseInt(v, 10) })
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select role" />
									</SelectTrigger>
									<SelectContent>
										{roles?.map((role) => (
											<SelectItem
												key={role.roles_id}
												value={role.roles_id.toString()}
											>
												{role.display_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Status</Label>
								<Select
									value={formData.status}
									onValueChange={(v) => setFormData({ ...formData, status: v })}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="inactive">Inactive</SelectItem>
										<SelectItem value="pending">Pending</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Password</Label>
								<Input
									type="password"
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									placeholder={editingUser ? "Blank to keep" : "Enter password"}
								/>
							</div>
							<div className="space-y-2">
								<Label>Confirm Password</Label>
								<Input
									type="password"
									value={formData.password_confirmation}
									onChange={(e) =>
										setFormData({
											...formData,
											password_confirmation: e.target.value,
										})
									}
									placeholder="Confirm password"
								/>
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							disabled={createMutation.isPending || updateMutation.isPending}
						>
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UsersIndex;
