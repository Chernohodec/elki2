import { parseURLSearchParamsForGetLaunchParams } from "@vkontakte/vk-bridge";
import { makeRequest } from "../../helpers/makeRequest";

export const getUser = (referalID?: string) =>{
    const { vk_user_id } = parseURLSearchParamsForGetLaunchParams(
            window.location.search
        );
    return makeRequest(
        "get",
        `user/`,
        {},
        {referal: referalID, vk_id: vk_user_id}
        // {referal: referalID, vk_id: 73354123}
    );
}