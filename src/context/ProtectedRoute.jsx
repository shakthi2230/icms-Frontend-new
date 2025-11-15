import React from "react";
import { Navigate } from "react-router-dom";
import useAdminStore from "../context/AdminContext";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
