import { Icon16Done } from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    Avatar,
    ModalCard,
    NavIdProps,
    Snackbar,
    Spacing,
} from "@vkontakte/vkui";
import React from "react";
import { Button } from "../components/Button/Button";
import { Title } from "../components/Title/Title";
import css from "./modals.module.css";
import { selectUserCode } from "../store/main.reducer";
import { useAppSelector } from "../store";
import storyPic from "../../public/assets/img/story-pic.jpg";

const ShareModal: React.FC<NavIdProps & { onClose: () => void }> = (props) => {
    const routeNavigator = useRouteNavigator();
    const userCode = useAppSelector(selectUserCode);

    const inviteFriendStory = async () => {
        bridge
            .send("VKWebAppShowStoryBox", {
                background_type: "image",
                url: storyPic,
                attachment: {
                    text: "open",
                    type: "url",
                    url: `https://vk.com/app54237274#/?referal_id=${userCode}`,
                },
            })
            .then((data: any) => {
                if (data.result) {
                    routeNavigator.runSync([
                        () => routeNavigator.hideModal(),
                        () =>
                            routeNavigator.showPopout(
                                <Snackbar
                                    onClose={() => routeNavigator.hidePopout()}
                                    before={
                                        <Avatar
                                            size={24}
                                            style={{
                                                background: "#EA0300",
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
                                    История опубликована!
                                </Snackbar>
                            ),
                    ]);

                    // Этим выбранным пользователям
                    // не удалось отправить приглашения
                    console.log("Приглашения не отправлены", data.notSentIds);
                }
            })
            .catch((error) => {
                console.log(error); // Ошибка
            });
    };

    const inviteFriend = async () => {
        bridge
            .send("VKWebAppShare", {
                link: `https://vk.com/app54237274#/?referal_id=${userCode}`,
                text: "Я помогаю Ване и его родителям добраться до Деда Мороза!",
            })
            .then((data: any) => {
                if (data.result) {
                    routeNavigator.runSync([
                        () => routeNavigator.hideModal(),
                        () =>
                            routeNavigator.showPopout(
                                <Snackbar
                                    onClose={() => routeNavigator.hidePopout()}
                                    before={
                                        <Avatar
                                            size={24}
                                            style={{
                                                background: "#EA0300",
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
                            ),
                    ]);

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
        <ModalCard className={css["modal"]} {...props} onClose={props.onClose}>
            <div className={css["modal__content"]}>
                <Title align="center">
                    Как вы хотите
                    <br />
                    пригласить друзей?
                </Title>
                <Spacing size={40} />
                <Button onClick={inviteFriendStory}>
                    Опубликовать историю
                </Button>
                <Spacing size={12} />
                <Button onClick={inviteFriend} color="yellow">
                    Отправить сообщение
                </Button>
            </div>
        </ModalCard>
    );
};

export { ShareModal };
