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
import { FC, useEffect, useState, useRef } from "react";
import "swiper/css";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import { Title } from "../../components/Title/Title";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks } from "../../store/tasks.reducer";
import css from "./Game4.module.css";
import TreeProgressBar from "../../components/TreeProgressBar/TreeProgressBar";
import { Swiper, SwiperSlide } from "swiper/react";

export const Game4: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const dispatch = useAppDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const platform = usePlatform();
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 4
    );

    useEffect(() => {
        if (!currentTask?.active) {
            routeNavigator.replace(`/`);
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
                title="Совет от Зины"
            ></CustomPanelHeader>
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
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
            </div>
            <FixedLayout vertical="bottom">
                <Div>
                    <Button color="yellow">Выбрать и продолжить</Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
};
