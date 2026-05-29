import api from "./axios";
import { transaction, TransactionApiResponse, UpdateTransactionPayload } from "../interfaces/Transaction";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mapTransaction(t: TransactionApiResponse): transaction {
  return {
    id: t.id,
    senderCompany: t.sender_name || "Unknown",
    receiverCompany: t.receiver_name || "Unknown",
    state: t.status,
    amountSend: Number(t.amount),
    productType: "-",
    product: "-",
    transactionDate: formatDate(t.date),
    companyWorkingHours: "-",
    action: "icons",
    status: t.status === "completed" ? "completed" : t.status === "pending" ? "pending" : "failed",
    date: formatDate(t.date),
  };
}


export async function getAllTransactions(): Promise<transaction[]> {
  const res = await api.get("/admin/transactions");
  return res.data.data.map((t: TransactionApiResponse) => mapTransaction(t));
}

export async function getTransactionById(id: number): Promise<transaction> {
  const res = await api.get(`/admin/transactions/${id}`);
  const t = res.data.data;
  return {
    id: t.id,
    senderCompany: t.sender_name,
    receiverCompany: t.receiver_name,
    amountSend: Number(t.amount),
    status: t.status,
    date: t.date,
    state: t.status,
    productType: "-",
    product: "-",
    transactionDate: formatDate(t.date),
    companyWorkingHours: "-",
    action: "icons",
  };
}

export async function updateTransaction(id: number, payload: UpdateTransactionPayload): Promise<void> {
  await api.put(`/admin/transactions/${id}`, payload);
}

export async function deleteTransaction(id: number): Promise<void> {
  await api.delete(`/admin/transactions/${id}`);
}