import { useMetaParams } from "@vkontakte/vk-mini-apps-router";
import { ModalCard, NavIdProps, Spacing } from "@vkontakte/vkui";
import React from "react";
import { Button } from "../components/Button/Button";
import { Text } from "../components/Text/Text";
import { Title } from "../components/Title/Title";
import { useAppSelector } from "../store";
import { selectHeroes } from "../store/main.reducer";
import css from "./modals.module.css";

const HeroModal: React.FC<NavIdProps & { onClose: () => void }> = (props) => {

    const params = useMetaParams<{
        hero: string;
    }>();
    const heroes = useAppSelector(selectHeroes);
    const currentHero = heroes.find((hero) => hero.id === params?.hero);

    return (
        <ModalCard className={css["modal"]} {...props} onClose={props.onClose}>
            <div className={css["modal__content"]}>
                <div className={css["hero-img-wrapper"]}>
                    <img
                        className={css["hero-img-wrapper__img"]}
                        width={145}
                        src={currentHero?.img}
                        alt=""
                    />
                </div>
                <Spacing size={20} />
                <Title align="center">{currentHero?.actor.name}</Title>
                <Spacing size={5} />
                <Text align="center">{currentHero?.actor.text}</Text>
                <Spacing size={35} />
                <Button onClick={props.onClose}>Продолжить</Button>
            </div>
        </ModalCard>
    );
};

export { HeroModal };
