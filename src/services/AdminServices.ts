import api from "./axios";
import { AdminType, AdminApiResponse, AddAdminPayload, UpdateAdminPayload } from "../interfaces/Admin";

function mapAdmin(a: AdminApiResponse): AdminType {
  return {
    id: a.id,
    name: a.name,
    email: a.email,
    role: (a.roles?.[0] as AdminType["role"]) || "Admin",
    createAt: a.created_at,
    password: "",
    action: "icons",
  };
}


export async function getAllAdmins(): Promise<AdminType[]> {
  const res = await api.get("/admin/admins");
  return res.data.data.map((a: AdminApiResponse) => mapAdmin(a));
}

export async function getAdminById(id: number): Promise<AdminApiResponse> {
  const res = await api.get(`/admin/admins/${id}`);
  return res.data?.data ?? res.data;
}

export async function addAdmin(payload: AddAdminPayload): Promise<void> {
  await api.post("/admin/admins", payload);
}

export async function updateAdmin(id: number, payload: UpdateAdminPayload): Promise<void> {
  await api.put(`/admin/admins/${id}`, payload);
}

export async function deleteAdmin(id: number): Promise<void> {
  await api.delete(`/admin/admins/${id}`);
}

export async function changeAdminPassword(id: number | string, password: string): Promise<void> {
  await api.put(`/admin/admins/${id}/password`, { password });
}

export async function changeAdminRole(id: number | string, role: string): Promise<void> {
  await api.put(`/admin/admins/${id}/role`, { role });
}