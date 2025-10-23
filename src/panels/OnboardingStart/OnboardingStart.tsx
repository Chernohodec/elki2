import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel, Spacing, classNames } from "@vkontakte/vkui";
import { FC } from "react";
import { Text } from "../../components/Text/Text";
import { Title, TitleAlign } from "../../components/Title/Title";
import { ONBOARDING_VIEW_PANELS } from "../../routes";

import { Button } from "../../components/Button/Button";
import css from "./OnboardingStart.module.css";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";

export const OnboardingStart: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();

    return (
        <Panel id={id} disableBackground>
            <CustomPanelHeader />

            <div className={classNames(css["onboarding-page"])}>
                <div className={css["onboarding-content-wrapper"]}>
                    <div className={css["onboarding-content"]}>
                        <div className={css["onboarding-content__title"]}>
                            <Title align={TitleAlign.center}>
                                Помогите Ване и его родителям добраться до своей
                                цели!
                            </Title>
                            <Spacing size={5} />
                            <Text
                                className={css["onboarding-content__text"]}
                                align="center"
                            >
                                Lorem ipsum dolor sit amet consectetur. Pretium
                                placerat duis convallis felis eget nunc arcu id
                                at. Facilisi augue ultrices molestie.
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
