import api from "./axiosConfig";

export const getTodayPrayerTimes = async () => {
    const response = await api.get("/prayer/today");
    return response.data;
};