export type StatusType = "Completed" | "Pending" | "Failed";

export interface CompanyApiResponse {
  id: number;
  name: string;
  email: string;
  industry: string | null;
  address: string | null;
  is_approved: boolean;
  is_active: boolean;
  is_verified: boolean;
  tx_count: number;
  tx_total_amount: string;
  created_at: string;
}
export interface CompanyType {
  id: number;
  name: string;
  email: string;
  status: StatusType;
  date: string;
  action: string;
  password: string;
  industry: string;
  address: string;
}

export interface CompanyPayload {
  name: string;
  email: string;
  password: string;
  industry: string;
  address: string;
}