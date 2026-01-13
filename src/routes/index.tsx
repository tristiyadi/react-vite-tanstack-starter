import { useContext } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// Not Found Page
import AdminLayout from "@/components/layout/AdminLayout.tsx";
import { AuthContext } from "../context/AuthContext";
// Admin Pages
import Dashboard from "../views/admin/dashboard/index.tsx";
import RolesIndex from "../views/admin/user-management/roles/index.tsx";
import UsersIndex from "../views/admin/user-management/users/index.tsx";
// Public Pages
import Login from "../views/auth/login.tsx";
import Register from "../views/auth/register.tsx";
import ResetPassword from "../views/auth/reset-password.tsx";
import Home from "../views/home/index.tsx";
import NotFound from "../views/NotFound.tsx";

export default function AppRoutes() {
	const auth = useContext(AuthContext);
	const isAuthenticated = auth?.isAuthenticated ?? false;

	const routes = useRoutes([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/register",
			element: isAuthenticated ? (
				<Navigate to="/admin/dashboard" replace />
			) : (
				<Register />
			),
		},
		{
			path: "/login",
			element: isAuthenticated ? (
				<Navigate to="/admin/dashboard" replace />
			) : (
				<Login />
			),
		},
		{
			path: "/reset-password",
			element: isAuthenticated ? (
				<Navigate to="/admin/dashboard" replace />
			) : (
				<ResetPassword />
			),
		},
		{
			path: "/admin",
			element: <AdminLayout />,
			children: [
				{ index: true, element: <Navigate to="dashboard" replace /> },
				{ path: "dashboard", element: <Dashboard /> },
				{ path: "users", element: <UsersIndex /> },
				{ path: "roles", element: <RolesIndex /> },
			],
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return routes;
}
