import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel, Spacing, classNames } from "@vkontakte/vkui";
import { FC } from "react";
import { Text } from "../../components/Text/Text";
import { Title, TitleAlign } from "../../components/Title/Title";
import { ONBOARDING_VIEW_PANELS } from "../../routes";

import { Button } from "../../components/Button/Button";
import css from "./OnboardingStart.module.css";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import Snowfall from "react-snowfall";

export const OnboardingStart: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();

    return (
        <Panel id={id} disableBackground>
            <CustomPanelHeader />
            <div className={classNames(css["onboarding-page"])}>
                <div className={css["onboarding-page__snow"]}>
                    <Snowfall
                        color="#fff"
                        // Applied to the canvas element.
                        style={{ background: "transparent" }}
                        radius={[0.8, 1]}
                        // Controls the number of snowflakes that are created (defaults to 150).
                        snowflakeCount={900}
                    />
                </div>
                <div className={css["onboarding-content-wrapper"]}>
                    <div className={css["onboarding-content"]}>
                        <div className={css["onboarding-content__title"]}>
                            <Title align={TitleAlign.center}>
                                ПОМОГИТЕ ВАНЕ И ЕГО РОДИТЕЛЯМ ДОБРАТЬСЯ
                                ДО ВЕЛИКОГО УСТЮГА!
                            </Title>
                            <Spacing size={5} />
                            <Text
                                className={css["onboarding-content__text"]}
                                align="center"
                            >
                                У Вани из Кирова есть заветное желание, которое
                                может исполнить только один волшебник. Помогите
                                мальчику добраться до дома Деда Мороза,
                                а родителям — догнать своего сына. За каждое
                                задание вы получите шары для участия в розыгрыше
                                классных призов: всего будет 15 победителей —
                                их мы узнаем 16 января!
                            </Text>
                            <Spacing size={35} />
                            <Button
                                onClick={() => {
                                    routeNavigator.push(
                                        `/${ONBOARDING_VIEW_PANELS.NOTIFICATIONS}`
                                    );
                                }}
                            >
                                Далее
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    );
};
