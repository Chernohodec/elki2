import {
    useRouteNavigator,
    useSearchParams,
} from "@vkontakte/vk-mini-apps-router";
import { classNames, Div, NavIdProps, Panel, Spacing } from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
// import taskPic1 from "../../assets/img/task-pic1.png";
// import taskPic2 from "../../assets/img/task-pic2.png";
// import taskPic3 from "../../assets/img/task-pic3.png";
// import taskPic4 from "../../assets/img/task-pic4.png";
// import taskPic5 from "../../assets/img/task-pic5.png";
// import taskPic6 from "../../assets/img/task-pic6.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { InviteBanner } from "../../components/InviteBanner/InviteBanner";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_MODALS, DEFAULT_VIEW_PANELS } from "../../routes";
import { useAppSelector } from "../../store";
import { selectBalls, selectTasks } from "../../store/tasks.reducer";
import css from "./Tasks.module.css";

export const Tasks: FC<NavIdProps> = ({ id, onBackClick }) => {
    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();
    const currentPathTab = params.get("tab");
    const tasks = useAppSelector(selectTasks);

    const [currentTab, setCurrentTab] = useState("tasks");
    const balls = useAppSelector(selectBalls);

    const friends = useAppSelector(selectBalls).filter(
        (ball) => ball.type === "INVITE"
    );
    const ballsToShow = balls.filter((ball) => ball.type === "QUEST");

    useEffect(() => {
        if (currentPathTab) {
            setCurrentTab(currentPathTab);
        }
    }, [currentPathTab, routeNavigator]);

    return (
        <Panel id={id} disableBackground className={css["tasks-panel"]}>
            <CustomPanelHeader onBackClick={onBackClick} title="Мои шары" />
            <Spacing size={20} />
            <div className={css["big-counter"]}>{balls.length}</div>
            <Spacing size={30} />
            <div className={css["tasks-panel__content"]}>
                <Div>
                    <div
                        className={classNames(
                            css["task-switcher"],
                            css["tasks-panel__task-switcher"]
                        )}
                    >
                        <button
                            onClick={() =>
                                routeNavigator.replace(
                                    `/${DEFAULT_VIEW_PANELS.TASKS}?tab=balls`
                                )
                            }
                            className={classNames(
                                css["task-switcher__button"],
                                currentTab === "balls" &&
                                    css["task-switcher__button_active"]
                            )}
                        >
                            <span>История начисления</span>
                        </button>
                        <button
                            onClick={() =>
                                routeNavigator.replace(
                                    `/${DEFAULT_VIEW_PANELS.TASKS}?tab=friends`
                                )
                            }
                            className={classNames(
                                css["task-switcher__button"],
                                currentTab === "friends" &&
                                    css["task-switcher__button_active"]
                            )}
                        >
                            <span>Друзья</span>
                        </button>
                    </div>
                    <Spacing size={15} />
                    {currentTab === "friends" ? (
                        friends?.length === 0 ? (
                            <>
                                <img
                                    width={160}
                                    style={{
                                        display: "flex",
                                        margin: "0 auto",
                                    }}
                                    src={"assets/img/friends-pic.png"}
                                    alt=""
                                />
                                <Title color="white" align="center">
                                    Получите больше
                                    <br />
                                    шаров за друзей
                                </Title>
                                <Spacing size={5} />
                                <Text align="center" color="gray">
                                    Друг в беде не бросит, шанс на приз умножит!
                                    Зовите в игру своих друзей, чтобы увеличить
                                    вероятность победы в розыгрыше.{" "}
                                </Text>
                                <Spacing size={15} />
                                <Button
                                    onClick={() =>
                                        routeNavigator.showModal(
                                            DEFAULT_VIEW_MODALS.SHARE_MODAL
                                        )
                                    }
                                >
                                    Пригласить
                                </Button>
                                <Spacing size={90} />
                            </>
                        ) : (
                            <>
                                <InviteBanner />
                                <Spacing size={15} />
                                {friends?.length > 0 && (
                                    <Div className={css["friends-list"]}>
                                        {friends.map((friend) => {
                                            return (
                                                <div
                                                    className={
                                                        css[
                                                            "friends-list__item"
                                                        ]
                                                    }
                                                    key={friend.id}
                                                >
                                                    <img
                                                        className={
                                                            css[
                                                                "friends-list__item-photo"
                                                            ]
                                                        }
                                                        width={30}
                                                        src={
                                                            "https://sun1-15.userapi.com/s/v1/ig2/yV01M9lFmQZY87K3kt_ry_FluU-M4X1UbdiK_MZeseo-RrwgC8jSU0VMlYb8nX7Qsx2IO_jM4H30LEvgBoZozuVr.jpg?quality=95&as=32x45,48x67,72x101,108x151,160x224,240x336,360x504,480x672,540x756,640x896,720x1008,1080x1512&from=bu&cs=1080x0"
                                                        }
                                                        alt=""
                                                    />
                                                    <Title
                                                        size="small"
                                                        className={
                                                            css[
                                                                "friends-list__name"
                                                            ]
                                                        }
                                                        color="white"
                                                    >
                                                        {friend.name}
                                                    </Title>
                                                    <span>
                                                        <img
                                                            width={16}
                                                            src={
                                                                "assets/img/balls-icon-yellow.svg"
                                                            }
                                                            alt=""
                                                        />
                                                        <Title
                                                            size="medium"
                                                            color="white"
                                                        >
                                                            +{friend.value}
                                                        </Title>
                                                    </span>
                                                </div>
                                            );
                                        })}
                                        <Spacing size={90} />
                                    </Div>
                                )}
                            </>
                        )
                    ) : (
                        <>
                            {ballsToShow.length > 0 ? (
                                <>
                                    <div className={css["tasks-balls"]}>
                                        {ballsToShow.map((ball) => {
                                            return (
                                                <div
                                                    className={css["task-ball"]}
                                                    key={ball.id}
                                                >
                                                    <img
                                                        width={24}
                                                        src={
                                                            "assets/img/tasks-icon.svg"
                                                        }
                                                        alt=""
                                                    />
                                                    <Title
                                                        size="small"
                                                        color="white"
                                                        className={
                                                            css[
                                                                "task-ball__text"
                                                            ]
                                                        }
                                                    >
                                                        Выполнение
                                                        <br />
                                                        задания
                                                    </Title>
                                                    <span>
                                                        <img
                                                            width={16}
                                                            height={16}
                                                            src="assets/img/balls-icon-yellow.svg"
                                                            alt=""
                                                        />
                                                        <Title
                                                            size="small"
                                                            color="white"
                                                            className={
                                                                css[
                                                                    "task-ball__title"
                                                                ]
                                                            }
                                                        >
                                                            №{ball.id}
                                                        </Title>
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img
                                        width={160}
                                        style={{
                                            display: "flex",
                                            margin: "0 auto",
                                        }}
                                        src={"assets/img/friends-pic.png"}
                                        alt=""
                                    />
                                    <Title color="white" align="center">
                                        Получите больше
                                        <br />
                                        шаров за друзей
                                    </Title>
                                    <Spacing size={5} />
                                    <Text align="center" color="gray">
                                        Друг в беде не бросит, шанс на приз
                                        умножит! Зовите в игру своих друзей,
                                        чтобы увеличить вероятность победы в
                                        розыгрыше.{" "}
                                    </Text>
                                    <Spacing size={15} />
                                    <Button
                                        onClick={() =>
                                            routeNavigator.showModal(
                                                DEFAULT_VIEW_MODALS.SHARE_MODAL
                                            )
                                        }
                                    >
                                        Пригласить
                                    </Button>
                                </>
                            )}
                            <Spacing size={90} />
                        </>
                    )}
                </Div>
            </div>
        </Panel>
    );
};
