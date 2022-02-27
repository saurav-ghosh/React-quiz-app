import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const PublicRoute = () => {
    const { currentUser } = useAuth();
    const location = useLocation();

    return !currentUser ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default PublicRoute;
