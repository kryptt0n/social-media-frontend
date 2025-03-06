import axios from "axios";

export const domain = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: domain,
    headers: {},
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = "/";
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;