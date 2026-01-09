import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export interface User {
	id: number;
	name: string;
	email: string;
}
interface UserRequest {
	name: string;
	email: string;
	password?: string;
}

// GET all users
export const useUsers = () =>
	useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => Api.get("/api/users").then((res) => res.data.data),
	});

// GET user by ID
export const useUserById = (id: number) =>
	useQuery<User>({
		queryKey: ["user", id],
		queryFn: () => Api.get(`/api/users/${id}`).then((res) => res.data.data),
		enabled: !!id, // Only run if ID exists
	});

// POST create user
export const useUserCreate = () =>
	useMutation({
		mutationFn: (data: UserRequest) =>
			Api.post("/api/users", data).then((res) => res.data),
	});

// PUT update user
export const useUserUpdate = () =>
	useMutation({
		mutationFn: ({ id, data }: { id: number; data: UserRequest }) =>
			Api.put(`/api/users/${id}`, data).then((res) => res.data),
	});

// DELETE user
export const useUserDelete = () =>
	useMutation({
		mutationFn: (id: number) =>
			Api.delete(`/api/users/${id}`).then((res) => res.data),
	});
