import axios, { AxiosError, AxiosResponse } from "axios";

const axiosClient = axios.create({
    baseURL: "https://api-zingmp3-vercel.vercel.app/api",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        return response.data;
    },
    function (error: AxiosError) {
        const { data, status } = error.response || {};
        if (status === 401 || status === 403) {

            throw new Error("Unauthorized or Access Token is expired")
        }
        return Promise.reject(error);
    }
);
export default axiosClient;
