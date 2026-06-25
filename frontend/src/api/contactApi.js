import api from "./axiosConfig";

export const getContacts = async (
    page = 0,
    size = 5
) => {

    const response =
        await api.get(
            `/contact?page=${page}&size=${size}`
        );

    return response.data;
};

export const replyToContact = async (
    id,
    data
) => {

    const response =
        await api.put(
            `/contact/reply/${id}`,
            data
        );

    return response.data;
};

export const deleteContact = async (
    id
) => {

    await api.delete(
        `/contact/${id}`
    );
};