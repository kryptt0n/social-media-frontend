import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


