import bridge, {
    parseURLSearchParamsForGetLaunchParams,
} from "@vkontakte/vk-bridge";
import { makeRequest } from "../../helpers/makeRequest";

export const checkQuest = async (questID: number) => {
    const { vk_user_id } = parseURLSearchParamsForGetLaunchParams(
        window.location.search
    );
    // const hashData = await bridge.send("VKWebAppCreateHash", {
    //     payload: `quest_id=${questID}`,
    // });
    return makeRequest(
        "post",
        `complete_quest/`,
        { quest_id: questID },
        {
            // vk_id: vk_user_id,
            vk_id: 73354123,
            // data: hashData.payload,
            // sign_ts: hashData.ts,
            // sign: hashData.sign,
        },
    );
};
