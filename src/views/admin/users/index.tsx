import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
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
		role: "User",
		password: "",
	});
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

	const openDialog = (user?: User) => {
		if (user) {
			setEditingUser(user);
			setFormData({
				name: user.name,
				email: user.email,
				role: user.role ?? "User",
				password: user.password ?? "",
			});
		} else {
			setEditingUser(null);
			setFormData({ name: "", email: "", role: "User", password: "" });
		}
		setPasswordConfirmation("");
		setFieldErrors({});
		setIsDialogOpen(true);
	};

	const handleSave = () => {
		setFieldErrors({});
		if (formData.password !== passwordConfirmation) {
			setFieldErrors({ password_confirmation: ["Passwords do not match"] });
			toast({
				title: "Validation Failed",
				description: "Passwords do not match",
				variant: "destructive",
			});
			return;
		}

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
					id: editingUser.id,
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

	const handleDelete = (id: number) => {
		if (!confirm("Are you sure you want to delete this user?")) return;

		deleteMutation.mutate(id, {
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
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Role</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user) => (
									<TableRow key={user.id}>
										<TableCell className="font-medium">{user.name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.role}</TableCell>
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
												onClick={() => handleDelete(user.id)}
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
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label>Name</Label>
							<Input
								value={formData.name}
								onChange={(e) => {
									setFormData({ ...formData, name: e.target.value });
									if (fieldErrors.name) {
										setFieldErrors({ ...fieldErrors, name: [] });
									}
								}}
								className={fieldErrors.name ? "border-destructive" : ""}
							/>
							{fieldErrors.name && fieldErrors.name.length > 0 && (
								<p className="text-sm text-destructive">
									{fieldErrors.name.join(", ")}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>Email</Label>
							<Input
								type="email"
								value={formData.email}
								onChange={(e) => {
									setFormData({ ...formData, email: e.target.value });
									if (fieldErrors.email) {
										setFieldErrors({ ...fieldErrors, email: [] });
									}
								}}
								className={fieldErrors.email ? "border-destructive" : ""}
							/>
							{fieldErrors.email && fieldErrors.email.length > 0 && (
								<p className="text-sm text-destructive">
									{fieldErrors.email.join(", ")}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>Role</Label>
							<Input
								value={formData.role}
								onChange={(e) => {
									setFormData({ ...formData, role: e.target.value });
									if (fieldErrors.role) {
										setFieldErrors({ ...fieldErrors, role: [] });
									}
								}}
								className={fieldErrors.role ? "border-destructive" : ""}
							/>
							{fieldErrors.role && fieldErrors.role.length > 0 && (
								<p className="text-sm text-destructive">
									{fieldErrors.role.join(", ")}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>Password</Label>
							<Input
								type="password"
								value={formData.password}
								onChange={(e) => {
									setFormData({ ...formData, password: e.target.value });
									if (fieldErrors.password) {
										setFieldErrors({ ...fieldErrors, password: [] });
									}
								}}
								className={fieldErrors.password ? "border-destructive" : ""}
								placeholder="Enter password"
							/>
							{fieldErrors.password && fieldErrors.password.length > 0 && (
								<p className="text-sm text-destructive">
									{fieldErrors.password.join(", ")}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>Confirm Password</Label>
							<Input
								type="password"
								value={passwordConfirmation}
								onChange={(e) => {
									setPasswordConfirmation(e.target.value);
									if (fieldErrors.password_confirmation) {
										setFieldErrors({
											...fieldErrors,
											password_confirmation: [],
										});
									}
								}}
								className={
									fieldErrors.password_confirmation ? "border-destructive" : ""
								}
								placeholder="Confirm password"
							/>
							{fieldErrors.password_confirmation &&
								fieldErrors.password_confirmation.length > 0 && (
									<p className="text-sm text-destructive">
										{fieldErrors.password_confirmation.join(", ")}
									</p>
								)}
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
