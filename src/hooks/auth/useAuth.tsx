import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import Api from "../../services/api";

interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}
interface LoginRequest {
	email: string;
	password: string;
}
interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

export const useRegister = () =>
	useMutation({
		mutationFn: async (data: RegisterRequest) => {
			const response = await Api.post("/api/register", data);
			return response.data;
		},
	});

export const useLogin = () =>
	useMutation({
		mutationFn: async (data: LoginRequest) => {
			const response = await Api.post("/api/login", data);
			return response.data;
		},
	});

export const useAuthUser = (): User | null => {
	const user = Cookies.get("user");
	return user ? (JSON.parse(user) as User) : null;
};

export const useLogout = (): (() => void) => {
	// Ambil setIsAuthenticated dari context
	const authContext = useContext(AuthContext);

	// Gunakan null assertion karena kita yakin AuthContext akan selalu tersedia
	const { setIsAuthenticated } = authContext!;

	// Inisialisasi navigate
	const navigate = useNavigate();

	const logout = (): void => {
		Cookies.remove("token");
		Cookies.remove("user");
		setIsAuthenticated(false);
		navigate("/login", { replace: true });
	};

	return logout;
};
