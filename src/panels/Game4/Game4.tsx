import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    NavIdProps,
    Panel,
    Spacing,
    usePlatform,
} from "@vkontakte/vkui";
import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { checkQuest } from "../../api/user/checkQuest";
import cardImage1 from "../../assets/img/tasks/task4/cover1.jpg";
import cardImage2 from "../../assets/img/tasks/task4/cover2.jpg";
import game4Title from "../../assets/img/tasks/task4/task4-header-title.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { ErrorSnackbar } from "../../components/ErrorSnackbar/ErrorSnackbar";
import nextIcon from "../../assets/img/next-button.svg";
import prevIcon from "../../assets/img/prev-button.svg";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import { GameDone } from "../../components/GameDone/GameDone";
import { Title } from "../../components/Title/Title";
import { API_URL } from "../../const";
import { vkApiFetch } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game4.module.css";

export const Game4: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const swiperRef = useRef();
    const dispatch = useAppDispatch();
    const platform = usePlatform();
    const [currentSlide, setCurrentSlide] = useState(0);
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 4
    );

    const setCover = async (cardImage: string) => {
        try {
            const uploadPhotoResponse = await vkApiFetch(
                "photos.getOwnerCoverPhotoUploadServer",
                "photos",
                {
                    crop_height: 768,
                    crop_width: 1920,
                    crop_x: 0,
                    crop_y: 0,
                }
            );

            const fetchedPhoto = await fetch(cardImage);
            const blob = await fetchedPhoto.blob();
            const file = new File([blob], "cover.jpg", {
                type: blob.type,
            });

            const formData = new FormData();
            formData.append(
                "upload_url",
                uploadPhotoResponse.response.upload_url
            );
            formData.append("photo", file);
            const uploadFileVkData = await axios.post(
                `${API_URL}upload_photo/`,
                formData
            );

            const photoData = uploadFileVkData.data.response;
            await vkApiFetch("photos.saveOwnerCoverPhoto", "photos", {
                hash: photoData.hash,
                photo: photoData.photo,
            });
            dispatch(setTaskChecked(4));
            routeNavigator.showPopout(
                <GameDone onClick={() => routeNavigator.replace(`/`)} />
            );
            await checkQuest(4);
            updateTasks();
        } catch (e) {
            // routeNavigator.showPopout(<ErrorSnackbar />);
        }
    };

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
            >
                <img src={game4Title} width={166} alt="" />
            </CustomPanelHeader>
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
                <Div>
                    <Spacing size={10} />
                    <Title size="medium" align="center" color="black">
                        Установите обложку
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
                        {currentSlide !== 1 && (
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
                            <SwiperSlide>
                                <div className={css["cards-slide"]}>
                                    <img
                                        className={css["cards-slide__img"]}
                                        src={cardImage1}
                                        alt=""
                                        width={300}
                                        height={125}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={css["cards-slide"]}>
                                    <img
                                        className={css["cards-slide__img"]}
                                        src={cardImage2}
                                        alt=""
                                        width={300}
                                        height={125}
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <Spacing size={20} />
                    <Button
                        onClick={() =>
                            setCover(
                                currentSlide === 0 ? cardImage1 : cardImage2
                            )
                        }
                    >
                        <span>Установить обложку</span>
                    </Button>
                </Div>
            </div>
        </Panel>
    );
};
