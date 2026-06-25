import api from "./axiosConfig";

export const uploadVideoFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/uploads/video", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

export const uploadImageFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/uploads/image", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};