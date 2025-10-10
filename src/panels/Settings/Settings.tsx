import {
    Icon24ChevronCompactRight,
    Icon24NotificationOutline,
    Icon28DocumentTextOutline,
} from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    Div,
    NavIdProps,
    Panel,
    SimpleCell,
    Spacing,
    Switch,
    usePlatform,
} from "@vkontakte/vkui";
import { FC } from "react";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";

import { useNotifications } from "../../hooks/useNotifications";

import { VkVideoBanner } from "../../components/VkVideoBanner/VkVideoBanner";
import { useAppSelector } from "../../store";
import { selectNotificationIsAllowed } from "../../store/main.reducer";
import css from "./Settings.module.css";
import { Button } from "../../components/Button/Button";

export const Settings: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const { askAllowNotifications, askDenyNotifications } = useNotifications();
    const notificationIsAllowed = useAppSelector(selectNotificationIsAllowed);
    const platform = usePlatform();
    const isDesktop = platform === "vkcom";

    return (
        <Panel id={id} disableBackground className={css["settings-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
                title="Настройки"
            />
            <div className={css["settings-panel__content"]}>
                <div className={css["settings-block"]}></div>
                <Div>
                    <Spacing size={10} />
                    <SimpleCell
                        after={
                            <Switch
                                className={css["settings-switch"]}
                                checked={notificationIsAllowed}
                                onChange={() => {
                                    notificationIsAllowed
                                        ? askDenyNotifications()
                                        : askAllowNotifications(true);
                                }}
                            />
                        }
                        subtitle={<span>Пришлём уведомление, <br/>когда откроется новое задание</span>}
                        before={
                            <Icon24NotificationOutline
                                fill="#DD2085"
                                width={28}
                                height={28}
                            />
                        }
                    >
                        Уведомления
                    </SimpleCell>
                    <Spacing size={10} />
                    <SimpleCell
                        before={<Icon28DocumentTextOutline fill="#DD2085" />}
                        after={<Icon24ChevronCompactRight fill="#DD2085" />}
                        href="https://disk.yandex.ru/i/uL5nT6gWIG7_3w"
                        target="_blank"
                    >
                        Правила сервиса
                    </SimpleCell>
                    <Spacing size={30} />
                    <VkVideoBanner
                        href="https://trk.mail.ru/c/kkhk46"
                        onClick={() => {}}
                    />
                    <Spacing size={20} />
                    <Button href="https://www.afisha.ru/movie/finnik-2-306500/">Купить билеты</Button>
                </Div>
            </div>
        </Panel>
    );
};
