import api from "./axiosConfig";

export const getAnnouncements = async (page = 0, size = 5) => {
    const response = await api.get(`/announcements?page=${page}&size=${size}`);
    return response.data;
};

export const addAnnouncement = async (data) => {
    const response = await api.post("/announcements", data);
    return response.data;
};

export const updateAnnouncement = async (id, data) => {
    const response = await api.put(`/announcements/${id}`, data);
    return response.data;
};

export const deleteAnnouncement = async (id) => {
    await api.delete(`/announcements/${id}`);
};

export const getActiveAnnouncements = async (page = 0, size = 3) => {
    const response = await api.get(`/announcements/active?page=${page}&size=${size}`);
    return response.data;
};