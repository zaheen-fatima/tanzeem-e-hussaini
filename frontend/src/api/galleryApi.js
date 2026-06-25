import api from "./axiosConfig";

export const getGalleryItems = async (page = 0, size = 5) => {
    const response = await api.get(`/gallery?page=${page}&size=${size}`);
    return response.data;
};

export const addGalleryItem = async (data) => {
    const response = await api.post("/gallery", data);
    return response.data;
};

export const updateGalleryItem = async (id, data) => {
    const response = await api.put(`/gallery/${id}`, data);
    return response.data;
};

export const deleteGalleryItem = async (id) => {
    await api.delete(`/gallery/${id}`);
};