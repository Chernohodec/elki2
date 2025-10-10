import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Div, NavIdProps, Panel, Spacing, usePlatform } from "@vkontakte/vkui";
import { FC } from "react";
import "swiper/css";
import char2Image from "../../assets/img/task-pic2.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_PANELS } from "../../routes";
import css from "./Game2start.module.css";

export const Game2Start: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const platform = usePlatform()

    return (
        <Panel id={id} disableBackground className={css["game-start-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
                // title="О розыгрыше"
            />
            <div className={classNames(css["game-start-panel__content"], css[`game-start-panel__content_${platform}`])}>
                <img
                    className={css["game-start-panel__char"]}
                    width={170}
                    src={char2Image}
                    alt=""
                />
                <Div>
                    <Spacing size={35} />
                    <Title align="center" color="black">Челлендж от Лизы Мяу</Title>
                    <Spacing size={10} />
                    <Text align="center" color="black">Блогерша Лиза Мяу запускает новый тренд — теперь у каждого в сторис должны быть открытки с Финником! Присоединяйтесь: это точно собьёт Юджина со следа и поможет герою добраться до посоха незамеченным.</Text>
                    <Spacing size={30} />
                    <Button onClick={()=>routeNavigator.push(`/${DEFAULT_VIEW_PANELS.GAME2}`)}>
                        <span>Продолжить</span>
                    </Button>
                    <Spacing size={90} />
                </Div>
            </div>
        </Panel>
    );
};
