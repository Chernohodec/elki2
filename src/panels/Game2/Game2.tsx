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
import game2Title from "../../assets/img/tasks/task2/task2-header-title.png";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks } from "../../store/tasks.reducer";
import css from "./Game2.module.css";
import { Title } from "../../components/Title/Title";
import { Button } from "../../components/Button/Button";
import { DEFAULT_VIEW_MODALS } from "../../routes";

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
    const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!currentTask?.active) {
            routeNavigator.replace(`/`);
        }
    }, []);

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
            // Выбираем случайную яму (от 0 до 5, так как у нас 6 snowdrift-wrapper)
            const randomHole = Math.floor(Math.random() * 6);
            setActiveHole(randomHole);

            // Свинья появляется на 800-1200ms
            const showTime = 800 + Math.random() * 400;

            setTimeout(() => {
                setActiveHole(null);
            }, showTime);
        }, 1500); // Новое появление каждые 1.5 секунды
    };

    const handleHoleClick = (holeIndex: number) => {
        if (!gameActive) return;

        // Если кликнули по активной яме со свиньей
        if (activeHole === holeIndex) {
            setScore((prevScore) => {
                const newScore = prevScore + 1;

                // Проверяем победу
                if (newScore >= 10) {
                    gameWin();
                }

                return newScore;
            });

            // Сразу скрываем свинью после попадания
            setActiveHole(null);
        }
    };

    const gameWin = () => {
        setGameActive(false);
        if (gameIntervalRef.current) {
            clearInterval(gameIntervalRef.current);
            gameIntervalRef.current = null;
        }

        // Здесь можно добавить логику завершения игры
        console.log("Победа! Набрано 10 очков!");

        // Пример вызова функции обновления задач
        if (updateTasks) {
            updateTasks();
        }
    };

    // Функция для получения класса порядка для snowdrift-wrapper
    const getOrderClass = (index: number): string => {
        const orders = ["1", "2", "3", "1", "2", "3"];
        return css[`snowdrift-wrapper_order_${orders[index]}`];
    };

    // Создаем массив из 6 ям (2 ряда по 3 ямы)
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
                                    onClick={() => handleHoleClick(holeIndex)}
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
                                            <div className={css["pig"]}></div>
                                        </>
                                    )}
                                    {/* Свинья появляется только в активной яме */}
                                    {activeHole === holeIndex && gameActive && (
                                        <div className={css["pig"]}></div>
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
                                    onClick={() => handleHoleClick(holeIndex)}
                                    style={{
                                        cursor: gameActive
                                            ? "pointer"
                                            : "default",
                                    }}
                                >
                                    <div className={css["snowdrift"]}></div>
                                    {/* Свинья появляется только в активной яме */}
                                    {activeHole === holeIndex && gameActive && (
                                        <div className={css["pig"]}></div>
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

                    {/* Сообщение о победе */}
                    {score >= 10 && (
                        <div className={css["onboarding-wrapper"]}>
                            <div className={css["onboarding"]}>
                                <Title align="center">
                                    Поздравляем!
                                    <br />
                                    Вы поймали 10 пигов!
                                </Title>
                                <Spacing size={20} />
                                <Button
                                    color="red"
                                    onClick={() => routeNavigator.replace(`/`)}
                                >
                                    Завершить игру
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Panel>
    );
};
