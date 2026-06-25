import api from "./axiosConfig";

export const getArticles = async (page = 0, size = 5) => {
    const response = await api.get(`/articles?page=${page}&size=${size}`);
    return response.data;
};

export const addArticle = async (data) => {
    const response = await api.post("/articles", data);
    return response.data;
};

export const updateArticle = async (id, data) => {
    const response = await api.put(`/articles/${id}`, data);
    return response.data;
};

export const deleteArticle = async (id) => {
    await api.delete(`/articles/${id}`);
};

export const getArticleBySlug = async (slug) => {
    const response = await api.get(`/articles/slug/${slug}`);
    return response.data;
};