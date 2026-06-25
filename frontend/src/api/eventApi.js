import api from "./axiosConfig";

export const getEvents = async (page = 0, size = 5) => {
    const response = await api.get(`/events?page=${page}&size=${size}`);
    return response.data;
};

export const addEvent = async (data) => {
    const response = await api.post("/events", data);
    return response.data;
};

export const updateEvent = async (id, data) => {
    const response = await api.put(`/events/${id}`, data);
    return response.data;
};

export const deleteEvent = async (id) => {
    await api.delete(`/events/${id}`);
};

export const getUpcomingEvents = async (page = 0, size = 3) => {
    const response = await api.get(`/events/upcoming?page=${page}&size=${size}`);
    return response.data;
};