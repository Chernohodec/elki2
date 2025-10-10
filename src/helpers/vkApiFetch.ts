import bridge from "@vkontakte/vk-bridge";

import { getAccessToken } from "./getAccessToken";

export const vkApiFetch = async (
    method: string,
    scope: string,
    params?: { [key: string]: unknown },
) => {
    const accessToken = await getAccessToken(scope);
    try {
        return await bridge.send("VKWebAppCallAPIMethod", {
            method: method,
            params: {
                v: "5.199",
                access_token: accessToken ?? "",
                ...params,
            },
        });
    } catch (e) {
        return Promise.reject(e);
    }
};
