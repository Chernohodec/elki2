import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Div, NavIdProps, Panel, Spacing } from "@vkontakte/vkui";
import { FC, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import videoBannerTitle from "../../assets/img/about-movie-title.png";
import charactersTitle from "../../assets/img/about-movie-title2.png";
import actor1 from "../../assets/img/actor1.png";
import actor3 from "../../assets/img/actor3.png";
import actor4 from "../../assets/img/actor4.png";
import actor5 from "../../assets/img/actor5.png";
import actor6 from "../../assets/img/actor6.png";
import actor7 from "../../assets/img/actor7.png";
import nextIcon from "../../assets/img/next-button.svg";
import playVideoIcon from "../../assets/img/play-video-icon.svg";
import prevIcon from "../../assets/img/prev-button.svg";
import hero6 from "../../assets/img/task-pic-mama.png";
import hero4 from "../../assets/img/task-pic1.png";
import hero5 from "../../assets/img/task-pic2.png";
import hero3 from "../../assets/img/task-pic3.png";
import hero1 from "../../assets/img/task-pic4.png";
import hero7 from "../../assets/img/task-pic5.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { Text } from "../../components/Text/Text";
import { VkVideoBanner } from "../../components/VkVideoBanner/VkVideoBanner";
import css from "./About.module.css";

export const About: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();

    const swiperRef = useRef();

    const heroes = [
        {
            id: 1,
            text: "Зеленый своенравный домовой, счастливо живущий со «своим человеком», девочкой Кристиной. Беспечно проводит деньки и не стремится к ответственности за свои действия.",
            img: hero1,
            actor: {
                name: <p>Михаил <br/>Хрусталёв</p>,
                voice: "Голос Финника",
                img: actor1
            },
        },
        // {
        //     id: 2,
        //     text: "Самые маленькие домовые в новом жилом комплексе города Берга. Любят чинить, играть и веселиться. ",
        //     img: hero2,
        //     actor: {
        //         name: <p>Василиса<br/> Кукояка</p>,
        //         voice: <i style={{fontSize: 9,marginTop: -4, fontStyle: 'normal', display: 'block'}}>Голос домовенка Клубнички</i>,
        //         img: actor2
        //     },
        // },
        {
            id: 3,
            text: "Крутой новенький в школе Кристины, который быстро становится её другом. Гоняет на мотоцикле и скрывает от друзей тайну о своей семье.",
            img: hero3,
            actor: {
                name: <p>Слава<br/>Копейкин</p>,
                voice: "Голос Тима",
                img: actor3
            },
        },
        {
            id: 4,
            text: "Лучшая подруга Финника. Собранная и умная девочка, которая видит и слышит домовых благодаря уникальному браслету из домовячьей шерсти.",
            img: hero4,
            actor: {
                name: <p>Вероника<br/>Макеева</p>,
                voice: "Голос Кристины",
                img: actor4
            },
        },
        {
            id: 5,
            text: "Капризная модная блогерша. Приходит в школу и знакомится с Кристиной, чтобы поснимать ролики для своего блога.",
            img: hero5,
            actor: {
                name: <p>Аня<br/>Pokrov</p>,
                voice: "Голос Лизы Мяу",
                img: actor5
            },
        },
        {
            id: 6,
            text: "Молодая актриса, которая уже завоевала любовь зрителей в городе Берг. Постоянно пропадает на съемках.",
            img: hero6,
            actor: {
                name: <p style={{marginTop: '6px'}}>Ида Галич</p>,
                voice: "Голос Мамы Кристины",
                img: actor6
            },
        },
        {
            id: 7,
            text: "Потомственный охотник на домовых, мечтающий вернуть славу своему роду и вновь поработить домовых всего мира. Он любит сына, которого воспитывает в одиночку, хоть и не умеет это показать",
            img: hero7,
            actor: {
                name: <p style={{marginLeft: -5}}>Юрий<br/>Колокольников</p>,
                voice: "Голос Охотника",
                img: actor7
            },
        },
    ];

    return (
        <Panel id={id} disableBackground className={css["about-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
            />
            <div className={css["about-panel-banner"]}>
                <a href="https://vk.com/video-210460227_456239471" target="_blank" className={css["about-panel-banner__play"]} >
                    <img src={playVideoIcon} alt="" />
                    <img src={playVideoIcon} alt="" />
                </a>
            </div>
            <div className={css["about-panel-description"]}>
                <img
                    width={240}
                    className={css["about-panel-description__title"]}
                    src={videoBannerTitle}
                    alt=""
                />
                <Spacing size={20} />
                <Div>
                    <Text
                        align="center"
                        color="white"
                        className={css["about-panel-description__text"]}
                    >
                        Жизнь своенравного домового Финника беззаботна:
                        он дружит с Кристиной — единственным человеком, видящим
                        домовых. Но всё меняется, когда волшебный посох лишает
                        Финника невидимости. Теперь охотник Юджин грозит всем
                        домовым. Финнику и Кристине необходимо спасти домовячий мир!
                    </Text>
                    <img
                        width={240}
                        className={css["about-panel-description__title2"]}
                        src={charactersTitle}
                        alt=""
                    />
                </Div>
            </div>
            <div className={css["about-panel-chars"]}>
                <Spacing size={20} />
                <div className={css["chars-slider"]}>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className={css["chars-slider__next"]}
                    >
                        <img src={nextIcon} alt="" />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className={css["chars-slider__prev"]}
                    >
                        <img src={prevIcon} alt="" />
                    </button>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        loop={true}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {heroes.map((hero) => {
                            return (
                                <SwiperSlide key={hero.id}>
                                    <div className={css["chars-slide"]}>
                                        <img
                                            className={css["chars-slide__img"]}
                                            src={hero.img}
                                            alt=""
                                            width={170}
                                        />
                                        <Text
                                            className={css["chars-slide__text"]}
                                            color="black"
                                            align="center"
                                        >
                                            {hero.text}
                                        </Text>
                                        <Spacing size={10} />
                                        <div className={css["chars-actor"]}>
                                            <img
                                                className={
                                                    css["chars-actor__image"]
                                                }
                                                width={80}
                                                height={80}
                                                src={hero.actor.img}
                                                alt=""
                                            />
                                            <span
                                                className={
                                                    css["chars-actor__text"]
                                                }
                                            >
                                                <span>{hero.actor.name}</span>
                                                <span>{hero.actor.voice}</span>
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
            <div className={css["about-panel-footer"]}>
                <Div>
                    <VkVideoBanner />
                    <Spacing size={20} />
                    <Button color="pink" href="https://www.afisha.ru/movie/finnik-2-306500/">Купить билеты</Button>
                    <Spacing size={15} />
                    <Button color="transparent" href="https://vk.com/finnick_movie">Сообщество Финника в VK</Button>
                    <Spacing size={90} />
                </Div>
            </div>
        </Panel>
    );
};
