import api from "./axios";

export const loginAPI = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/login", data);
  return res.data;
};

export const logout = () => {
  
  localStorage.removeItem("token");
};