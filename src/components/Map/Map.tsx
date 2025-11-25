import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Spacing } from "@vkontakte/vkui";
import { createRef, MouseEventHandler, useEffect, useRef } from "react";
import Snowfall from "react-snowfall";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { checkTimeIsAllowed } from "../../helpers/checkTimeIsAllowed";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { useAppSelector } from "../../store";
import { selectTasks } from "../../store/tasks.reducer";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import { Fireworks } from "@fireworks-js/react";
import css from "./Map.module.css";

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
    const scrollableNodeRef = createRef<HTMLDivElement>();
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        const scrollableNode = scrollableNodeRef.current;

        if (!scrollableNode) return;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            startX.current = e.pageX - scrollableNode.offsetLeft;
            scrollLeft.current = scrollableNode.scrollLeft;

            // Добавляем класс для изменения курсора
            scrollableNode.style.cursor = "grabbing";
            scrollableNode.style.userSelect = "none";
        };

        const handleMouseLeave = () => {
            isDragging.current = false;
            scrollableNode.style.cursor = "grab";
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            scrollableNode.style.cursor = "grab";
            scrollableNode.style.userSelect = "auto";
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            e.preventDefault();

            const x = e.pageX - scrollableNode.offsetLeft;
            const walk = (x - startX.current) * 2; // Множитель для скорости скролла
            scrollableNode.scrollLeft = scrollLeft.current - walk;
        };

        // Добавляем обработчики событий
        scrollableNode.addEventListener("mousedown", handleMouseDown);
        scrollableNode.addEventListener("mouseleave", handleMouseLeave);
        scrollableNode.addEventListener("mouseup", handleMouseUp);
        scrollableNode.addEventListener("mousemove", handleMouseMove);

        // Устанавливаем начальный курсор
        scrollableNode.style.cursor = "grab";

        return () => {
            // Очистка обработчиков при размонтировании
            scrollableNode.removeEventListener("mousedown", handleMouseDown);
            scrollableNode.removeEventListener("mouseleave", handleMouseLeave);
            scrollableNode.removeEventListener("mouseup", handleMouseUp);
            scrollableNode.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className={classNames(css["map"], props.className)}>
            <SimpleBar
                scrollableNodeProps={{
                    ref: scrollableNodeRef,
                }}
                classNames={{
                    scrollbar: "map__scrollbar",
                    track: "map__track",
                }}
                style={{ height: "525px" }}
            >
                <div className={classNames(css["map__image"])}>
                    <div className={css["map__fireworks"]}>
                        <Fireworks
                            options={{
                                hue: { min: 40, max: 40 },
                                acceleration: 1, // Медленное ускорение для плавности
                                brightness: { min: 40, max: 70 }, // Приглушенная яркость
                                decay: { min: 0.02, max: 0.04 }, // Медленное затухание
                                delay: { min: 15, max: 25 }, // Редкие запуски
                                rocketsPoint: {
                                    min: 40,
                                    max: 60,
                                }, // Высота взрыва (ниже = дальше)
                                lineWidth: {
                                    explosion: { min: 0.5, max: 1.5 },
                                    trace: { min: 0.3, max: 1 },
                                }, // Тонкие линии
                                lineStyle: "round",
                                explosion: 6, // Меньше частиц при взрыве
                                intensity: 20, // Низкая интенсивность
                                flickering: 20, // Слабый эффект мерцания
                                opacity: 0.4, // Полупрозрачность для далекого вида
                                traceLength: 2, // Короткие следы
                                traceSpeed: 6, // Медленная скорость
                                particles: 25, // Мало частиц
                            }}
                        />
                    </div>
                    <div className={css["lights"]}>
                        {[...Array(60)].map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={classNames(
                                        css["lights__light"],
                                        css[`lights__light_order_${index + 1}`]
                                    )}
                                    style={{
                                        animationDelay: `${Math.random() * 5}s`,
                                        animationDuration: `${
                                            2 + Math.random() * 3
                                        }s`,
                                    }}
                                ></div>
                            );
                        })}
                    </div>
                    <div
                        className={css["map__car1"]}
                        style={
                            {
                                "--delay": Math.random() * 10,
                            } as React.CSSProperties
                        }
                    ></div>
                    <div
                        className={css["map__car2"]}
                        style={
                            {
                                "--delay": Math.random() * 10,
                            } as React.CSSProperties
                        }
                    ></div>
                    <div
                        className={classNames(
                            "particles",
                            css["map__particles"]
                        )}
                    >
                        <Snowfall
                            color="#fff"
                            // Applied to the canvas element.
                            style={{ background: "transparent" }}
                            radius={[0.8, 1]}
                            // Controls the number of snowflakes that are created (defaults to 150).
                            snowflakeCount={2500}
                        />
                    </div>
                    <div className={classNames(css["tasks"])}>
                        {tasks.map((task, index) => {
                            const taskIsOpen = checkTimeIsAllowed(
                                task.activation_time
                            );
                            return (
                                <div
                                    className={classNames(
                                        css["task-item"],
                                        css[`task-item_order_${index + 1}`]
                                    )}
                                    key={task.id}
                                >
                                    {taskIsOpen && (
                                        <div
                                            className={
                                                css["task-item__content"]
                                            }
                                        >
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
                                                className={
                                                    css["task-item__title"]
                                                }
                                            >
                                                {task.name}
                                            </Title>
                                            <Spacing size={10} />
                                            {task.completed ? (
                                                <div
                                                    className={
                                                        css["task-item__done"]
                                                    }
                                                >
                                                    Выполнено
                                                </div>
                                            ) : (
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
                                            )}
                                        </div>
                                    )}
                                    <div
                                        className={
                                            css["task-item__image-wrapper"]
                                        }
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
                                                src={
                                                    task.completed
                                                        ? `assets/img/tasks/task-done-pic.png`
                                                        : `assets/img/tasks/task${task.id}-icon.png`
                                                }
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
                            );
                        })}
                    </div>
                    <div className={classNames(css["tasks-progress"])}></div>
                </div>
            </SimpleBar>
        </div>
    );
};
