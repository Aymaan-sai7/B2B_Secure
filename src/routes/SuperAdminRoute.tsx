import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { isSuperAdmin } from "../permissions/permissions";

export default function SuperAdminRoute() {
  const { admin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#12033A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // لو مش سوبر ادمن
  if (!admin || !isSuperAdmin(admin.roles)) {
    return <Navigate to="/404" replace />;
  }

  // لو سوبر ادمن
  return <Outlet />;
}