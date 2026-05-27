export type StatusType = "completed" | "pending" | "failed";

export interface TransactionApiResponse {
  id: number;
  sender_name: string;
  receiver_name: string;
  amount: string;
  status: string;
  date: string;
}

export interface transaction {
  id: number;
  date: string;
  senderCompany: string;
  receiverCompany: string;
  state: string;
  amountSend: number;
  productType: string;
  product: string;
  transactionDate: string;
  companyWorkingHours: string;
  action: string;
  status: StatusType;
}

export interface UpdateTransactionPayload {
  status: string;
}