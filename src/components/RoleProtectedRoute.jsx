import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function RoleProtectedRoute({ allowedRoles }) {
  const role = getUserRole();

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}

