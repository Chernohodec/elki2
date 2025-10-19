import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    FixedLayout,
    NavIdProps,
    Panel,
    Spacing,
    usePlatform,
} from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import { Title } from "../../components/Title/Title";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game4.module.css";
import { Text } from "../../components/Text/Text";
import { PlusBall } from "../../components/PlusBall/PlusBall";
import { GameDone } from "../../components/GameDone/GameDone";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { checkQuest } from "../../api/user/checkQuest";

export const Game4: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const dispatch = useAppDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const platform = usePlatform();
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 4
    );

    useEffect(() => {
        if (!currentTask?.active) {
            routeNavigator.replace(`/`);
        }
    }, []);

    const shareToStory = () => {
        completeTask();
    };

    const completeTask = () => {
        // checkQuest(4).then(() => {
        //     updateTasks();
        // });
        dispatch(setTaskChecked(4));
        setGameComplete(true);
    };

    return (
        <Panel id={id} disableBackground className={css["game-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.showModal(DEFAULT_VIEW_MODALS.CLOSE_MODAL);
                }}
                title="Совет от Зины"
            ></CustomPanelHeader>
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
                {gameComplete ? (
                    <GameDone text="Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie." />
                ) : currentStep === 0 ? (
                    <>
                        <Spacing size={25} />
                        <Title color="white" align="center">
                            Выберите лучший
                            <br />
                            совет от зины
                        </Title>
                        <div className={css["tips-slider"]}>
                            <Swiper
                                slidesPerView={"auto"}
                                centeredSlides
                                spaceBetween={30}
                                className={css["tips-slider__swiper"]}
                                onTransitionEnd={(swiper) =>
                                    setCurrentSlide(swiper.activeIndex)
                                }
                            >
                                <SwiperSlide>
                                    <div className={css["tips-slide"]}>
                                        <Title color="red-black" align="center">
                                            Надевайте шапку зимой так теплее
                                        </Title>
                                        <img
                                            width={140}
                                            className={css["tips-slide__pic"]}
                                            src="assets/img/tasks/task4/hat.png"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={css["tips-slide"]}>
                                        <Title color="red-black" align="center">
                                            Надевайте шапку зимой так теплее
                                        </Title>
                                        <img
                                            width={140}
                                            className={css["tips-slide__pic"]}
                                            src="assets/img/tasks/task4/hat.png"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={css["tips-slide"]}>
                                        <Title color="red-black" align="center">
                                            Надевайте шапку зимой так теплее
                                        </Title>
                                        <img
                                            width={140}
                                            className={css["tips-slide__pic"]}
                                            src="assets/img/tasks/task4/hat.png"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </>
                ) : (
                    currentStep === 1 && (
                        <div className={css["advice-block"]}>
                            <Spacing size={25} />
                            <img
                                width={160}
                                height={240}
                                src="assets/img/loading-bg.jpg"
                                alt=""
                            />
                            <Spacing size={20} />
                            <Title align="center" color="yellow">
                                Отличный совет
                            </Title>
                            <Spacing size={5} />
                            <Text color="white" align="center">
                                Lorem ipsum dolor sit amet consectetur. Pretium
                                placerat duis convallis felis eget nunc arcu id
                                at. Facilisi augue ultrices molestie.
                            </Text>
                            <Spacing size={25} />
                            <PlusBall />
                        </div>
                    )
                )}
            </div>
            <FixedLayout vertical="bottom">
                <Div>
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
                            <Button color="yellow" onClick={shareToStory}>
                                Поделиться в историю
                            </Button>
                        )
                    )}
                </Div>
            </FixedLayout>
        </Panel>
    );
};
