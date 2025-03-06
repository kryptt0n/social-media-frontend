import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

interface ProtectedRouteProps {
  // isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();

  if (auth.isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  console.log(auth.isAuthenticated);
  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;


