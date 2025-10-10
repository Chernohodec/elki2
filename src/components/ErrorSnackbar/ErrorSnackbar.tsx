import { Icon16ErrorCircle } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Avatar, Snackbar } from "@vkontakte/vkui";

export const ErrorSnackbar = () => {
    const routeNavigator = useRouteNavigator()
    return (
        <Snackbar
            onClose={() => routeNavigator.hidePopout()}
            before={
                <Avatar
                    size={24}
                    style={{
                        background: "var(--vkui--color_background_negative)",
                    }}
                >
                    <Icon16ErrorCircle fill="#fff" width={14} height={14} />
                </Avatar>
            }
        >
            Что-то пошло не так
        </Snackbar>
    );
};
