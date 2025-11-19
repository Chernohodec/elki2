import { Icon16Done } from "@vkontakte/icons";
import bridge, {
    parseURLSearchParamsForGetLaunchParams,
} from "@vkontakte/vk-bridge";
import {
    useRouteNavigator,
    useSearchParams,
} from "@vkontakte/vk-mini-apps-router";
import {
    Avatar,
    classNames,
    Div,
    NavIdProps,
    Panel,
    Snackbar,
    Spacing,
} from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
// import taskPic1 from "../../assets/img/task-pic1.png";
// import taskPic2 from "../../assets/img/task-pic2.png";
// import taskPic3 from "../../assets/img/task-pic3.png";
// import taskPic4 from "../../assets/img/task-pic4.png";
// import taskPic5 from "../../assets/img/task-pic5.png";
// import taskPic6 from "../../assets/img/task-pic6.png";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { useAppSelector } from "../../store";
import {
    selectFriends,
    selectTasks,
    selectBalls,
} from "../../store/tasks.reducer";
import css from "./Tasks.module.css";
import { Button } from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_MODALS, DEFAULT_VIEW_PANELS } from "../../routes";
import { InviteBanner } from "../../components/InviteBanner/InviteBanner";

export const Tasks: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();
    const currentPathTab = params.get("tab");
    const tasks = useAppSelector(selectTasks);
    const tasksDone = tasks.filter((task) => !task.checked).length === 0;
    const images = [
        "assets/img/tasks/task1-icon.png",
        "assets/img/tasks/task2-icon.png",
        "assets/img/tasks/task3-icon.png",
        "assets/img/tasks/task4-icon.png",
        "assets/img/tasks/task5-icon.png",
        "assets/img/tasks/task6-icon.png",
    ];
    const [currentTab, setCurrentTab] = useState("tasks");
    const tickets = useAppSelector(selectBalls);
    const routes = [
        {
            id: 1,
            route: DEFAULT_VIEW_PANELS.GAME1_START,
        },
        {
            id: 2,
            route: DEFAULT_VIEW_PANELS.GAME2_START,
        },
        {
            id: 3,
            route: DEFAULT_VIEW_PANELS.GAME3_START,
        },
        {
            id: 4,
            route: DEFAULT_VIEW_PANELS.GAME4_START,
        },
        {
            id: 5,
            route: DEFAULT_VIEW_PANELS.GAME5_START,
        },
        {
            id: 6,
            route: DEFAULT_VIEW_PANELS.GAME6_START,
        },
    ];
    const friends = useAppSelector(selectFriends);
    const { vk_user_id } = parseURLSearchParamsForGetLaunchParams(
        window.location.search
    );

    useEffect(() => {
        if (currentPathTab) {
            setCurrentTab(currentPathTab);
        }
    }, [currentPathTab, routeNavigator]);

    const inviteFriend = async () => {
        bridge
            .send("VKWebAppShare", {
                link: `https://vk.com/app54237274#/?referal_id=${vk_user_id}`,
                text: "Я помогаю Финнику добраться до волшебного посоха и участвую в розыгрыше призов. Присоединяйся!",
            })
            .then((data) => {
                if (data.success) {
                    routeNavigator.showPopout(
                        <Snackbar
                            onClose={() => routeNavigator.hidePopout()}
                            before={
                                <Avatar
                                    size={24}
                                    style={{
                                        background:
                                            "var(--vkui--color_background_accent)",
                                    }}
                                >
                                    <Icon16Done
                                        fill="#fff"
                                        width={14}
                                        height={14}
                                    />
                                </Avatar>
                            }
                        >
                            Приглашение отправлено!
                        </Snackbar>
                    );

                    console.log("Приглашения не отправлены", data.notSentIds);
                }
            })
            .catch((error) => {
                console.log(error); // Ошибка
            });
    };

    return (
        <Panel id={id} disableBackground className={css["tasks-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
                title="Мои шары"
            />
            <Spacing size={20} />
            <div className={css["big-counter"]}>{tickets.length}</div>
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
                                    `/${DEFAULT_VIEW_PANELS.TASKS}?tab=tickets`
                                )
                            }
                            className={classNames(
                                css["task-switcher__button"],
                                currentTab === "tickets" &&
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
                                    width={170}
                                    style={{
                                        display: "flex",
                                        margin: "0 auto",
                                    }}
                                    src={"assets/img/friends-pic.png"}
                                    alt=""
                                />
                                <Spacing size={15} />
                                <Title color="white" align="center">
                                    Получите больше
                                    <br />
                                    шаров за друзей
                                </Title>
                                <Spacing size={5} />
                                <Text align="center" color="gray">Друг в беде не бросит, шанс на приз умножит! Зовите в игру своих друзей, чтобы увеличить вероятность победы в розыгрыше. </Text>
                                <Spacing size={15} />
                                <Button onClick={inviteFriend}>
                                    Пригласить
                                </Button>
                            </>
                        ) : (
                            <>
                                <InviteBanner inviteFriend={inviteFriend} />
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
                                        <Spacing size={80} />
                                    </Div>
                                )}
                            </>
                        )
                    ) : (
                        <>
                            {tickets.length > 0 ? (
                                <>
                                    <div className={css["tasks-tickets"]}>
                                        {tickets.map((ticket) => {
                                            return (
                                                <div
                                                    className={
                                                        css["task-ticket"]
                                                    }
                                                    key={ticket.id}
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
                                                                "task-ticket__text"
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
                                                                    "task-ticket__title"
                                                                ]
                                                            }
                                                        >
                                                            №{ticket.number}
                                                        </Title>
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Spacing size={20} />
                                    <img
                                        style={{
                                            display: "flex",
                                            margin: "auto",
                                        }}
                                        width={175}
                                        src={"assets/img/friends-pic.png"}
                                        alt=""
                                    />
                                    <Spacing size={20} />
                                    <Title
                                        align={"center"}
                                        color={"black"}
                                        size={"medium"}
                                    >
                                        Получайте больше шаров за друзей
                                    </Title>
                                    <Spacing size={15} />
                                    <Button
                                        className={css["tasks-tickets__button"]}
                                        color="transparent"
                                        onClick={inviteFriend}
                                    >
                                        Пригласить
                                    </Button>
                                </>
                            )}
                            <Spacing size={70} />
                        </>
                    )}
                </Div>
            </div>
        </Panel>
    );
};
