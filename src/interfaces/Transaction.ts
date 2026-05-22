export type StatusType = "completed" | "pending" | "failed";

// api
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

// update
export interface UpdateTransactionPayload {
  sender_company_id: string;
  receiver_company_id: string;
  amount: number;
  status: StatusType;
}