import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Div, NavIdProps, Panel, Spacing } from "@vkontakte/vkui";
import { FC, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import PrizeBanner from "../../assets/img/action-pic1new.png";
import titleImage1 from "../../assets/img/action-title1.png";
import titleImage2 from "../../assets/img/action-title2.png";
import nextIcon from "../../assets/img/next-button.svg";
import prevIcon from "../../assets/img/prev-button.svg";
import prizePic1 from "../../assets/img/prizes/prize1.png";
import prizePic2 from "../../assets/img/prizes/prize2.png";
import prizePic3 from "../../assets/img/prizes/prize3.png";
import prizePic4 from "../../assets/img/prizes/prize4.png";
import prizePic5 from "../../assets/img/prizes/prize5.png";
import prizePic6 from "../../assets/img/prizes/prize6.png";
import prizePic7 from "../../assets/img/prizes/prize7.png";
import prizePic8 from "../../assets/img/prizes/prize8.png";
import prizePic9 from "../../assets/img/prizes/prize9.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { VkVideoBanner } from "../../components/VkVideoBanner/VkVideoBanner";
import css from "./Prize.module.css";

const FaqItem = ({
    id,
    title,
    text,
}: {
    id: number;
    title: string;
    text: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={css["faq-item"]}
            key={id}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div
                className={classNames(
                    css["faq-item__top"],
                    isOpen && css["faq-item__top_active"]
                )}
            >
                <Text color="black" className={css["faq-item__top-title"]}>
                    {title}
                </Text>
            </div>
            {isOpen && (
                <div className={css["faq-item__content"]}>
                    <Text color="black">{text}</Text>
                </div>
            )}
        </div>
    );
};

export const Prize: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();

    const swiperRef = useRef();
    const [currentPrizeSlide, setCurrentPrizeSlide] = useState(0);

    const prizes = [
        {
            id: 1,
            text: "Яндекс Станция Лайт 2",
            img: prizePic1,
            place: "и билет в кино!",
        },
        {
            id: 2,
            text: "Яндекс Станция Лайт 2",
            img: prizePic2,
            place: "и билет в кино!",
        },
        {
            id: 3,
            text: "Камера с мгновенной печатью",
            img: prizePic3,
            place: "и билет в кино!",
        },
        {
            id: 4,
            text: "Беспроводные наушники",
            img: prizePic4,
            place: "и билет в кино!",
        },
        {
            id: 5,
            text: "Попкорница",
            img: prizePic5,
            place: "и билет в кино!",
        },
        {
            id: 6,
            text: "Книги и пазл про Финника",
            img: prizePic6,
            place: null,
        },
        {
            id: 7,
            text: "Мягкая игрушка и альбом для наклеек",
            img: prizePic7,
            place: null,
        },
        {
            id: 8,
            text: "Игрушка антистресс и свитбоксы с подарком",
            img: prizePic8,
            place: null,
        },
        {
            id: 9,
            text: "Настольная игра и раскраска",
            img: prizePic9,
            place: null,
        },
    ];

    const faq = [
        {
            id: 1,
            title: "Кто организатор акции?",
            text: "Компания «НМГ Кинопрокат» (входит в холдинг «Национальная Медиа Группа»)",
        },
        {
            id: 2,
            title: "Какие сроки проведения акции?",
            text: "Проходить уровни можно с 8 сентября по 30 октября. Итоги розыгрыша подведем 3 ноября.",
        },
        {
            id: 3,
            title: "Когда выйдет фильм?",
            text: "Смотрите анимационное приключение «Финник 2» в кино с 23 октября.",
        },
        {
            id: 4,
            title: "Как участвовать в розыгрыше?",
            text: "Получайте билеты за прохождение новых уровней и приглашения друзей. Каждый билет увеличивает шансы на победу!",
        },
    ];

    return (
        <Panel id={id} disableBackground className={css["prizes-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.back();
                }}
                title="О розыгрыше"
            />
            <div className={css["prizes-panel__content"]}>
                <Div>
                    <div className={css["prizes-panel__banner"]}>
                        <Title
                            align="center"
                            className={css["prizes-panel__title"]}
                            size="medium"
                            color="yellow"
                        >
                            Выигрывайте
                            <br />
                            крутые призы!
                        </Title>
                        <img
                            width={350}
                            src={PrizeBanner}
                            className={css["prizes-panel__banner-pic"]}
                            alt=""
                        />
                    </div>
                    <div className={css["prizes-info"]}>
                        <div className={css["prizes-info1"]}>
                            <Title size="small" color="white">
                                Выполняйте задания <br />
                                и открывайте новых героев на карте
                            </Title>
                        </div>
                        <div className={css["prizes-info2"]}>
                            <Title size="small" color="white">
                                Получайте билеты
                                <br />
                                за пройденные уровни. <br />
                                Каждый билет увеличивает шансы на победу в розыгрыше!
                            </Title>
                        </div>
                        <div className={css["prizes-info3"]}>
                            <Title size="small" color="white">
                                3 ноября подведем итоги в сообществе
                                «Финник 2» во "Вконтакте"
                            </Title>
                        </div>
                    </div>
                    <div className={css["prizes-panel-items"]}>
                        <img
                            src={titleImage1}
                            className={css["prizes-panel-items__title"]}
                        />
                        <Spacing size={25} />
                        <div className={css["prizes-slider"]}>
                            {currentPrizeSlide < prizes.length-1 && <button
                                onClick={() => swiperRef.current?.slideNext()}
                                className={css["prizes-slider__next"]}
                            >
                                <img src={nextIcon} alt="" />
                            </button>}
                            {currentPrizeSlide > 0 && <button
                                onClick={() => swiperRef.current?.slidePrev()}
                                className={css["prizes-slider__prev"]}
                            >
                                <img src={prevIcon} alt="" />
                            </button>}
                            <Swiper
                                spaceBetween={5}
                                slidesPerView={1}
                                // loop={true}
                                onBeforeInit={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                onTransitionEnd={(swiper) => {
                                    setCurrentPrizeSlide(swiper.activeIndex);
                                }}
                            >
                                {prizes.map((prize) => {
                                    return (
                                        <SwiperSlide key={prize.id}>
                                            <div
                                                className={css["prizes-slide"]}
                                            >
                                                <img
                                                    className={
                                                        css["prizes-slide__img"]
                                                    }
                                                    src={prize.img}
                                                    alt=""
                                                    width={188}
                                                    height={130}
                                                />
                                                <Title
                                                    className={
                                                        css[
                                                            "prizes-slide__text"
                                                        ]
                                                    }
                                                    color="black"
                                                    align="center"
                                                    size="medium"
                                                >
                                                    {prize.text}
                                                </Title>
                                                {prize.place && (
                                                    <div
                                                        className={
                                                            css[
                                                                "prizes-slide__place"
                                                            ]
                                                        }
                                                    >
                                                        <Text
                                                            className={
                                                                css[
                                                                    "prizes-slide__place-text"
                                                                ]
                                                            }
                                                            size="small"
                                                            color="yellow"
                                                            align="center"
                                                        >
                                                            {prize.place}
                                                        </Text>
                                                    </div>
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                    <Spacing size={50} />
                    <VkVideoBanner />
                    <Spacing size={20} />
                    <Button
                        color="pink"
                        href="https://www.afisha.ru/movie/finnik-2-306500/"
                    >
                        Купить билеты
                    </Button>
                    <Spacing size={50} />
                    <img
                        src={titleImage2}
                        className={css["prizes-panel-items__faq-title"]}
                    />
                    <Spacing size={20} />
                    <div className={css["faq-list"]}>
                        {faq.map((faqItem) => {
                            return (
                                <FaqItem
                                    id={faqItem.id}
                                    title={faqItem.title}
                                    text={faqItem.text}
                                    key={faqItem.id}
                                />
                            );
                        })}
                    </div>
                    <Spacing size={25} />
                    <Button
                        href="https://disk.yandex.ru/i/uL5nT6gWIG7_3w"
                        color="transparent"
                        className={css["prizes-panel__rules"]}
                    >
                        Правила и условия
                    </Button>
                    <Spacing size={70} />
                </Div>
            </div>

            <div className={css["about-panel-footer"]}></div>
        </Panel>
    );
};
