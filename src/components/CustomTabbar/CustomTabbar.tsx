import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { classNames, usePlatform } from "@vkontakte/vkui";
import { DEFAULT_VIEW_PANELS } from "../../routes";
import css from "./CustomTabbar.module.css";

export type CustomTabbar = {};

export const CustomTabbar = ({ ...props }: CustomTabbar) => {
    const platform = usePlatform();
    const isDesktop = platform === "vkcom";
    const routeNavigator = useRouteNavigator();
    const gamesPanels = [
        DEFAULT_VIEW_PANELS.GAME1_START,
        DEFAULT_VIEW_PANELS.GAME2_START,
        DEFAULT_VIEW_PANELS.GAME3_START,
        DEFAULT_VIEW_PANELS.GAME4_START,
        DEFAULT_VIEW_PANELS.GAME5_START,
        DEFAULT_VIEW_PANELS.GAME6_START,
    ];
    const { panel: activePanel = DEFAULT_VIEW_PANELS.MAIN } =
        useActiveVkuiLocation();
    const isMainPanel = activePanel === DEFAULT_VIEW_PANELS.MAIN;
    const isTasksPanel =
        activePanel === DEFAULT_VIEW_PANELS.TASKS ||
        gamesPanels.includes(activePanel);
    const isAboutPanel = activePanel === DEFAULT_VIEW_PANELS.ABOUT;
    const isPrizePanel = activePanel === DEFAULT_VIEW_PANELS.PRIZE;

    return (
        <div className={classNames(css["custom-tabbar"])}>
            <button
                onClick={() =>
                    routeNavigator.push(`${DEFAULT_VIEW_PANELS.MAIN}`)
                }
                className={classNames(
                    css["tabbar-item"],
                    isMainPanel && css["tabbar-item_active"]
                )}
            >
                <div className={css["tabbar-item__content"]}>
                    <img src={'assets/img/tasks-icon.svg'} alt="" />
                    <span>Задания</span>
                </div>
            </button>
            <button
                onClick={() =>
                    routeNavigator.push(`/${DEFAULT_VIEW_PANELS.TASKS}?tab=tickets`)
                }
                className={classNames(
                    css["tabbar-item"],
                    isTasksPanel && css["tabbar-item_active"]
                )}
            >
                <div className={css["tabbar-item__content"]}>
                    <img src={'assets/img/balls-icon.svg'} alt="" />
                    <span>Мои шары</span>
                </div>
            </button>
            <button
                onClick={() =>
                    routeNavigator.push(`/${DEFAULT_VIEW_PANELS.PRIZE}`)
                }
                className={classNames(
                    css["tabbar-item"],
                    isPrizePanel && css["tabbar-item_active"]
                )}
            >
                <div className={css["tabbar-item__content"]}>
                    <img src={'assets/img/gifts-icon.svg'} alt="" />
                    <span>О розыгрыше</span>
                </div>
            </button>
            <button
                onClick={() =>
                    routeNavigator.push(`/${DEFAULT_VIEW_PANELS.ABOUT}`)
                }
                className={classNames(
                    css["tabbar-item"],
                    isAboutPanel && css["tabbar-item_active"]
                )}
            >
                <div className={css["tabbar-item__content"]}>
                    <img src={'assets/img/about-icon.svg'} alt="" />
                    <span>О фильме</span>
                </div>
            </button>
        </div>
    );
};
