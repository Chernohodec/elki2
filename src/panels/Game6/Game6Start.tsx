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
import css from "./Game6start.module.css";

export const Game6Start: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const platform = usePlatform();

    return (
        <Panel id={id} disableBackground className={css["game-start-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
                title="Найди отличия"
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
                        src={"assets/img/tasks/task6/character-pic.png"}
                        alt=""
                    />
                </div>
                <Div style={{paddingLeft: 22, paddingRight: 22, margin: 'auto'}}>
                    <Spacing size={35} />
                    <Title align="center" color="yellow">
                        Судьбоносный танец
                        <br />с Вадимом на балу
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
                <Div style={{paddingLeft: 22, paddingRight: 22}}>
                    <Button
                        color="yellow"
                        onClick={() =>
                            routeNavigator.push(`/${DEFAULT_VIEW_PANELS.GAME6}`)
                        }
                    >
                        <span>Начать игру</span>
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
};
