import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Div, NavIdProps, Panel, Spacing, usePlatform } from "@vkontakte/vkui";
import { FC } from "react";
import "swiper/css";
import char3Image from "../../assets/img/task-pic3.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_PANELS } from "../../routes";
import css from "./Game3start.module.css";

export const Game3Start: FC<NavIdProps> = ({ id }) => {
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
                    src={char3Image}
                    alt=""
                />
                <Div>
                    <Spacing size={35} />
                    <Title align="center" color="black">Карта Тима</Title>
                    <Spacing size={10} />
                    <Text align="center" color="black">Тим — новый парень в школе Кристины. В его руках оказалась карта, ведущая к волшебному посоху. Правда, охотник её порвал. Перетаскивайте кусочки, совмещая их по форме и изображению, чтобы передать целую карту Финнику!</Text>
                    <Spacing size={30} />
                    <Button onClick={()=>routeNavigator.push(`/${DEFAULT_VIEW_PANELS.GAME3}`)}>
                        <span>Играть!</span>
                    </Button>
                    <Spacing size={90} />
                </Div>
            </div>
        </Panel>
    );
};
