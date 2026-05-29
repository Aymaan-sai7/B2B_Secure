import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { useAdmin } from "../context/AdminContext";
import { isSuperAdmin } from "../permissions/permissions";

interface RoleRouteProps {
  allowedRoles: string[];
  fallback?: ReactNode;
}

export function SuperAdminRoute() {
  const { admin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#12033A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin || !isSuperAdmin(admin.roles)) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
}

export function RoleRoute({ allowedRoles, fallback }: RoleRouteProps) {
  const { admin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#12033A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hasAccess = admin?.roles.some((role) => allowedRoles.includes(role));

  if (!admin || !hasAccess) {
    return fallback ?? <Navigate to="/404" replace />;
  }

  return <Outlet />;
}
