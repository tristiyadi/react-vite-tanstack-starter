import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const AuthGuard = () => {
	const auth = useContext(AuthContext);
	const isAuthenticated = auth?.isAuthenticated ?? false;

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default AuthGuard;
