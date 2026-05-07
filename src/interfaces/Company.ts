export type StatusType =
  | "Completed"
  | "Pending"
  | "Failed";

export interface Company {
  id?: number;
  name: string;
  email: string;
  status: StatusType;
  date?: string;
}