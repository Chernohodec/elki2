import {
    Icon24ChevronCompactRight,
    Icon24NotificationOutline,
    Icon28DocumentTextOutline,
} from "@vkontakte/icons";
import {
    Div,
    NavIdProps,
    Panel,
    SimpleCell,
    Spacing,
    Switch,
} from "@vkontakte/vkui";
import { FC } from "react";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { VkVideoBanner } from "../../components/VkVideoBanner/VkVideoBanner";
import { useNotifications } from "../../hooks/useNotifications";
import { useAppSelector } from "../../store";
import { selectNotificationIsAllowed } from "../../store/main.reducer";
import css from "./Settings.module.css";

export const Settings: FC<NavIdProps> = ({ id, onBackClick }) => {
    const { askAllowNotifications, askDenyNotifications } = useNotifications();
    const notificationIsAllowed = useAppSelector(selectNotificationIsAllowed);

    return (
        <Panel id={id} disableBackground className={css["settings-panel"]}>
            <CustomPanelHeader onBackClick={onBackClick} title="Настройки" />
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
                                        : askAllowNotifications();
                                }}
                            />
                        }
                        multiline
                        subtitle={
                            <span style={{ color: "#ffffffaa", fontSize: 12, lineHeight: 1.2 }}>
                                Пришлём уведомление,
                                когда откроется новое задание
                            </span>
                        }
                        before={
                            <Icon24NotificationOutline
                                fill="#FFC30B"
                                width={28}
                                height={28}
                            />
                        }
                    >
                        <span style={{ color: "#fff" }}>Уведомления</span>
                    </SimpleCell>
                    <Spacing size={10} />
                    <SimpleCell
                        before={<Icon28DocumentTextOutline fill="#FFC30B" />}
                        after={<Icon24ChevronCompactRight fill="#FFC30B" />}
                        href="https://disk.yandex.ru/d/VNfEUfaxM0XhLA"
                        target="_blank"
                    >
                        <span style={{ color: "#fff" }}>Правила сервиса</span>
                    </SimpleCell>
                    <Spacing size={30} />
                    <VkVideoBanner
                        href="https://trk.mail.ru/c/kkhk46"
                        onClick={() => {}}
                    />
                    <Spacing size={20} />
                    <Button
                        color="yellow"
                        href="https://www.afisha.ru/movie/elki-12-1001086/"
                    >
                        Купить билеты
                    </Button>
                </Div>
            </div>
        </Panel>
    );
};
