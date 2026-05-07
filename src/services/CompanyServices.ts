import api from "./axios";
import { Company } from "../interfaces/Company";

export const getCompaniesAPI = async () => {
  const response = await api.get("/companies");

  return response.data;
};

export const getCompanyByIdAPI = async (id: number) => {
  const response = await api.get(`/companies/${id}`);

  return response.data;
};

export const createCompanyAPI = async (data: Company) => {
  const response = await api.post("/companies", data);

  return response.data;
};

export const updateCompanyAPI = async (
  id: number,
  data: Company
) => {
  const response = await api.put(`/companies/${id}`, data);

  return response.data;
};

export const deleteCompanyAPI = async (id: number) => {
  const response = await api.delete(`/companies/${id}`);

  return response.data;
};