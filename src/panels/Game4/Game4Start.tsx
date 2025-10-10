import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Div, NavIdProps, Panel, Spacing, usePlatform } from "@vkontakte/vkui";
import { FC } from "react";
import "swiper/css";
import char5Image from "../../assets/img/task-pic5.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_PANELS } from "../../routes";
import css from "./Game4start.module.css";

export const Game4Start: FC<NavIdProps> = ({ id }) => {
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
                    src={char5Image}
                    alt=""
                />
                <Div>
                    <Spacing size={35} />
                    <Title align="center" color="black">Маскировка для домовых</Title>
                    <Spacing size={10} />
                    <Text align="center" color="black">Охотник на домовых Юджин почти догнал Финника! Помогите ему слиться с толпой: установите обложку страницы, чтобы помочь Финнику спрятаться!»</Text>
                    <Spacing size={30} />
                    <Button onClick={()=>routeNavigator.push(`/${DEFAULT_VIEW_PANELS.GAME4}`)}>
                        <span>Играть!</span>
                    </Button>
                    <Spacing size={90} />
                </Div>
            </div>
        </Panel>
    );
};