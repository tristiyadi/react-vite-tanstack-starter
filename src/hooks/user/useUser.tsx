import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export interface User {
	id: number;
	uid: string;
	name: string;
	email: string;
	username?: string;
	role_id: number;
	status: string;
	created_at?: string;
	updated_at?: string;
}

export interface UserRequest {
	name: string;
	email: string;
	password?: string;
	password_confirmation?: string;
	username?: string;
	role_id: number;
	status: string;
}

// GET all users
export const useUsers = (search = "", page = 1) =>
	useQuery<User[]>({
		queryKey: ["users", search, page],
		queryFn: async () =>
			Api.get("/api/users", {
				params: {
					search,
					page,
				},
			}).then((res) => res.data.data),
	});

// GET user by UID
export const useUserById = (uid: string) =>
	useQuery<User>({
		queryKey: ["user", uid],
		queryFn: () => Api.get(`/api/users/${uid}`).then((res) => res.data.data),
		enabled: !!uid,
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
		mutationFn: ({ uid, data }: { uid: string; data: UserRequest }) =>
			Api.put(`/api/users/${uid}`, data).then((res) => res.data),
	});

// DELETE user
export const useUserDelete = () =>
	useMutation({
		mutationFn: (uid: string) =>
			Api.delete(`/api/users/${uid}`).then((res) => res.data),
	});
