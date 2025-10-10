import bridge from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    NavIdProps,
    Panel,
    Spacing,
    usePlatform,
} from "@vkontakte/vkui";
import { FC, useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { checkQuest } from "../../api/user/checkQuest";
import nextIcon from "../../assets/img/next-button.svg";
import prevIcon from "../../assets/img/prev-button.svg";
import shareCard1 from "../../assets/img/tasks/task2/share-card1.jpg";
import shareCard2 from "../../assets/img/tasks/task2/share-card2.jpg";
import shareCard3 from "../../assets/img/tasks/task2/share-card3.jpg";
import game2Title from "../../assets/img/tasks/task2/task2-header-title.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { ErrorSnackbar } from "../../components/ErrorSnackbar/ErrorSnackbar";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import { GameDone } from "../../components/GameDone/GameDone";
import { Title } from "../../components/Title/Title";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game2.module.css";

export const Game2: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const swiperRef = useRef();
    const dispatch = useAppDispatch();
    const platform = usePlatform();
    const currentTask = useAppSelector(selectTasks).find(task=>task?.id === 2)
    const [currentSlide, setCurrentSlide] = useState(0);
    const shareCards = [
        {
            id: 1,
            pic: shareCard1,
        },
        {
            id: 2,
            pic: shareCard2,
        },
        {
            id: 3,
            pic: shareCard3,
        },
    ];

    const share = async () => {
        try {
            const bridgeResponse = await bridge.send("VKWebAppShowStoryBox", {
                background_type: "image",
                url: shareCards[currentSlide].pic,
                attachment: {
                    text: "open",
                    type: "url",
                    url: "https://vk.com/app53990455",
                },
            });

            dispatch(setTaskChecked(2));
            routeNavigator.showPopout(
                <GameDone onClick={() => routeNavigator.replace(`/`)} />
            );
            await checkQuest(2);
            updateTasks();
        } catch (e) {
            console.log(e);
            // routeNavigator.showPopout(<ErrorSnackbar />);
        }
    };

    useEffect(() => {
        if (!currentTask?.active) {
            routeNavigator.replace(`/`)
        }
    }, []);

    return (
        <Panel id={id} disableBackground className={css["game-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.showPopout(
                        <GameCancel
                            reloadHandler={() => routeNavigator.hidePopout()}
                            backHandler={() => routeNavigator.replace(`/`)}
                        />
                    );
                }}
            >
                <img src={game2Title} width={166} alt="" />
            </CustomPanelHeader>
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
                <Div>
                    <Spacing size={30} />
                    <Title size="medium" align="center" color="black">
                        Выберите открытку,
                        <br />
                        которой хотите поделиться
                    </Title>
                    <Spacing size={20} />
                    <div className={css["cards-slider"]}>
                        {currentSlide !== 0 && (
                            <button
                                onClick={() => swiperRef.current?.slidePrev()}
                                className={css["cards-slider__prev"]}
                            >
                                <img src={prevIcon} alt="" />
                            </button>
                        )}
                        {currentSlide !== 3 && (
                            <button
                                onClick={() => swiperRef.current?.slideNext()}
                                className={css["cards-slider__next"]}
                            >
                                <img src={nextIcon} alt="" />
                            </button>
                        )}
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            onTransitionEnd={(swiper) =>
                                setCurrentSlide(swiper.activeIndex)
                            }
                        >
                            {shareCards.map((shareCard) => {
                                return (
                                    <SwiperSlide key={shareCard.id}>
                                        <div className={css["cards-slide"]}>
                                            <img
                                                className={
                                                    css["cards-slide__img"]
                                                }
                                                src={shareCard.pic}
                                                alt=""
                                                width={135}
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                    <Spacing size={20} />
                    <Button onClick={share}>
                        <span>Поделиться в истории</span>
                    </Button>
                </Div>
            </div>
        </Panel>
    );
};
