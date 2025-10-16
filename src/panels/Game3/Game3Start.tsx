import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
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
                title="Елочка для Витали"
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
                        src={"assets/img/tasks/task3/character-pic.png"}
                        alt=""
                    />
                </div>
                <Div>
                    <Spacing size={35} />
                    <Title align="center" color="yellow">
                        Виталя должен добыть
                        <br />
                        самую красивую ель
                    </Title>
                    <Spacing size={5} />
                    <Text align="center" color="white">
                        Lorem ipsum dolor sit amet consectetur. Pretium placerat
                        duis convallis felis eget nunc arcu id at. Facilisi
                        augue ultrices molestie.Lorem ipsum dolor sit amet
                        consectetur. Pretium placerat duis convallis felis eget
                        nunc arcu id at. Facilisi augue ultrices molestie.
                    </Text>
                    <Spacing size={40} />
                    <Button
                        onClick={() =>
                            routeNavigator.push(`/${DEFAULT_VIEW_PANELS.GAME3}`)
                        }
                    >
                        <span>Продолжить</span>
                    </Button>
                    <Spacing size={90} />
                </Div>
            </div>
        </Panel>
    );
};
