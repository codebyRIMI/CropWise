import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {

  const token =
    localStorage.getItem("access") ||
    localStorage.getItem("refresh");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


export const AdminRoute = () => {

  const token =
    localStorage.getItem("access") ||
    localStorage.getItem("refresh");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // User is not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not an admin
  if (!user.is_staff) {
    return <Navigate to="/dashboard" replace />;
  }

  // Allow access to nested admin routes
  return <Outlet />;
};