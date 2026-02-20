import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const GuestGuard = () => {
	const auth = useContext(AuthContext);
	const isAuthenticated = auth?.isAuthenticated ?? false;

	if (isAuthenticated) {
		return <Navigate to="/admin/dashboard" replace />;
	}

	return <Outlet />;
};

export default GuestGuard;
