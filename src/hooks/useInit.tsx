import { useState } from "react";

import { useSearchParams } from "@vkontakte/vk-mini-apps-router";
import { getUser } from "../api/user/getUser";
import { useAppDispatch } from "../store";
import {
    setNotificationIsAllowed,
    setOnboardingComplete,
} from "../store/main.reducer";
import { setBalls, setTasks } from "../store/tasks.reducer";

export const useInit = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const dispatch = useAppDispatch();
    const [params] = useSearchParams();
    const referalID = params.get("referal_id");

    const init = async () => {
        setLoading(true);

        try {
            const userInfo = await getUser(referalID);
            console.log(userInfo)
            const stateTasks = userInfo.data.quests
            dispatch(
                setTasks(stateTasks)
            );
            dispatch(setBalls(userInfo.data.tickets));
            dispatch(
                setNotificationIsAllowed(userInfo.data.is_notifications_allowed)
            );
            dispatch(setOnboardingComplete(userInfo.data.is_onboarded));
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
