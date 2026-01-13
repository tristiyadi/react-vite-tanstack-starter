import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export interface Role {
	roles_id: number;
	name: string;
	display_name: string;
	description?: string;
	status: number | boolean;
	created_at?: string;
	updated_at?: string;
}

// GET all roles (active only based on backend)
export const useRoles = () =>
	useQuery<Role[]>({
		queryKey: ["roles"],
		queryFn: async () => Api.get("/api/roles").then((res) => res.data.data),
	});
