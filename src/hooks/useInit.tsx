import { useState } from "react";

import { useSearchParams } from "@vkontakte/vk-mini-apps-router";
import { getUser } from "../api/user/getUser";
import { useAppDispatch } from "../store";
import {
    setNotificationIsAllowed,
    setOnboardingComplete,
} from "../store/main.reducer";
import {
    setBalls,
    setFriends,
    setTasks
} from "../store/tasks.reducer";

export const useInit = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const dispatch = useAppDispatch();
    const [params] = useSearchParams();
    const referalID = params.get("referal_id");

    // 867521052

    const init = async () => {
        setLoading(true);

        try {
            const userInfo = await getUser(referalID);
            console.log(userInfo);
            dispatch(setFriends(userInfo.referals));
            dispatch(
                setTasks(userInfo.quests.sort((a, b) => a.order - b.order))
            );
            dispatch(setBalls(userInfo.balls));
            dispatch(setNotificationIsAllowed(userInfo.notificationIsAllowed));
            dispatch(setOnboardingComplete(userInfo.onboardingIsCompleted));
            setLoading(false);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return {
        isLoading,
        error,
        init,
    };
};
