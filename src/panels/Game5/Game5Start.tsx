import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    FixedLayout,
    NavIdProps,
    Panel,
    Spacing,
    usePlatform,
} from "@vkontakte/vkui";
import { FC } from "react";
import "swiper/css";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_PANELS } from "../../routes";
import css from "./Game5start.module.css";

export const Game5Start: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const platform = usePlatform();

    return (
        <Panel id={id} disableBackground className={css["game-start-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
                title="Кулинарная игра"
            />
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_${platform}`]
                )}
            >
                <div className={css["game-start-panel__img-wrapper"]}>
                    <img
                        className={css["game-start-panel__img"]}
                        width={145}
                        src={"assets/img/tasks/task5/character-pic.png"}
                        alt=""
                    />
                </div>
                <Div>
                    <Spacing size={35} />
                    <Title align="center" color="yellow">
                        Дамир и ужин
                        <br />
                        что может пойти не так
                    </Title>
                    <Spacing size={5} />
                    <Text align="center" color="white">
                        Lorem ipsum dolor sit amet consectetur. Pretium placerat
                        duis convallis felis eget nunc arcu id at. Facilisi
                        augue ultrices molestie.Lorem ipsum dolor sit amet
                        consectetur. Pretium placerat duis convallis felis eget
                        nunc arcu id at. Facilisi augue ultrices molestie.
                    </Text>
                    <Spacing size={130} />
                </Div>
            </div>
            <FixedLayout vertical="bottom">
                <Div>
                    <Button
                        color="yellow"
                        onClick={() =>
                            routeNavigator.push(`/${DEFAULT_VIEW_PANELS.GAME5}`)
                        }
                    >
                        <span>Начать игру</span>
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
};
