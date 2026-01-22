import { Navigate, Outlet } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../utils/auth";

export default function RoleProtectedRoute({ allowedRoles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getUserRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
