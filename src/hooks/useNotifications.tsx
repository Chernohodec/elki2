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
            onboardingIsCompleted: true,
        });
        dispatch(setOnboardingComplete(true));
        routeNavigator.push(`/`, { keepSearchParams: true });
        sendBridgeTrack('registration')
    };

    const askAllowNotifications = async (menu?: boolean) => {
        await bridge
            .send("VKWebAppAllowNotifications")
            .then((data) => {
                if (data.result) {
                    // Разрешение на отправку уведомлений мини-приложением или игрой получено
                    dispatch(setNotificationIsAllowed(true));
                    postUser({ notificationIsAllowed: true });
                } else {
                    // Ошибка
                    dispatch(setNotificationIsAllowed(false));
                    postUser({ notificationIsAllowed: false });
                }
            })
            .catch((error) => {
                dispatch(setNotificationIsAllowed(false));
                postUser({ notificationIsAllowed: false });
            });
        if (currentPanel === ONBOARDING_VIEW_PANELS.NOTIFICATIONS) {
            completeOnboarding();
        }
    };

    const askDenyNotifications = async () => {
        bridge.send("VKWebAppDenyNotifications").then((data) => {
            if (data.result) {
                dispatch(setNotificationIsAllowed(false));
                postUser({ notificationIsAllowed: false });
            }
        });
    };

    return {
        askAllowNotifications,
        askDenyNotifications,
    };
};
