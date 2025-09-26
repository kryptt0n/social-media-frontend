import axios from "axios";

export const domain = 'https://api.vitalysukhinin.com';

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
