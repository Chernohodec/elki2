import { parseURLSearchParamsForGetLaunchParams } from "@vkontakte/vk-bridge";
import { makeRequest } from "../../helpers/makeRequest";

export const postUser = (data: {}) => {
    const { vk_user_id } = parseURLSearchParamsForGetLaunchParams(
        window.location.search
    );
    return makeRequest(
        "patch",
        `user/`,
        { ...data },
        // { vk_id: vk_user_id }
        {vk_id: 73354123}
    );
};
