import api from "./axiosConfig";

export const getSurahs = async () => {
    const response = await api.get("/quran/surahs");
    return response.data;
};

export const getSurahWithTranslation = async (number) => {
    const response = await api.get(`/quran/surah/${number}/translation`);
    return response.data;
};

export const getSurahAudio = async (number) => {
    const response = await api.get(`/quran/surah/${number}/audio`);
    return response.data;
};