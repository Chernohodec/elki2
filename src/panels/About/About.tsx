import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Div, NavIdProps, Panel, Spacing } from "@vkontakte/vkui";
import { FC, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import css from "./About.module.css";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { useAppSelector } from "../../store";
import { selectHeroes } from "../../store/main.reducer";
import { VkVideoBanner } from "../../components/VkVideoBanner/VkVideoBanner";

export const About: FC<NavIdProps> = ({ id, onBackClick }) => {
    const routeNavigator = useRouteNavigator();
    const swiperRef = useRef(null);
    const heroes = useAppSelector(selectHeroes);

    const gallery = [
        { id: 1, pic: "assets/img/movie-pic.jpg" },
        { id: 2, pic: "assets/img/movie-pic.jpg" },
        { id: 3, pic: "assets/img/movie-pic.jpg" },
    ];

    return (
        <Panel id={id} disableBackground className={css["about-panel"]}>
            <CustomPanelHeader
                onBackClick={onBackClick}
                title="О фильме"
            />
            {/* <a
                href="https://vk.com/video-210460227_456239471"
                target="_blank"
            >
                <img width={312} src="assets/img/movie-pic.jpg" alt="" />
            </a> */}
            <div className={css["about-panel-description"]}>
                <VkVideoBanner />
                <Spacing size={25} />
                <Title color="yellow" align="center">
                    смотрите Ёлки 12
                    <br />
                    в кино с 18 декабря
                </Title>
                <Spacing size={5} />
                <Text
                    align="center"
                    color="white"
                    className={css["about-panel-description__text"]}
                >
                    Главная новогодняя комедия страны снова на экранах! За хорошее настроение отвечают пять новелл, полных тепла,
                    доброго юмора и атмосферы всеобщего праздника. У руля в этом
                    году — Жора Крыжовников, в ролях: Дмитрий Нагиев, Рузиль
                    Минекаев, Дмитрий Журавлёв, Андрей Рожков, Ольга Картункова,
                    Тина Стойилкович и др.
                </Text>
                <Spacing size={25} />
                <Button color="yellow">Купить билеты</Button>
            </div>
            <Spacing size={65} />
            <Div className={css["about-panel-chars"]}>
                <Spacing size={25} />
                <Title color="yellow" align="center">
                    Актеры
                </Title>
                <Spacing size={20} />
                <div className={css["chars-slider"]}>
                    <Swiper spaceBetween={15} slidesPerView={"auto"}>
                        {heroes.map((hero) => {
                            return (
                                <SwiperSlide key={hero.id}>
                                    <div className={css["chars-slide"]}>
                                        <div
                                            className={
                                                css["chars-slide__img-wrapper"]
                                            }
                                        >
                                            <img
                                                className={
                                                    css["chars-slide__img"]
                                                }
                                                src={hero.img}
                                                alt=""
                                                width={170}
                                            />
                                        </div>
                                        <Spacing size={12} />
                                        <Title
                                            className={css["chars-slide__name"]}
                                            color="yellow"
                                            align="center"
                                        >
                                            {hero.actor.name}
                                        </Title>
                                        <Title
                                            className={
                                                css["chars-slide__actor"]
                                            }
                                            size="small"
                                            align="center"
                                        >
                                            {hero.actor.voice}
                                        </Title>
                                        <Button
                                            color="yellow"
                                            size="small"
                                            onClick={() =>
                                                routeNavigator.showModal(
                                                    DEFAULT_VIEW_MODALS.HERO_MODAL,
                                                    {
                                                        state: {
                                                            hero: hero.id,
                                                        },
                                                    }
                                                )
                                            }
                                        >
                                            О герое
                                        </Button>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </Div>
            <Div className={css["about-panel-gallery"]}>
                <Title color="yellow" align="center">
                    Галерея
                </Title>
                <Spacing size={20} />
                <div className={css["gallery-slider"]}>
                    <button
                        className={classNames(css["gallery-slider__prev"])}
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <img
                            width={16}
                            height={16}
                            src="/assets/img/slider-arrow.svg"
                            alt=""
                        />
                    </button>
                    <button
                        className={classNames(css["gallery-slider__next"])}
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <img
                            width={16}
                            height={16}
                            src="/assets/img/slider-arrow.svg"
                            alt=""
                        />
                    </button>
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                    >
                        {gallery.map((photo) => {
                            return (
                                <SwiperSlide key={photo.id}>
                                    <div className={css["gallery-photo"]}>
                                        <img
                                            className={
                                                css["gallery-photo__img"]
                                            }
                                            src={photo.pic}
                                            alt=""
                                            width={330}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <Spacing size={35} />
                <Button color="yellow">Купить билеты</Button>
            </Div>
        </Panel>
    );
};
