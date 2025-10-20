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
import TreeProgressBar from "../../components/TreeProgressBar/TreeProgressBar";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game3.module.css";

// Интерфейс для снежинки
interface Snowflake {
    id: number;
    left: number;
    size: number;
    duration: number;
    opacity: number;
}

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
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const tapCountRef = useRef(0);
    const animationRef = useRef<number | null>(null);
    const lastTapTimeRef = useRef<number>(0);
    const snowflakeIdRef = useRef(0);

    useEffect(() => {
        if (!currentTask?.active) {
            routeNavigator.replace(`/`);
        }
    }, []);

    const completeTask = () => {
        dispatch(setTaskChecked(3));
        setGameComplete(true);
        setShowConfetti(true);
    };

    const startGame = () => {
        setOnboardingDone(true);
        setGameActive(true);
        setPercents(0);
        tapCountRef.current = 0;
    };

    const createSnowflakes = (count: number = 15) => {
        const newSnowflakes: Snowflake[] = [];

        for (let i = 0; i < count; i++) {
            snowflakeIdRef.current += 1;
            newSnowflakes.push({
                id: snowflakeIdRef.current,
                left: Math.random() * 100, // случайная позиция по горизонтали (0-100%)
                size: Math.random() * 8 + 4, // случайный размер (4-12px)
                duration: Math.random() * 1 + 1, // случайная длительность (1-2 секунды)
                opacity: Math.random() * 0.7 + 0.3, // случайная прозрачность (0.3-1)
            });
        }

        setSnowflakes((prev) => [...prev, ...newSnowflakes]);

        // Автоматически удаляем снежинки после завершения анимации
        setTimeout(() => {
            setSnowflakes((prev) =>
                prev.filter(
                    (flake) =>
                        !newSnowflakes.some(
                            (newFlake) => newFlake.id === flake.id
                        )
                )
            );
        }, 2000); // максимальное время жизни снежинки
    };

    const handleTreeTap = () => {
        if (!gameActive || isAnimating) return;

        const currentTime = Date.now();

        // Защита от слишком частых тапов (минимум 100ms между тапами)
        if (currentTime - lastTapTimeRef.current < 100) return;

        lastTapTimeRef.current = currentTime;
        setIsAnimating(true);

        // Создаем снежинки при каждом тапе
        createSnowflakes(15);

        // Увеличиваем счетчик тапов
        tapCountRef.current += 1;

        // Рассчитываем новые проценты
        const tapsToWin = 12;
        const increment = 100 / tapsToWin;
        const newPercents = Math.min(100, percents + increment);

        // Плавная анимация заполнения
        animateProgress(percents, newPercents);
    };

    const animateProgress = (start: number, end: number) => {
        const duration = 300;
        const startTime = Date.now();

        const updateProgress = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = start + (end - start) * easeOutQuart;

            setPercents(Math.round(currentValue * 10) / 10);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(updateProgress);
            } else {
                setIsAnimating(false);

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
                    <div className={css["hit-tree-game"]} onClick={startGame}>
                        {/* Контейнер для снежинок */}
                        <div className={css["snow-container"]}>
                            {snowflakes.map((snowflake) => (
                                <div
                                    key={snowflake.id}
                                    className={css["snowflake"]}
                                    style={{
                                        left: `${snowflake.left}%`,
                                        width: `${snowflake.size}px`,
                                        height: `${snowflake.size}px`,
                                        animationDuration: `${snowflake.duration}s`,
                                        opacity: snowflake.opacity,
                                    }}
                                />
                            ))}
                        </div>

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
                    <Div style={{paddingLeft: 22, paddingRight: 22}}>
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
