import bridge from "@vkontakte/vk-bridge";
import { APP_ID } from "../const";

export const getAccessToken = async (scope: string) => {
    try {
        const data = await bridge.send("VKWebAppGetAuthToken", {
            app_id: APP_ID,
            scope: scope,
        });
        return data.access_token;
    } catch (error) {
        console.log("Ошибка получения access_token:", error);
    }
};
