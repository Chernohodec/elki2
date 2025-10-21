import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Spacing } from "@vkontakte/vkui";
import { MouseEventHandler } from "react";
import "swiper/css";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { useAppSelector } from "../../store";
import { selectTasks } from "../../store/tasks.reducer";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import css from "./Map.module.css";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export type Map = {
    onBackClick?: MouseEventHandler<HTMLElement>;
    title?: string;
    settings?: boolean;
    props: any;
    className?: string;
};

export const Map = ({ ...props }: Map) => {
    const tasks = useAppSelector(selectTasks);
    const routeNavigator = useRouteNavigator();

    return (
        <div className={classNames(css["map"], props.className)}>
            <SimpleBar
                classNames={{
                    scrollbar: 'map__scrollbar',
                    track: 'map__track',
                }}
                style={{ height: "520px" }}
            >
                <div className={classNames(css["map__image"])}>
                    <div className={classNames(css["tasks"])}>
                        {tasks.map((task, index) => (
                            <div className={css["task-item"]} key={task.id}>
                                <div className={css["task-item__content"]}>
                                    <div
                                        className={classNames(
                                            css["task-item__icon"],
                                            css[
                                                `task-item__icon_type_${task.type}`
                                            ]
                                        )}
                                    >
                                        <img
                                            src={`assets/img/tasks/task${task.id}-icon.png`}
                                            alt=""
                                        />
                                    </div>
                                    <Spacing size={12} />
                                    <Title
                                        size="small"
                                        align="center"
                                        color="white"
                                    >
                                        {task.name}
                                    </Title>
                                    <Spacing size={10} />
                                    <Button
                                        size="small"
                                        onClick={() =>
                                            routeNavigator.showModal(
                                                DEFAULT_VIEW_MODALS.TASK_MODAL,
                                                {
                                                    state: {
                                                        action: "taskID",
                                                        value: task.id,
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        Выполнить
                                    </Button>
                                </div>
                                <div
                                    className={css["task-item__image-wrapper"]}
                                >
                                    <div
                                        className={classNames(
                                            css["task-item__image"],
                                            css[
                                                `task-item__image_type_${task.type}`
                                            ]
                                        )}
                                    >
                                        <img
                                            className={
                                                css["task-item__image-pic"]
                                            }
                                            width={95}
                                            src={`assets/img/tasks/task${task.id}-icon.png`}
                                            alt=""
                                        />
                                        <div
                                            className={classNames(
                                                css["task-item__character"],
                                                css[
                                                    `task-item__character_type_${task.type}`
                                                ]
                                            )}
                                        >
                                            <img
                                                src={`assets/img/${task.type}-icon.png`}
                                                width={30}
                                                alt=""
                                            />
                                            <Title
                                                size="small"
                                                color="red-black"
                                            >
                                                {task.type === "parent"
                                                    ? "Родители"
                                                    : "Ваня"}
                                            </Title>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={classNames(css["tasks-progress"])}></div>
                </div>
            </SimpleBar>
        </div>
    );
};
