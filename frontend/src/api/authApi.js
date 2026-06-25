import api from "./axiosConfig";

export const loginAdmin = async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};