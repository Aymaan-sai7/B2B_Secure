export type AdminRole = "Admin" | "superAdmin";

export interface AdminApiResponse {
  id: number;
  name: string;
  email: string;
  roles: string[];
  created_at: string;
}

export interface AdminType {
  id: number;
  name: string;
  createAt: string;
  email: string;
  password: string;
  role: AdminRole;
  action: string;
}

export interface AddAdminPayload {
  name: string;
  email: string;
  password: string;
   role: "Admin";
}


export interface UpdateAdminPayload {
  name: string;
  email: string;
}