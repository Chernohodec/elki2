import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Div, NavIdProps, Panel, Spacing } from "@vkontakte/vkui";
import { FC, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
// import nextIcon from "../../assets/img/next-button.svg";
// import prevIcon from "../../assets/img/prev-button.svg";
import { Icon24Chevron, Icon24ChevronRight } from "@vkontakte/icons";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import css from "./Prize.module.css";
import { VkVideoBanner } from "../../components/VkVideoBanner/VkVideoBanner";

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
        <div className={classNames(css["faq-item"])}>
            <button
                className={classNames(
                    css["faq-item__header"],
                    isOpen && css["faq-item__header_active"]
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Text color="white" align="left">
                    {title}
                </Text>
                <Icon24Chevron
                    fill={"#ffffff"}
                    className={css["faq-item__icon"]}
                />
            </button>
            {isOpen && (
                <div className={css["faq-item__content"]}>
                    <Text color="white" align="left">
                        {text}
                    </Text>
                </div>
            )}
        </div>
    );
};

export const Prize: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();

    const swiperRef = useRef();

    const prizes = [
        {
            id: 1,
            text: "3D принтер",
            img: "/assets/img/prizes/prize1.png",
        },
        {
            id: 2,
            text: "Электрогриль",
            img: "/assets/img/prizes/prize2.png",
        },
        {
            id: 3,
            text: "Планшет",
            img: "/assets/img/prizes/prize3.png",
        },
        {
            id: 4,
            text: "Умные очки",
            img: "/assets/img/prizes/prize4.png",
        },
        {
            id: 5,
            text: "Тяжелое одеяло",
            img: "/assets/img/prizes/prize5.png",
        },
        {
            id: 6,
            text: "Фирменный мерч",
            img: "/assets/img/prizes/prize6.png",
        },
        {
            id: 7,
            text: "Билеты в кино",
            img: "/assets/img/prizes/prize7.png",
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
            <Spacing size={240} />
            <div className={css["prizes-panel__content"]}>
                <Div>
                    <div className={css["prizes-panel__banner"]}>
                        <img
                            width={320}
                            src={"assets/img/onboarding-gifts.png"}
                            className={css["prizes-panel__banner-pic"]}
                            alt=""
                        />
                        <Title
                            align="center"
                            className={css["prizes-panel__title"]}
                            color="white"
                        >
                            Выполняйте задания
                            <br />и выигрывайте призы!
                        </Title>
                        <Spacing size={10} />
                        <Text align="center" color="gray">
                            У Вани из Кирова есть заветное желание, которое
                            может исполнить только Дед Мороз. Помогите мальчику
                            добраться до дома волшебника в Великом Устюге, а
                            родителям — догнать своего сына. В дороге вас ждут
                            увлекательные приключения, знакомство с новыми
                            героями и, наконец, розыгрыш классных призов!
                        </Text>
                    </div>
                    <Spacing size={25} />
                    <div className={css["prizes-info"]}>
                        <div className={css["prizes-info__item"]}>
                            <div className={css["prizes-info__number"]}>1</div>
                            <Title size="small" color="white" className={css["prizes-info__text"]}>
                                До 12 января выполняйте задания <br/>и накапливайте
                                шары. Чем их больше, <br/>тем выше шансы выиграть
                                приз
                            </Title>
                        </div>
                        <div className={css["prizes-info__item"]}>
                            <div className={css["prizes-info__number"]}>2</div>
                            <Title size="small" color="white" className={css["prizes-info__text"]}>
                                Приглашайте друзей и получайте <br/>дополнительные
                                шары, чтобы стать <br/>ещё ближе к победе
                            </Title>
                        </div>
                        <div className={css["prizes-info__item"]}>
                            <div className={css["prizes-info__number"]}>3</div>
                            <Title size="small" color="white" className={css["prizes-info__text"]}>
                                16 января мы назовём имена <br/>15 победителей в сообществе <br/>«Ёлки 12» во «ВКонтакте»
                            </Title>
                        </div>
                    </div>
                </Div>
                <Spacing size={40} />
                <Div className={css["prizes-panel-items"]}>
                    <Title align="center" color="yellow">
                        Что можно выиграть?
                    </Title>
                    <Spacing size={20} />
                    <div className={css["prizes-slider"]}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={"auto"}
                            // loop={true}
                        >
                            {prizes.map((prize) => {
                                return (
                                    <SwiperSlide key={prize.id}>
                                        <div className={css["prizes-slide"]}>
                                            <div
                                                className={
                                                    css[
                                                        "prizes-slide__img-wrapper"
                                                    ]
                                                }
                                            >
                                                <img
                                                    className={
                                                        css["prizes-slide__img"]
                                                    }
                                                    src={prize.img}
                                                    alt=""
                                                    width={150}
                                                    height={150}
                                                />
                                            </div>

                                            <Title
                                                className={
                                                    css["prizes-slide__text"]
                                                }
                                                color="white"
                                                align="center"
                                                size="medium"
                                            >
                                                {prize.text}
                                            </Title>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </Div>
                <Div className={css["faq-block"]}>
                    <Spacing size={25} />
                    <Title align="center" color="yellow">
                        Частые вопросы
                    </Title>
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
                    <Spacing size={10} />
                    <a className={css["prizes-panel__rules"]} href="">
                        <Text color="white" align="left">
                            Условия розыгрыша
                        </Text>
                        <Icon24ChevronRight
                            fill={"#ffffff"}
                            className={css["faq-item__icon"]}
                        />
                    </a>
                    <Spacing size={70} />
                </Div>
            </div>
            <div className={classNames(css["main-page-banner"])}>
                <Div className={css["main-page-content__text"]}>
                    <VkVideoBanner
                        href="https://trk.mail.ru/c/kkhk46"
                        onClick={() => {}}
                    />
                    <Spacing size={15} />
                    <Title color="red" align="center">«ЁЛКИ 12» В КИНО С 18 ДЕКАБРЯ</Title>
                    <Spacing size={10} />
                    <Text align="center">Главная новогодняя комедия страны возвращается на экраны! Пять новелл о настоящем чуде сделают праздник особенно тёплым.</Text>
                    <Spacing size={15} />
                    <Button href="https://www.afisha.ru/movie/finnik-2-306500/">
                        Купить билеты
                    </Button>
                    <Spacing size={10} />
                    <Button
                        color="transparent"
                        href="https://www.afisha.ru/movie/finnik-2-306500/"
                    >
                        Подробнее о фильме
                    </Button>
                    <Spacing size={100} />
                </Div>
            </div>
        </Panel>
    );
};
