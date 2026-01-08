import { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router";
import { AuthContext } from '../context/AuthContext';

// Public Pages
import Home from "../views/home/index.tsx";
import Register from "../views/auth/register.tsx";
import Login from "../views/auth/login.tsx";

// Admin Pages 
import Dashboard from "../views/admin/dashboard/index.tsx";
import UsersIndex from "../views/admin/users/index.tsx";
import UsersCreate from "../views/admin/users/create.tsx";
import UsersEdit from "../views/admin/users/edit.tsx";


export default function AppRoutes() {

    const auth = useContext(AuthContext);
    const isAuthenticated = auth?.isAuthenticated ?? false;

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />
            } />

            {/* route "/login" */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />
            {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />
            {/* route "/admin/users" */}
            <Route path="/admin/users" element={
                isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace />
            } />
            {/* route "/admin/users/create" */}
            <Route path="/admin/users/create" element={
                isAuthenticated ? <UsersCreate /> : <Navigate to="/login" replace />
            } />
            {/* route "/admin/users/edit" */}
            <Route path="/admin/users/edit/:id" element={
                isAuthenticated ? <UsersEdit /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
