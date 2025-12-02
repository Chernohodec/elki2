import { Icon16CheckOutline } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Div, NavIdProps, Panel, Spacing, classNames } from "@vkontakte/vkui";
import { FC } from "react";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { Map } from "../../components/Map/Map";
import { Text } from "../../components/Text/Text";
import Timer from "../../components/Timer/Timer";
import { Title } from "../../components/Title/Title";
import { VkVideoBanner } from "../../components/VkVideoBanner/VkVideoBanner";
import { checkTimeIsAllowed } from "../../helpers/checkTimeIsAllowed";
import { DEFAULT_VIEW_MODALS, DEFAULT_VIEW_PANELS } from "../../routes";
import { useAppSelector } from "../../store";
import { selectTasks } from "../../store/tasks.reducer";
import css from "./Main.module.css";

export const Main: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const tasks = useAppSelector(selectTasks);
    const completedTasks = tasks.filter((task) => task.completed).length;
    const tasksDone = tasks.filter((task) => !task.completed).length === 0;

    return (
        <Panel
            id={id}
            className={classNames(css["main-panel"])}
            disableBackground
        >
            <CustomPanelHeader title={"Задания"} settings />
            <Map className={css["main-page__map"]} />
            <Div>
                <Spacing size={25} />
                <Title color="yellow" size="big" align="center">
                    Задания
                </Title>
                <div className={css["main-panel__counter"]}>
                    <Icon16CheckOutline width={20} height={20} fill="#ffffff" />
                    <Title color="white" size="small">
                        {completedTasks}/6
                    </Title>
                </div>
                <Spacing size={20} />
                {tasksDone ? (
                    <div className={css["tasks-done"]}>
                        <Spacing size={50} />
                        <img
                            width={190}
                            height={190}
                            src="assets/img/tasks/task-done-pic.png"
                            alt=""
                        />
                        <Title align="center" color="yellow">
                            Все задания
                            <br />
                            выполнены
                        </Title>
                        <Spacing size={70} />
                        <Button
                            color="transparent-yellow"
                            onClick={() =>
                                routeNavigator.push(
                                    `/${DEFAULT_VIEW_PANELS.TASKS}?tab=balls`
                                )
                            }
                        >
                            <span>Мои шары</span>
                            <img
                                style={{ transform: "rotate(-90deg)" }}
                                src="assets/img/all-tasks-icon.svg"
                                alt=""
                            />
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className={css["tasks-list"]}>
                            {tasks.map((task, index) => {
                                const taskIsOpen = checkTimeIsAllowed(
                                    task.activation_time
                                );
                                const previousTaskCompleted =
                                    index === 0
                                        ? true
                                        : tasks[index - 1].completed;

                                return (
                                    <div
                                        className={css["tasks-item"]}
                                        key={task.id}
                                    >
                                        <div
                                            className={
                                                css["tasks-item__content"]
                                            }
                                        >
                                            {!previousTaskCompleted ? (
                                                <div
                                                    className={
                                                        css[
                                                            "tasks-item__closed"
                                                        ]
                                                    }
                                                >
                                                    <img
                                                        width={24}
                                                        src="/assets/img/lock-icon.svg"
                                                        alt=""
                                                    />
                                                    <Title
                                                        size="xs"
                                                        color="red-black"
                                                    >
                                                        Выполните предыдущее
                                                        <br />
                                                        задание
                                                    </Title>
                                                </div>
                                            ) : (
                                                <>
                                                    {taskIsOpen && (
                                                        <div
                                                            className={classNames(
                                                                css[
                                                                    "tasks-item__image"
                                                                ],
                                                                css[
                                                                    `tasks-item__image_type_${task.type}`
                                                                ]
                                                            )}
                                                        >
                                                            <img
                                                                width={85}
                                                                src={
                                                                    task.completed
                                                                        ? `assets/img/tasks/task-done-pic.png`
                                                                        : `assets/img/tasks/task${task.id}-icon.png`
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                    )}
                                                    <div
                                                        className={
                                                            css[
                                                                "tasks-item__info"
                                                            ]
                                                        }
                                                    >
                                                        <div
                                                            className={classNames(
                                                                css[
                                                                    "tasks-item__char"
                                                                ],
                                                                css[
                                                                    `tasks-item__char_type_${task.type}`
                                                                ]
                                                            )}
                                                        >
                                                            <img
                                                                width={20}
                                                                src={`assets/img/${task.type}-icon.png`}
                                                                alt=""
                                                            />
                                                            <Title
                                                                className={
                                                                    css[
                                                                        "tasks-item__char-title"
                                                                    ]
                                                                }
                                                                color={
                                                                    task.type ===
                                                                    "parent"
                                                                        ? "yellow"
                                                                        : "red"
                                                                }
                                                                size="small"
                                                            >
                                                                {task.type ===
                                                                "parent"
                                                                    ? "Родители"
                                                                    : "Ваня"}
                                                            </Title>
                                                        </div>
                                                        <Title
                                                            className={
                                                                css[
                                                                    "tasks-item__title"
                                                                ]
                                                            }
                                                            color="black"
                                                            size="small"
                                                        >
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: task.name,
                                                                }}
                                                            ></span>
                                                        </Title>
                                                    </div>
                                                    {task.completed ? (
                                                        <div
                                                            className={
                                                                css[
                                                                    "tasks-item__done"
                                                                ]
                                                            }
                                                        >
                                                            Выполнено
                                                        </div>
                                                    ) : taskIsOpen ? (
                                                        <Button
                                                            className={
                                                                css[
                                                                    "tasks-item__button"
                                                                ]
                                                            }
                                                            color={
                                                                task.type ===
                                                                "kid"
                                                                    ? "yellow"
                                                                    : "red"
                                                            }
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
                                                    ) : (
                                                        <div
                                                            className={
                                                                css[
                                                                    "tasks-item__time-block"
                                                                ]
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    css[
                                                                        "tasks-item__timer-wrapper"
                                                                    ]
                                                                }
                                                            >
                                                                <Title
                                                                    size="xs"
                                                                    color="red-black"
                                                                    className={
                                                                        css[
                                                                            "tasks-item__timer-text"
                                                                        ]
                                                                    }
                                                                >
                                                                    До открытия:
                                                                </Title>
                                                                <Title
                                                                    className={
                                                                        css[
                                                                            "tasks-item__timer"
                                                                        ]
                                                                    }
                                                                    size="medium"
                                                                    color="red-black"
                                                                >
                                                                    <Timer
                                                                        time={
                                                                            task.activation_time
                                                                        }
                                                                    />
                                                                </Title>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
                <Spacing size={50} />
            </Div>
            <div className={classNames(css["main-page-banner"])}>
                <VkVideoBanner
                    href="https://trk.mail.ru/c/kkhk46"
                    onClick={() => {}}
                />
                <Spacing size={30} />
                <Title color="red" align="center">
                    «ЁЛКИ 12» В КИНО С 18 ДЕКАБРЯ
                </Title>
                <Spacing size={10} />
                <Text align="center">
                    Главная новогодняя комедия страны возвращается на экраны!
                    Пять новелл о настоящем чуде сделают праздник особенно
                    тёплым.
                </Text>
                <Spacing size={30} />
                <Button href="https://www.afisha.ru/movie/elki-12-1001086/">
                    Купить билеты
                </Button>
                <Spacing size={10} />
                <Button
                    color="transparent"
                    href="https://elki12.ru/"
                >
                    Подробнее о фильме
                </Button>
                <Spacing size={100} />
            </div>
        </Panel>
    );
};
