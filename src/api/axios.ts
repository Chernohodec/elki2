import axios from "axios";
import { API_URL } from "../const";

export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `VK ${btoa(window.location.search)}`,
    },
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);
