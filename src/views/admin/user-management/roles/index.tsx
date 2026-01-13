import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useRoles } from "@/hooks/role/useRole";

const RolesIndex = () => {
	const { data: roles, isLoading, isError, error } = useRoles();

	return (
		<div className="space-y-6 animate-fade-in">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Roles</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Role List</CardTitle>
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

					{roles && (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Display Name</TableHead>
									<TableHead>Internal Name</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{roles.map((role) => (
									<TableRow key={role.roles_id}>
										<TableCell className="font-medium">
											{role.display_name}
										</TableCell>
										<TableCell>{role.name}</TableCell>
										<TableCell>{role.description}</TableCell>
										<TableCell>
											<span
												className={`px-2 py-1 rounded-full text-xs ${
													role.status
														? "bg-green-100 text-green-700"
														: "bg-red-100 text-red-700"
												}`}
											>
												{role.status ? "Active" : "Inactive"}
											</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default RolesIndex;
