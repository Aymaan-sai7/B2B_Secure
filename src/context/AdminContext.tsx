import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/axios";
import { AdminApiResponse } from "../interfaces/Admin";

interface AdminContextType {
  admin: AdminApiResponse | null;
  loading: boolean;
  error: string | null;
  refreshAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin]     = useState<AdminApiResponse | null>(null);
  const [loading, setLoading] = useState(false); // false مش true عشان مش دايما بنفتش
  const [error, setError]     = useState<string | null>(null);

  const fetchAdmin = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/admin/profile");
      setAdmin(res.data.admin);
    } 
    catch (err: any) {
      console.log(err);
      if (err?.response?.status === 401) {
        setAdmin(null);
        setError("Unauthorized");
        return;
      }
      setError("Failed to load admin profile");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, loading, error, refreshAdmin: fetchAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used inside AdminProvider");
  return context;
};