import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children, adminOnly = false }) {
  const { currentUser, currentAdmin } = useAuth();
  const location = useLocation();

  if (adminOnly) {
    if (!currentAdmin) {
      // Redirect to admin login page if not authenticated
      return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }
  } else {
    if (!currentUser) {
      // Redirect to user login page if not authenticated
      return <Navigate to="/user/login" replace state={{ from: location }} />;
    }
  }

  return children;
}

export default PrivateRoute;
