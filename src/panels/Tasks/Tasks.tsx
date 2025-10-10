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
    Div,
    NavIdProps,
    Panel,
    Snackbar
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
    selectTickets,
} from "../../store/tasks.reducer";
import css from "./Tasks.module.css";

export const Tasks: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();
    const currentPathTab = params.get("tab");
    const tasks = useAppSelector(selectTasks);
    const tasksDone = tasks.filter((task) => !task.checked).length === 0;
    // const images = [taskPic1, taskPic2, taskPic3, taskPic5,taskPic4, taskPic6];
    const [currentTab, setCurrentTab] = useState("tasks");
    const tickets = useAppSelector(selectTickets);
    // const routes = [
    //     {
    //         id: 1,
    //         route: DEFAULT_VIEW_PANELS.GAME1_START,
    //     },
    //     {
    //         id: 2,
    //         route: DEFAULT_VIEW_PANELS.GAME2_START,
    //     },
    //     {
    //         id: 3,
    //         route: DEFAULT_VIEW_PANELS.GAME3_START,
    //     },
    //     {
    //         id: 4,
    //         route: DEFAULT_VIEW_PANELS.GAME4_START,
    //     },
    //     {
    //         id: 5,
    //         route: DEFAULT_VIEW_PANELS.GAME5_START,
    //     },
    //     {
    //         id: 6,
    //         route: DEFAULT_VIEW_PANELS.GAME6_START,
    //     },
    // ];
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
                link: `https://vk.com/app53990455#/?referal_id=${vk_user_id}`,
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

                    // Этим выбранным пользователям
                    // не удалось отправить приглашения
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
                title="Задания"
            />
            <div className={css["tasks-panel__content"]}>
                <Div></Div>
            </div>
        </Panel>
    );
};
