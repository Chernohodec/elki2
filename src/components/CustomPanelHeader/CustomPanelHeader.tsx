import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { classNames, PanelHeader, PlatformProvider, usePlatform } from "@vkontakte/vkui";
import { MouseEventHandler, ReactNode } from "react";
import { DEFAULT_VIEW_PANELS, ONBOARDING_VIEW_PANELS } from "../../routes";
import { useAppSelector } from "../../store";
import { selectBalls, selectTasks } from "../../store/tasks.reducer";
import { Title } from "../Title/Title";
import css from "./CustomPanelHeader.module.css";
import {
    Icon24Back,
    Icon28Settings,
    Icon28SettingsOutline,
} from "@vkontakte/icons";

export type CustomPanelHeader = {
    onBackClick?: MouseEventHandler<HTMLElement>;
    title?: string;
    settings?: boolean;
    children?: ReactNode;
};

export const CustomPanelHeader = ({
    title,
    onBackClick,
    settings,
    ...props
}: CustomPanelHeader) => {
    const routeNavigator = useRouteNavigator();
    const { panel: activePanel } = useActiveVkuiLocation();
    const isMainPanel = activePanel === DEFAULT_VIEW_PANELS.MAIN;
    const isOnboarding =
        activePanel === ONBOARDING_VIEW_PANELS.START ||
        activePanel === ONBOARDING_VIEW_PANELS.NOTIFICATIONS;
    const balls = useAppSelector(selectBalls);

    return (
        <PlatformProvider value="ios">
        <PanelHeader
            className={classNames(css["custom-header"])}
            delimiter="none"
            transparent={true}
            fixed={isMainPanel ? false : false}
            float={isMainPanel ? true : false}
            before={
                onBackClick ? (
                    <div className={css["header-back"]} onClick={onBackClick}>
                        <Icon24Back color="#FFC30B" />
                    </div>
                ) : isMainPanel &&  (
                    <div
                        className={css["task-counter"]}
                        onClick={() =>
                            routeNavigator.push(
                                `/${DEFAULT_VIEW_PANELS.TASKS}?tab=balls`
                            )
                        }
                    >
                        <span className={css["task-counter__value"]}>
                            {balls.length}
                        </span>
                    </div>
                )
            }
            after={
                settings && (
                    <div className={css["header-settings"]}>
                    <Icon28SettingsOutline
                        onClick={() =>
                            routeNavigator.push(DEFAULT_VIEW_PANELS.SETTINGS)
                        }
                        fill="#ffffff"
                    />
                    </div>
                )
            }
        >
            {props.children ? (
                props.children
            ) : isMainPanel || isOnboarding ? (
                <img
                    className={css["header-logo"]}
                    width={80}
                    src={"assets/img/logo.png"}
                    alt=""
                />
            ) : (
                <Title
                    className={css["header-title"]}
                    color="yellow"
                    align="center"
                >
                    {title}
                </Title>
            )}
        </PanelHeader>
        </PlatformProvider>
    );
};
