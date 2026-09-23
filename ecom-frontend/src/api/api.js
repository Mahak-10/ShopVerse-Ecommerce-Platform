import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL || "http://localhost:8080"}/api`,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            try {
                const parsed = typeof authData === "string" && authData.startsWith("{") ? JSON.parse(authData) : authData;
                let token = parsed?.jwtToken || parsed?.token || parsed?.jwt || (typeof parsed === "string" ? parsed : null);
                if (token && typeof token === "string") {
                    if (token.includes("=")) {
                        token = token.split("=")[1]?.split(";")[0];
                    }
                    config.headers.Authorization = `Bearer ${token.trim()}`;
                }
            } catch (e) {
                console.error("Error parsing auth from localStorage", e);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;