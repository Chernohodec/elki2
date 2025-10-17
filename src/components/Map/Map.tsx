import { classNames, Spacing, usePlatform } from "@vkontakte/vkui";
import { MouseEventHandler } from "react";
import "swiper/css";
import { useAppSelector } from "../../store";
import { selectTasks } from "../../store/tasks.reducer";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import css from "./Map.module.css";

export type Map = {
    onBackClick?: MouseEventHandler<HTMLElement>;
    title?: string;
    settings?: boolean;
    props: any;
    className?: string;
};

export const Map = ({ ...props }: Map) => {
    const platform = usePlatform();
    const tasks = useAppSelector(selectTasks);
    const taskImages = [
        {
            id: 1,
            icon: "assets/img/tasks/task1-icon.png",
        },
        {
            id: 2,
            icon: "assets/img/tasks/task2-icon.png",
        },
        {
            id: 3,
            icon: "assets/img/tasks/task3-icon.png",
        },
        {
            id: 4,
            icon: "assets/img/tasks/task4-icon.png",
        },
        {
            id: 5,
            icon: "assets/img/tasks/task5-icon.png",
        },
        {
            id: 6,
            icon: "assets/img/tasks/task6-icon.png",
        },
    ];

    return (
        <div className={classNames(css["map"], props.className)}>
            <div className={classNames(css["map__image"])}>
                <div className={classNames(css["tasks"])}>
                    {tasks.map((task, index) => (
                        <div className={css["task-item"]} key={task.id}>
                            <div className={css["task-item__content"]}>
                                <div
                                    className={classNames(
                                        css["task-item__icon"],
                                        css[`task-item__icon_type_${task.type}`]
                                    )}
                                >
                                    <img src={`assets/img/tasks/task${task.id}-icon.png`} alt="" />
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
                                <Button size="small">Выполнить</Button>
                            </div>
                            <div className={css["task-item__image-wrapper"]}>
                                <div
                                    className={classNames(
                                        css["task-item__image"],
                                        css[
                                            `task-item__image_type_${task.type}`
                                        ]
                                    )}
                                >
                                    <img
                                        className={css["task-item__image-pic"]}
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
                                        <Title size="small" color="red-black">
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
        </div>
    );
};
