import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    Div,
    FixedLayout,
    NavIdProps,
    Panel,
    Spacing,
    classNames,
    usePlatform,
} from "@vkontakte/vkui";
import { FC } from "react";
import { postUser } from "../../api/user/postUser";

import { Text, TextColors } from "../../components/Text/Text";
import { Title, TitleAlign, TitleColors } from "../../components/Title/Title";

import onboardingPic2 from "../../assets/img/onboarding-pic2.png";
import { Button } from "../../components/Button/Button";
import { useNotifications } from "../../hooks/useNotifications";
import { useAppDispatch, useAppSelector } from "../../store";
import {
    selectOnboardingComplete,
    setOnboardingComplete,
} from "../../store/main.reducer";
import css from "./OnboardingNotifications.module.css";
import { sendBridgeTrack } from "../../helpers/sendBridgeTrack";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";

export const OnboardingNotifications: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const platform = usePlatform();
    const isDesktop = platform === "vkcom";
    const { askAllowNotifications } = useNotifications();
    const onboardingComplete = useAppSelector(selectOnboardingComplete);
    const dispatch = useAppDispatch();

    return (
        <Panel id={id} disableBackground>
            <CustomPanelHeader />
            <div className={classNames(css["onboarding-page"])}>
                <div className={css["onboarding-content-wrapper"]}>
                    <div className={css["onboarding-content"]}>
                        <Title
                            align={TitleAlign.center}
                            className={css["onboarding-content__title"]}
                        >
                            ВКЛЮЧИТЕ УВЕДОМЛЕНИЯ
                            <br />О НОВЫХ ЗАДАНИЯХ
                        </Title>
                        <Spacing size={20} />
                        <Text
                            className={css["onboarding-content__text"]}
                            align="center"
                        >
                            Задания будут открываться постепенно. Наши герои
                            идут разными путями, поэтому приключений вдвое
                            больше! Получайте уведомления, чтобы ничего
                            не пропустить.
                        </Text>
                        <Spacing size={25} />
                        <Button
                            onClick={() => {
                                askAllowNotifications();
                            }}
                        >
                            Разрешить
                        </Button>
                        <Spacing size={14} />

                        <Button
                            color={"transparent"}
                            onClick={() => {
                                postUser({
                                    onboardingIsCompleted: true,
                                });
                                dispatch(setOnboardingComplete(true));
                                routeNavigator.push(`/`);
                                sendBridgeTrack("registration");
                            }}
                        >
                            Пропустить
                        </Button>
                    </div>
                </div>
            </div>
        </Panel>
    );
};
