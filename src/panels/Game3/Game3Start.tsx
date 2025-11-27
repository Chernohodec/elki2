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
import css from "./Game3start.module.css";

export const Game3Start: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const platform = usePlatform();

    return (
        <Panel id={id} disableBackground className={css["game-start-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
                title="Ёлочка для Витали"
            />
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_${platform}`]
                )}
            >
                <Div style={{ padding: 22, margin: "auto" }}>
                    <div className={css["game-start-panel__img-wrapper"]}>
                        <img
                            className={css["game-start-panel__img"]}
                            width={145}
                            src={"assets/img/tasks/task3/character-pic.png"}
                            alt=""
                        />
                    </div>
                    <Spacing size={35} />
                    <Title align="center" color="yellow">
                        Виталя должен добыть
                        <br />
                        самую красивую ель
                    </Title>
                    <Spacing size={5} />
                    <Text align="center" color="white">
                        Виталик всё к Новому году приготовил... Ой, где же ёлка?
                        Пока забывчивый герой ищет топор и выдвигается в лес,
                        запоминайте правила: тапать на ёлку нужно быстро и
                        точно.
                    </Text>
                    <Spacing size={40} />
                    <Spacing size={90} />
                </Div>
            </div>
            <FixedLayout vertical="bottom">
                <Div style={{ padding: 22 }}>
                    <Button
                        color="yellow"
                        onClick={() =>
                            routeNavigator.push(`/${DEFAULT_VIEW_PANELS.GAME3}`)
                        }
                    >
                        <span>Начать игру</span>
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
};
