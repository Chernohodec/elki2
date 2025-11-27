import { parseURLSearchParamsForGetLaunchParams } from "@vkontakte/vk-bridge";
import { makeRequest } from "../../helpers/makeRequest";

export const postStat = (data: {}) => {
    const { vk_user_id } = parseURLSearchParamsForGetLaunchParams(
        window.location.search
    );
    return makeRequest(
        "post",
        `stats/`,
        { ...data },
        { vk_id: vk_user_id }
        // { vk_id: 73354123 }
    );
};
