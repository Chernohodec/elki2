import {
    useMetaParams,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { ModalCard, NavIdProps, Spacing } from "@vkontakte/vkui";
import React from "react";
import { Button } from "../components/Button/Button";
import { Text } from "../components/Text/Text";
import { Title } from "../components/Title/Title";
import { useAppSelector } from "../store";
import { selectHeroes } from "../store/main.reducer";
import css from "./modals.module.css";

const CloseModal: React.FC<NavIdProps & { onClose: () => void }> = (props) => {
    const routeNavigator = useRouteNavigator();

    const params = useMetaParams<{ action: string; value: number }>();
    const heroes = useAppSelector(selectHeroes);
    const currentHero = heroes.find((hero) => hero.id === params?.value);

    return (
        <ModalCard className={css["modal"]} {...props} onClose={props.onClose}>
            <div className={css["modal__content"]}>
                <Title align="center" color="red">
                    Хотите закончить?
                </Title>
                <Spacing size={5} />
                <Text align="center">
                    Игра завершится и весь прогресс будет потерян
                </Text>
                <Spacing size={25} />
                <Button
                    className={css["game-cancel__button"]}
                    onClick={props.onClose}
                >
                    Продолжить игру
                </Button>
                <Spacing size={10} />
                <Button
                    color="transparent"
                    onClick={() => routeNavigator.replace('/')}
                >
                    Выйти
                </Button>
            </div>
        </ModalCard>
    );
};

export { CloseModal };
