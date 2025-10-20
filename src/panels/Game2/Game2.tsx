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
import { FC, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import "swiper/css";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameDone } from "../../components/GameDone/GameDone";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game2.module.css";

export const Game2: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const swiperRef = useRef();
    const dispatch = useAppDispatch();
    const platform = usePlatform();
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 2
    );
    const [onboardingDone, setOnboardingDone] = useState(false);
    const [score, setScore] = useState(0);
    const [activeHole, setActiveHole] = useState<number | null>(null);
    const [gameActive, setGameActive] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
    
    // URL звука свиньи
    const pigSoundUrl = "https://cdn.freesound.org/previews/543/543298_2086040-lq.mp3"; // Замените на ваш URL
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Инициализация звука по URL
    useEffect(() => {
        audioRef.current = new Audio(pigSoundUrl);
        audioRef.current.volume = 0.3;
        audioRef.current.preload = "auto"; // Предзагрузка звука
        
        // Очистка при размонтировании
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [pigSoundUrl]);

    const completeTask = () => {
        dispatch(setTaskChecked(2));
        setGameComplete(true);
        setShowConfetti(true);
    };

    useEffect(() => {
        if (!currentTask?.active) {
            routeNavigator.replace(`/`);
        }
    }, [currentTask?.active, routeNavigator]);

    // Очистка интервала при размонтировании
    useEffect(() => {
        return () => {
            if (gameIntervalRef.current) {
                clearInterval(gameIntervalRef.current);
            }
        };
    }, []);

    const startGame = () => {
        setOnboardingDone(true);
        setGameActive(true);
        setScore(0);
        startGameLoop();
    };

    const startGameLoop = () => {
        if (gameIntervalRef.current) {
            clearInterval(gameIntervalRef.current);
        }

        gameIntervalRef.current = setInterval(() => {
            const randomHole = Math.floor(Math.random() * 6);
            setActiveHole(randomHole);

            const showTime = 800 + Math.random() * 400;

            setTimeout(() => {
                setActiveHole(null);
            }, showTime);
        }, 1500);
    };

    const playPigSound = () => {
        if (audioRef.current) {
            // Сбрасываем звук на начало перед воспроизведением
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => {
                console.log("Audio play failed:", error);
                // Если воспроизведение не удалось, пытаемся перезагрузить звук
                if (audioRef.current) {
                    audioRef.current.load();
                }
            });
        }
    };

    const handleHoleClick = (holeIndex: number) => {
        if (!gameActive) return;

        // Если кликнули по активной яме со свиньей
        if (activeHole === holeIndex) {
            // Воспроизводим звук
            playPigSound();
            
            setScore((prevScore) => {
                const newScore = prevScore + 1;

                if (newScore >= 10) {
                    gameWin();
                }

                return newScore;
            });

            setActiveHole(null);
        }
    };

    const gameWin = () => {
        setGameActive(false);
        if (gameIntervalRef.current) {
            clearInterval(gameIntervalRef.current);
            gameIntervalRef.current = null;
        }
        completeTask();
    };

    const getOrderClass = (index: number): string => {
        const orders = ["1", "2", "3", "1", "2", "3"];
        return css[`snowdrift-wrapper_order_${orders[index]}`];
    };

    const holes = Array.from({ length: 6 }, (_, index) => index);

    return (
        <Panel id={id} disableBackground className={css["game-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.showModal(DEFAULT_VIEW_MODALS.CLOSE_MODAL);
                }}
                title="Поймай пига"
            ></CustomPanelHeader>
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
                {showConfetti && (
                    <Confetti
                        recycle={false}
                        numberOfPieces={400}
                        gravity={0.5}
                        tweenDuration={900}
                        className={css["game-start-panel__confetti"]}
                    />
                )}
                {!gameComplete ? (
                    <div className={css["hit-pig-game"]}>
                        <div className={css["hit-pig-counter"]}>
                            <Title color="yellow">{score}/10</Title>
                        </div>
                        <div className={css["game-area"]}>
                            {/* Первый ряд снежных сугробов */}
                            <div className={css["snow-row"]}>
                                {holes.slice(0, 3).map((holeIndex) => (
                                    <div
                                        key={holeIndex}
                                        className={classNames(
                                            css["snowdrift-wrapper"],
                                            getOrderClass(holeIndex)
                                        )}
                                        onClick={() =>
                                            handleHoleClick(holeIndex)
                                        }
                                        style={{
                                            cursor: gameActive
                                                ? "pointer"
                                                : "default",
                                        }}
                                    >
                                        <div className={css["snowdrift"]}></div>
                                        {!onboardingDone && holeIndex === 0 && (
                                            <>
                                                <img
                                                    src="assets/img/tasks/task2/touch-icon.svg"
                                                    className={
                                                        css[
                                                            "snowdrift-wrapper__pointer"
                                                        ]
                                                    }
                                                />
                                                <div
                                                    className={classNames(
                                                        css["pig"],
                                                        css["pig_active"]
                                                    )}
                                                ></div>
                                            </>
                                        )}
                                        {/* Свинья появляется только в активной яме */}
                                        {gameActive && (
                                            <div
                                                className={classNames(
                                                    css["pig"],
                                                    activeHole === holeIndex &&
                                                        css["pig_active"]
                                                )}
                                            ></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Второй ряд снежных сугробов */}
                            <div className={css["snow-row"]}>
                                {holes.slice(3, 6).map((holeIndex) => (
                                    <div
                                        key={holeIndex}
                                        className={classNames(
                                            css["snowdrift-wrapper"],
                                            getOrderClass(holeIndex)
                                        )}
                                        onClick={() =>
                                            handleHoleClick(holeIndex)
                                        }
                                        style={{
                                            cursor: gameActive
                                                ? "pointer"
                                                : "default",
                                        }}
                                    >
                                        <div className={css["snowdrift"]}></div>
                                        {/* Свинья появляется только в активной яме */}
                                        {gameActive && (
                                            <div
                                                className={classNames(
                                                    css["pig"],
                                                    activeHole === holeIndex &&
                                                        css["pig_active"]
                                                )}
                                            ></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {!onboardingDone && (
                            <div className={css["onboarding-wrapper"]}>
                                <div className={css["onboarding"]}>
                                    <Title align="center">
                                        Тапайте по пигу,
                                        <br />
                                        чтобы поймать его
                                    </Title>
                                    <Spacing size={20} />
                                    <Button color="red" onClick={startGame}>
                                        Начать игру
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <GameDone
                        pic="assets/img/tasks/task2/done.png"
                        text="Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie."
                    />
                )}
            </div>
            {gameComplete && (
                <FixedLayout vertical="bottom">
                    <Div style={{ paddingLeft: 22, paddingRight: 22 }}>
                        <Button
                            color="yellow"
                            onClick={() => routeNavigator.replace("/")}
                        >
                            К заданиям
                        </Button>
                    </Div>
                </FixedLayout>
            )}
        </Panel>
    );
};