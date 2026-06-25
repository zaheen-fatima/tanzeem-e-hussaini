import api from "./axiosConfig";

export const submitContactMessage = async (data) => {
    const response = await api.post("/contact", data);
    return response.data;
};