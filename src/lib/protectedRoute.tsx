import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = () => {
  const auth = useAuth();

  const [checking, setChecking] = useState(false);

  useEffect(() => {

    if (auth.isAuthenticated || checking) return;

    setChecking(true);

    (async () => {
      try {
        await auth.checkUsername();
      } finally {
        setChecking(false);
      }
    })();
  }, [auth.isAuthenticated, checking]);

  if (auth.isAuthenticated === undefined || checking) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated)
    return <Navigate to="/" />;
  

  return <Outlet />;
};

export default ProtectedRoute;


