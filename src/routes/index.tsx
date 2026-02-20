import { Navigate, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AdminLayout from "@/components/layout/AdminLayout";

// Admin Pages
const Dashboard = lazy(() => import("../views/admin/dashboard"));
const RolesIndex = lazy(() => import("../views/admin/user-management/roles"));
const UsersIndex = lazy(() => import("../views/admin/user-management/users"));
// Public Pages
const Login = lazy(() => import("../views/auth/login"));
const Register = lazy(() => import("../views/auth/register"));
const ResetPassword = lazy(() => import("../views/auth/reset-password"));
const Home = lazy(() => import("../views/home"));
const About = lazy(() => import("../views/About"));
const Contact = lazy(() => import("../views/Contact"));
const Features = lazy(() => import("../views/Features"));
const Pricing = lazy(() => import("../views/Pricing"));
const Agenda = lazy(() => import("../views/Agenda"));
const AgendaDetail = lazy(() => import("../views/AgendaDetail"));
const NotFound = lazy(() => import("../views/NotFound"));

import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";

export default function AppRoutes() {
	const routes = useRoutes([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/features",
			element: <Features />,
		},
		{
			path: "/pricing",
			element: <Pricing />,
		},
		{
			path: "/agenda",
			element: <Agenda />,
		},
		{
			path: "/agenda/:id",
			element: <AgendaDetail />,
		},
		{
			path: "/about",
			element: <About />,
		},
		{
			path: "/contact",
			element: <Contact />,
		},
		{
			element: <GuestGuard />,
			children: [
				{
					path: "/login",
					element: <Login />,
				},
				{
					path: "/register",
					element: <Register />,
				},
				{
					path: "/reset-password",
					element: <ResetPassword />,
				},
			],
		},
		{
			path: "/admin",
			element: <AuthGuard />,
			children: [
				{
					element: <AdminLayout />,
					children: [
						{ index: true, element: <Navigate to="dashboard" replace /> },
						{ path: "dashboard", element: <Dashboard /> },
						{ path: "users", element: <UsersIndex /> },
						{ path: "roles", element: <RolesIndex /> },
					],
				},
			],
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center bg-background">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
				</div>
			}
		>
			{routes}
		</Suspense>
	);
}
