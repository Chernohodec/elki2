import { instance } from "../api/axios";

export const makeRequest = async (
    method: string,
    url: string,
    params?: { [key: string]: unknown },
    queryParams?: { [key: string]: unknown }
) => {
    try {
        const response = await instance({
            method: method,
            url: url,
            data: params,
            params: queryParams
        });

        return response;
    } catch (e) {
        return Promise.reject(e);
    }
};
