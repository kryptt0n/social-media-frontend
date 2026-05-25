import axios from "axios";

//export const domain = 'https://api.vitalysukhinin.com';
export const domain = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: domain,
    headers: {},
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = error.config?.url || "";

        if (error.response && error.response.status === 401 && !url.includes("/identity/me")) {
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
