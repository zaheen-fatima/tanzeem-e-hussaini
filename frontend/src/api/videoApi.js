import api from "./axiosConfig";

export const getVideos = async (page = 0, size = 6) => {
    const response = await api.get(`/videos?page=${page}&size=${size}`);
    return response.data;
};

export const getVideosByCategory = async (category, page = 0, size = 6) => {
    const response = await api.get(
        `/videos/category/${category}?page=${page}&size=${size}`
    );
    return response.data;
};

export const addVideo = async (data) => {
    const response = await api.post("/videos", data);
    return response.data;
};

export const updateVideo = async (id, data) => {
    const response = await api.put(`/videos/${id}`, data);
    return response.data;
};

export const deleteVideo = async (id) => {
    await api.delete(`/videos/${id}`);
};