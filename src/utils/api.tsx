import ax, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const api = ax.create({ baseURL: process.env.BASE_URL });

export default api;
