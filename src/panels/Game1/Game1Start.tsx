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
import css from "./Game1start.module.css";

export const Game1Start: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const platform = usePlatform();

    return (
        <Panel id={id} disableBackground className={css["game-start-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
                title="письмо деду морозу"
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
                        src={"assets/img/tasks/task1/character-pic.png"}
                        alt=""
                    />
                </div>
                <Div style={{paddingLeft: 22, paddingRight: 22, margin: 'auto'}}>
                    <Spacing size={35} />
                    <Title align="center" color="yellow">
                        Помоги ване
                        <br />
                        написать письмо
                    </Title>
                    <Spacing size={5} />
                    <Text align="center" color="white">Какая поездка в дом Деда Мороза без письма с заветным желанием? Заполните пропуски в послании — можно выбрать предложенные варианты или придумать свои.</Text>
                    <Spacing size={40} />
                    <Spacing size={90} />
                </Div>
            </div>
            <FixedLayout vertical="bottom">
                <Div style={{paddingLeft: 22, paddingRight: 22}}>
                    <Button
                        color="yellow"
                        onClick={() =>
                            routeNavigator.push(`/${DEFAULT_VIEW_PANELS.GAME1}`)
                        }
                    >
                        <span>Начать игру</span>
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
};
