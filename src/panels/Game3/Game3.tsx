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
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game3.module.css";
import TreeProgressBar from "../../components/TreeProgressBar/TreeProgressBar";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { GameDone } from "../../components/GameDone/GameDone";

export const Game3: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const dispatch = useAppDispatch();
    const platform = usePlatform();
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 3
    );
    const [percents, setPercents] = useState(0);
    const [onboardingDone, setOnboardingDone] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);

    const tapCountRef = useRef(0);
    const animationRef = useRef<number | null>(null);
    const lastTapTimeRef = useRef<number>(0);

    useEffect(() => {
        if (!currentTask?.active) {
            routeNavigator.replace(`/`);
        }
    }, []);

    const completeTask = () => {
        // checkQuest(4).then(() => {
        //     updateTasks();
        // });
        dispatch(setTaskChecked(3));
        setGameComplete(true);
    };

    const startGame = () => {
        setOnboardingDone(true);
        setGameActive(true);
        setPercents(0);
        tapCountRef.current = 0;
    };

    const handleTreeTap = () => {
        if (!gameActive || isAnimating) return;

        const currentTime = Date.now();

        // Защита от слишком частых тапов (минимум 100ms между тапами)
        if (currentTime - lastTapTimeRef.current < 100) return;

        lastTapTimeRef.current = currentTime;
        setIsAnimating(true);

        // Увеличиваем счетчик тапов
        tapCountRef.current += 1;

        // Рассчитываем новые проценты (каждый тап добавляет ~8.33% для достижения 100% за 12 тапов)
        // Можно настроить количество тапов для победы
        const tapsToWin = 12;
        const increment = 100 / tapsToWin;
        const newPercents = Math.min(100, percents + increment);

        // Плавная анимация заполнения
        animateProgress(percents, newPercents);
    };

    const animateProgress = (start: number, end: number) => {
        const duration = 300; // длительность анимации в ms
        const startTime = Date.now();

        const updateProgress = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easing функция для плавности
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = start + (end - start) * easeOutQuart;

            setPercents(Math.round(currentValue * 10) / 10); // округление до 1 decimal

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(updateProgress);
            } else {
                setIsAnimating(false);

                // Проверяем победу после завершения анимации
                if (end >= 100) {
                    gameWin();
                }
            }
        };

        animationRef.current = requestAnimationFrame(updateProgress);
    };

    const gameWin = () => {
        setGameActive(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        completeTask();
    };

    // Очистка анимации при размонтировании
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <Panel id={id} disableBackground className={css["game-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.showModal(DEFAULT_VIEW_MODALS.CLOSE_MODAL);
                }}
                title="Елочка для Витали"
            ></CustomPanelHeader>
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
                {!gameComplete ? (
                    <div className={css["hit-tree-game"]}>
                        <div className={css["game-area"]}>
                            <div className={css["game-area__svg-wrapper"]}>
                                <TreeProgressBar
                                    percents={percents}
                                    className={css["game-area__svg"]}
                                />
                            </div>
                            <div
                                className={css["game-area__tree"]}
                                onClick={handleTreeTap}
                                style={{
                                    cursor: gameActive ? "pointer" : "default",
                                    transform: isAnimating
                                        ? "scale(0.95)"
                                        : "scale(1)",
                                    transition: "transform 0.1s ease",
                                }}
                            >
                                {!onboardingDone && (
                                    <img
                                        src="assets/img/tasks/task2/touch-icon.svg"
                                        className={css["game-area__pointer"]}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Онбординг */}
                        {!onboardingDone && (
                            <div className={css["onboarding-wrapper"]}>
                                <div className={css["onboarding"]}>
                                    <Title align="center">
                                        Тапайте по ели
                                        <br />и заполняйте шкалу!
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
                        pic="assets/img/tasks/task3/done.png"
                        text="Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie."
                    />
                )}
            </div>
            {gameComplete && (
                <FixedLayout vertical="bottom">
                    <Div>
                        <Button
                            color="yellow"
                            onClick={() => routeNavigator.replace('/')}
                        >
                            К заданиям
                        </Button>
                    </Div>
                </FixedLayout>
            )}
        </Panel>
    );
};
