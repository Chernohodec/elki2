import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { classNames, PanelHeader, usePlatform } from "@vkontakte/vkui";
import { MouseEventHandler } from "react";
import logoColored from "../../assets/img/logo-colored.png";
import logo from "../../../public/assets/img/logo.png";
import { DEFAULT_VIEW_PANELS } from "../../routes";
import { useAppSelector } from "../../store";
import { selectTasks } from "../../store/tasks.reducer";
import { Title } from "../Title/Title";
import css from "./CustomPanelHeader.module.css";

export type CustomPanelHeader = {
    onBackClick?: MouseEventHandler<HTMLElement>;
    title?: string;
    settings?: boolean;
};

export const CustomPanelHeader = ({
    title,
    onBackClick,
    settings,
    ...props
}: CustomPanelHeader) => {
    const platform = usePlatform();
    const isDesktop = platform === "vkcom";
    const tasks = useAppSelector(selectTasks)
    const routeNavigator = useRouteNavigator();
    const taskPages = [
        DEFAULT_VIEW_PANELS.GAME1_START,
        DEFAULT_VIEW_PANELS.GAME1,
        DEFAULT_VIEW_PANELS.GAME2_START,
        DEFAULT_VIEW_PANELS.GAME2,
        DEFAULT_VIEW_PANELS.GAME3_START,
        DEFAULT_VIEW_PANELS.GAME3,
        DEFAULT_VIEW_PANELS.GAME4_START,
        DEFAULT_VIEW_PANELS.GAME4,
        DEFAULT_VIEW_PANELS.GAME5_START,
        DEFAULT_VIEW_PANELS.GAME5,
        DEFAULT_VIEW_PANELS.GAME6_START,
        DEFAULT_VIEW_PANELS.GAME6,
    ];
    const { panel: activePanel } = useActiveVkuiLocation();
    const finishedTasks = tasks.filter(task=>task.checked)

    return (
        <PanelHeader
            className={classNames(
                css["custom-header"],
            )}
            delimiter="none"
            transparent={true}
            before={
                onBackClick ? (
                    <div
                        className={css["header-back"]}
                        onClick={onBackClick}
                    ></div>
                ) : (
                    <div className={css["task-counter"]}>
                        <span className={css["task-counter__value"]}>23</span>
                    </div>
                )
            }
            after={
                settings && (
                    <div
                        className={css["header-settings"]}
                        onClick={() =>
                            routeNavigator.push(DEFAULT_VIEW_PANELS.SETTINGS)
                        }
                    ></div>
                )
            }
        >
        </PanelHeader>
    );
};
