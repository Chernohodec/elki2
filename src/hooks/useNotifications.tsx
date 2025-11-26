import bridge from "@vkontakte/vk-bridge";
import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { postUser } from "../api/user/postUser";
import { ONBOARDING_VIEW_PANELS } from "../routes";
import { useAppDispatch } from "../store";
import {
    setNotificationIsAllowed,
    setOnboardingComplete,
} from "../store/main.reducer";
import { sendBridgeTrack } from "../helpers/sendBridgeTrack";

export const useNotifications = () => {
    const dispatch = useAppDispatch();
    const routeNavigator = useRouteNavigator();
    const activeVkuiLocation = useActiveVkuiLocation();
    const currentPanel = activeVkuiLocation.panel;

    const completeOnboarding = () => {
        postUser({
            is_onboarded: true,
        });
        dispatch(setOnboardingComplete(true));
        routeNavigator.push(`/`, { keepSearchParams: true });
        sendBridgeTrack("registration");
    };

    const askAllowNotifications = async () => {
        await bridge
            .send("VKWebAppAllowNotifications")
            .then((data) => {
                if (data.result) {
                    dispatch(setNotificationIsAllowed(true));
                    postUser({ is_notifications_allowed: true });
                } else {
                    // Ошибка
                    dispatch(setNotificationIsAllowed(false));
                    postUser({ is_notifications_allowed: false });
                }
            })
            .catch((error) => {
                console.log('VKWebAppAllowNotifications error', error)
                dispatch(setNotificationIsAllowed(false));
                postUser({ is_notifications_allowed: false });
            });
        if (currentPanel === ONBOARDING_VIEW_PANELS.NOTIFICATIONS) {
            completeOnboarding();
        }
    };

    const askDenyNotifications = async () => {
        bridge.send("VKWebAppDenyNotifications").then((data) => {
            if (data.result) {
                dispatch(setNotificationIsAllowed(false));
                postUser({ is_notifications_allowed: false });
            }
        });
    };

    return {
        askAllowNotifications,
        askDenyNotifications,
    };
};
