import bridge from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    Avatar,
    classNames,
    Div,
    FixedLayout,
    NavIdProps,
    Panel,
    Snackbar,
    Spacing,
    usePlatform,
} from "@vkontakte/vkui";
import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import storyPic1 from "../../../public/assets/img/tasks/task4/story-pic1.jpg";
import storyPic2 from "../../../public/assets/img/tasks/task4/story-pic2.jpg";
import storyPic3 from "../../../public/assets/img/tasks/task4/story-pic3.jpg";
import storyPic4 from "../../../public/assets/img/tasks/task4/story-pic4.jpg";
import storyPic5 from "../../../public/assets/img/tasks/task4/story-pic5.jpg";
import { checkQuest } from "../../api/user/checkQuest";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameDone } from "../../components/GameDone/GameDone";
import { PlusBall } from "../../components/PlusBall/PlusBall";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskCompleted } from "../../store/tasks.reducer";
import css from "./Game4.module.css";
import { selectUserCode } from "../../store/main.reducer";
import { Icon16Done } from "@vkontakte/icons";
import { postStat } from "../../api/user/postStat";

export const Game4: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const dispatch = useAppDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const platform = usePlatform();
    const userCode = useAppSelector(selectUserCode);
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 4
    );
    const [showConfetti, setShowConfetti] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const swiperRef = useRef(null);
    const isDesktop = platform === "vkcom";

    useEffect(() => {
        if (currentTask?.completed || !currentTask?.is_active) {
            routeNavigator.replace(`/`);
        }
        setStartTime(Date.now());
    }, []);

    const shareToStory = async (currentSlide: number) => {
        try {
            await bridge
                .send("VKWebAppShowStoryBox", {
                    background_type: "image",
                    url: advices[currentSlide].full,
                    attachment: {
                        text: "open",
                        type: "url",
                        url: `https://vk.com/app54237274#/?referal_id=${userCode}`,
                    },
                })
                .then((data: any) => {
                    if (data.result) {
                        completeTask();
                        routeNavigator.showPopout(
                            <Snackbar
                                onClose={() => routeNavigator.hidePopout()}
                                before={
                                    <Avatar
                                        size={24}
                                        style={{
                                            background: "#EA0300",
                                        }}
                                    >
                                        <Icon16Done
                                            fill="#fff"
                                            width={14}
                                            height={14}
                                        />
                                    </Avatar>
                                }
                            >
                                История опубликована!
                            </Snackbar>
                        );
                        // Этим выбранным пользователям
                        // не удалось отправить приглашения
                    }
                })
                .catch((error) => {
                    console.log(error); // Ошибка
                });
        } catch (e) {}
    };

    const completeTask = () => {
        const completionTime = Date.now();
        const totalTime = (completionTime - startTime) / 1000;
        checkQuest(4).then(() => {
            updateTasks();
            postStat({
                name: "game4",
                data: { timespent: totalTime, choice: currentSlide + 1 },
            });
        });
        dispatch(setTaskCompleted(4));
        setGameComplete(true);
        setShowConfetti(true);
    };

    const advices = [
        {
            id: 1,
            title: "Берите искусственную ёлку, она надёжнее",
            pic: "/assets/img/tasks/task4/pic1.png",
            full: storyPic1,
        },
        {
            id: 2,
            title: "Когда скучно, спойте любимую песню",
            pic: "/assets/img/tasks/task4/pic2.png",
            full: storyPic2,
        },
        {
            id: 3,
            title: "Замените колбасу на говядину в оливье",
            pic: "/assets/img/tasks/task4/pic3.png",
            full: storyPic3,
        },
        {
            id: 4,
            title: "Если ноет спина, прикупите аппликатор",
            pic: "/assets/img/tasks/task4/pic4.png",
            full: storyPic4,
        },
        {
            id: 5,
            title: "Отвечайте добром на добро",
            pic: "/assets/img/tasks/task4/pic5.png",
            full: storyPic5,
        },
    ];

    return (
        <Panel id={id} disableBackground className={css["game-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    gameComplete
                        ? routeNavigator.replace("/")
                        : routeNavigator.showModal(
                              DEFAULT_VIEW_MODALS.CLOSE_MODAL
                          );
                }}
                title="Совет от Зины"
            ></CustomPanelHeader>
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
                <motion.div
                    key={[showConfetti, gameComplete, currentStep]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={css["motion-wrapper"]}
                >
                    {showConfetti && (
                        <Confetti
                            recycle={false}
                            numberOfPieces={200}
                            gravity={0.6}
                            tweenDuration={200}
                            className={css["game-start-panel__confetti"]}
                        />
                    )}
                    {gameComplete ? (
                        <GameDone text="Зина сказала нам по секрету, что делиться опытом с вами — одно удовольствие! Не сбавляйте темп: родители ещё не добрались до Вани и Деда Мороза." />
                    ) : currentStep === 0 ? (
                        <>
                            <Spacing size={25} />
                            <Title color="white" align="center">
                                Выберите лучший
                                <br />
                                совет от зины
                            </Title>
                            <div className={css["tips-slider"]}>
                                {isDesktop && (
                                    <>
                                        <button
                                            className={classNames(
                                                css["tips-slider__prev"]
                                            )}
                                            onClick={() =>
                                                swiperRef.current?.slidePrev()
                                            }
                                        >
                                            <img
                                                width={16}
                                                height={16}
                                                src="/assets/img/slider-arrow.svg"
                                                alt=""
                                            />
                                        </button>

                                        <button
                                            className={classNames(
                                                css["tips-slider__next"]
                                            )}
                                            onClick={() =>
                                                swiperRef.current?.slideNext()
                                            }
                                        >
                                            <img
                                                width={16}
                                                height={16}
                                                src="/assets/img/slider-arrow.svg"
                                                alt=""
                                            />
                                        </button>
                                    </>
                                )}
                                <Swiper
                                    slidesPerView={3}
                                    centeredSlides
                                    spaceBetween={30}
                                    className={css["tips-slider__swiper"]}
                                    onTransitionEnd={(swiper) =>
                                        setCurrentSlide(swiper.activeIndex)
                                    }
                                    onBeforeInit={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                    loop={true}
                                >
                                    {advices.map((advice) => (
                                        <SwiperSlide key={advice.id}>
                                            <div className={css["tips-slide"]}>
                                                <Title
                                                    color="red-black"
                                                    align="center"
                                                    className={
                                                        css["tips-slide__title"]
                                                    }
                                                >
                                                    {advice.title}
                                                </Title>
                                                <img
                                                    // width={140}
                                                    className={classNames(
                                                        css["tips-slide__pic"],
                                                        advice.id === 3 &&
                                                            css[
                                                                "tips-slide__meat"
                                                            ]
                                                    )}
                                                    src={advice.pic}
                                                    alt=""
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </>
                    ) : (
                        currentStep === 1 && (
                            <div className={css["advice-block"]}>
                                <Spacing size={25} />
                                <img
                                    width={150}
                                    height={266}
                                    src={`assets/img/tasks/task4/story-pic${
                                        currentSlide + 1
                                    }.jpg`}
                                    className={css["advice-block__pic"]}
                                    alt=""
                                />
                                <Spacing size={20} />
                                <Title align="center" color="yellow">
                                    Отличный выбор
                                </Title>
                                <Spacing size={5} />
                                <Text color="white" align="center">
                                    С таким напутствием точно не пропадёшь!
                                    Пусть близкие узнают, что посоветовала вам
                                    Зина на Новый год.
                                </Text>
                                <Spacing size={25} />
                                <PlusBall />
                            </div>
                        )
                    )}
                </motion.div>
            </div>
            <FixedLayout vertical="bottom">
                <Div
                    style={{
                        padding: 22,
                        margin: "auto",
                    }}
                >
                    {gameComplete ? (
                        <Button
                            color="yellow"
                            onClick={() => routeNavigator.replace(`/`)}
                        >
                            К заданиям
                        </Button>
                    ) : currentStep === 0 ? (
                        <Button
                            color="yellow"
                            onClick={() => {
                                setCurrentStep(currentStep + 1);
                            }}
                        >
                            Выбрать и продолжить
                        </Button>
                    ) : (
                        currentStep === 1 && (
                            <Button
                                color="yellow"
                                onClick={() => shareToStory(currentSlide)}
                            >
                                Поделиться в историю
                            </Button>
                        )
                    )}
                </Div>
            </FixedLayout>
        </Panel>
    );
};
