import api from "./axios";
import { CompanyPayload, CompanyApiResponse } from "../interfaces/Company";


export const getCompaniesAPI = async (): Promise<CompanyApiResponse[]> => {
  const res = await api.get("/companies");
  return res.data;
};

export const getPendingCompaniesAPI = async (): Promise<CompanyApiResponse[]> => {
  const res = await api.get("/companies/pending");
  return res.data.pending_companies;
};

export const getCompanyByIdAPI = async (id: number): Promise<CompanyApiResponse> => {
  const res = await api.get(`/companies/${id}`);
  return res.data;
};

export const createCompanyAPI = async (data: CompanyPayload): Promise<CompanyApiResponse> => {
  const res = await api.post("/companies", data);
  return res.data;
};

export const updateCompanyAPI = async (id: number, data: Partial<CompanyPayload>): Promise<CompanyApiResponse> => {
  const res = await api.put(`/companies/${id}`, { name: data.name });
  return res.data;
};

export const deleteCompanyAPI = async (id: number): Promise<void> => {
  await api.delete(`/companies/${id}`);
};

export const approveCompanyAPI = async (id: number): Promise<void> => {
  await api.post(`/companies/approve/${id}`);
};