import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Div, NavIdProps, Panel, Spacing } from "@vkontakte/vkui";
import { FC, useRef } from "react";
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

export const About: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();

    const swiperRef = useRef();

    const heroes = useAppSelector(selectHeroes);

    const gallery = [
        { id: 1, pic: "assets/img/movie-pic.jpg" },
        { id: 2, pic: "assets/img/movie-pic.jpg" },
        { id: 3, pic: "assets/img/movie-pic.jpg" },
    ];

    return (
        <Panel id={id} disableBackground className={css["about-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
                title="О фильме"
            />
            <a
                href="https://vk.com/video-210460227_456239471"
                target="_blank"
                className={css["about-panel-banner"]}
            >
                <img width={312} src="assets/img/movie-pic.jpg" alt="" />
            </a>
            <Spacing size={25} />
            <div className={css["about-panel-description"]}>
                <Title color="yellow" align="center">
                    смотрите Ёлки 12
                    <br />в кино с 18 декабря!
                </Title>
                <Spacing size={5} />
                <Text
                    align="center"
                    color="white"
                    className={css["about-panel-description__text"]}
                >
                    Lorem ipsum dolor sit amet consectetur. Pretium placerat
                    duis convallis felis eget nunc arcu id at. Facilisi augue
                    ultrices molestie.
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
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={"auto"}
                        loop={true}
                    >
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
                                                            action: "taskID",
                                                            value: hero.id,
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
                    Галлерея
                </Title>
                <Spacing size={20} />
                <div className={css["gallery-slider"]}>
                    <Swiper spaceBetween={50} slidesPerView={1} loop={true}>
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
