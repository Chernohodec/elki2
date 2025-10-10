import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    NavIdProps,
    Panel,
    PopoutWrapper,
    usePlatform,
} from "@vkontakte/vkui";
import { FC, useEffect, useRef, useState } from "react";
import "swiper/css";
import { checkQuest } from "../../api/user/checkQuest";
import heartIcon from "../../assets/img/tasks/heart-icon.svg";
import floor from "../../assets/img/tasks/task5/floor.png";
import frameJump from "../../assets/img/tasks/task5/frame-jump.svg";
import frameRun1 from "../../assets/img/tasks/task5/frame-run1.svg";
import frameRun2 from "../../assets/img/tasks/task5/frame-run2.svg";
import obstacle1 from "../../assets/img/tasks/task5/obstacle1.png";
import obstacle2 from "../../assets/img/tasks/task5/obstacle2.png";
import obstacle3 from "../../assets/img/tasks/task5/obstacle3.png";
import game5Title from "../../assets/img/tasks/task5/task5-header-title.png";
import onboardingStep1 from "../../assets/img/tasks/task5/task5-onboarding1.png";
import onboardingStep2 from "../../assets/img/tasks/task5/task5-onboarding2.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import { GameDone } from "../../components/GameDone/GameDone";
import { GameFailed } from "../../components/GameFailed/GameFailed";
import { Title } from "../../components/Title/Title";
import { preloadImages } from "../../helpers/preloadImages";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game5.module.css";

export const Game5: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 5
    );
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [isJumping, setIsJumping] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(frameRun1);
    const [obstacles, setObstacles] = useState<
        Array<{ x: number; type: number }>
    >([]);
    const [heroIsDamaged, setHeroIsDamaged] = useState(false);
    const gameLoopRef = useRef<number>();
    const obstacleTimerRef = useRef<number>();
    const scoreTimerRef = useRef<NodeJS.Timeout>();
    const [animationSpeed, setAnimationSpeed] = useState(10);
    const [animationCounter, setAnimationCounter] = useState(0);
    const [floorPosition, setFloorPosition] = useState(0);
    const floorRef = useRef<HTMLImageElement>(null);
    const [floorWidth, setFloorWidth] = useState(0);
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [finishLine, setFinishLine] = useState<{
        x: number;
        visible: boolean;
    }>({ x: -1000, visible: false });
    const [gameCompleting, setGameCompleting] = useState(false);
    const dispatch = useAppDispatch();
    const platform = usePlatform();

    // Константы игры
    const GAME_SPEED = 5;
    const JUMP_HEIGHT = 100;
    const OBSTACLE_INTERVAL = 2000;
    const SCORE_INCREMENT = 4;
    const SCORE_INTERVAL = 100;
    const MAX_SCORE = 500;
    const FINISH_TRIGGER_SCORE = 450; // Очки, при которых появляется финишная черта

    // Запуск игры
    const startGame = () => {
        setGameStarted(true);
        setScore(0);
        setLives(3);
        setObstacles([]);
        setFinishLine({ x: -1000, visible: false });
        setGameCompleting(false);
    };

    // Обработка прыжка
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                (e.code === "Space" || e.key === " " || e.keyCode === 32) &&
                !isJumping &&
                gameStarted &&
                !gameCompleting
            ) {
                handleJump();
            }
        };

        const handleTouch = () => {
            if (!isJumping && gameStarted && !gameCompleting) {
                handleJump();
            }
        };

        const handleJump = () => {
            setIsJumping(true);
            const jumpTimeout = setTimeout(() => {
                setIsJumping(false);
            }, 800);

            return () => clearTimeout(jumpTimeout);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", handleTouch);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchstart", handleTouch);
        };
    }, [isJumping, gameStarted, gameCompleting]);

    // Игровой цикл
    useEffect(() => {
        if (!gameStarted) return;

        const gameLoop = (timestamp: number) => {
            // Если игра завершается, не генерируем новые препятствия
            if (!gameCompleting) {
                // Генерация препятствий
                if (
                    !obstacleTimerRef.current ||
                    timestamp - obstacleTimerRef.current > OBSTACLE_INTERVAL
                ) {
                    const obstacleType = Math.floor(Math.random() * 3) + 1;
                    setObstacles((prev) => [
                        ...prev,
                        { x: window.innerWidth, type: obstacleType },
                    ]);
                    obstacleTimerRef.current = timestamp;
                }
            }

            // Движение препятствий
            setObstacles((prev) =>
                prev
                    .map((obs) => ({ ...obs, x: obs.x - GAME_SPEED }))
                    .filter((obs) => obs.x > -100)
            );

            // Движение финишной черты
            if (finishLine.visible) {
                setFinishLine((prev) => ({
                    ...prev,
                    x: prev.x - GAME_SPEED,
                }));
            }

            // Анимация бега с контролируемой скоростью
            if (!isJumping) {
                setAnimationCounter((prev) => {
                    if (prev >= animationSpeed) {
                        setCurrentFrame((prevFrame) =>
                            prevFrame === frameRun1 ? frameRun2 : frameRun1
                        );
                        return 0;
                    }
                    return prev + 1;
                });
            }

            // Движение пола
            if (floorWidth > 0) {
                setFloorPosition((prev) => prev - GAME_SPEED);
            }

            gameLoopRef.current = requestAnimationFrame(gameLoop);
        };

        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, [
        gameStarted,
        isJumping,
        animationSpeed,
        gameCompleting,
        finishLine.visible,
    ]);

    // Счетчик очков
    useEffect(() => {
        if (!gameStarted || gameCompleting) return;

        scoreTimerRef.current = setInterval(() => {
            setScore((prev) => {
                const newScore = prev + SCORE_INCREMENT;

                // Показываем финишную черту при достижении определенного количества очков
                if (newScore >= FINISH_TRIGGER_SCORE && !finishLine.visible) {
                    setFinishLine({
                        x: window.innerWidth + 200,
                        visible: true,
                    });
                    setGameCompleting(true);
                    // Очищаем все препятствия при появлении финиша
                    setObstacles([]);
                }

                return newScore;
            });
        }, SCORE_INTERVAL);

        return () => {
            if (scoreTimerRef.current) clearInterval(scoreTimerRef.current);
        };
    }, [gameStarted, gameCompleting, finishLine.visible]);

    // Проверка столкновений
    useEffect(() => {
        if (!gameStarted) return;

        const characterRect = {
            x: 100,
            y: isJumping ? JUMP_HEIGHT : 0,
            width: 50,
            height: 80,
        };

        // Проверка столкновения с препятствиями
        obstacles.forEach((obs) => {
            const obstacleRect = {
                x: obs.x,
                y: 0,
                width: 50,
                height: 60,
            };

            if (checkCollision(characterRect, obstacleRect)) {
                setLives((prev) => {
                    const newLives = prev - 1;
                    setHeroIsDamaged(true);
                    setTimeout(() => {
                        setHeroIsDamaged(false);
                    }, 1000);
                    if (newLives <= 0) {
                        console.log("Игра окончена! Закончились жизни");
                        routeNavigator.showPopout(
                            <GameFailed
                                backHandler={() => routeNavigator.replace(`/`)}
                                reloadHandler={() => {
                                    routeNavigator.hidePopout();
                                    startGame();
                                }}
                            />
                        );
                        setGameStarted(false);
                    }
                    return newLives;
                });
                // Удаляем препятствие после столкновения
                setObstacles((prev) => prev.filter((o) => o !== obs));
            }
        });

        // Проверка достижения финишной черты
        if (finishLine.visible && finishLine.x <= 120 && finishLine.x >= 80) {
            console.log("Финиш достигнут!");
            setScore(MAX_SCORE);
            setGameCompleting(true);
            checkQuest(5).then(() => {
                updateTasks();
            });
            dispatch(setTaskChecked(5));
            routeNavigator.showPopout(
                <GameDone onClick={() => routeNavigator.replace(`/`)} />
            );
            setGameStarted(false);
        }
    }, [obstacles, isJumping, gameStarted, finishLine]);

    // Функция проверки столкновений
    const checkCollision = (
        rect1: { x: number; y: number; width: number; height: number },
        rect2: { x: number; y: number; width: number; height: number }
    ) => {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    };

    // Предзагрузка текстуры пола
    useEffect(() => {
        const img = new Image();
        img.src = floor;

        if (floorRef.current) {
            const handleLoad = () => {
                setFloorWidth(floorRef.current?.naturalWidth || 0);
            };

            floorRef.current.addEventListener("load", handleLoad);
            return () => {
                floorRef.current?.removeEventListener("load", handleLoad);
            };
        }
    }, []);

    const onboardingSteps = [
        <div className={css["onboarding-step1"]}>
            <img width={350} src={onboardingStep1} alt="" />
        </div>,
        <div className={css["onboarding-step2"]}>
            <img width={310} src={onboardingStep2} alt="" />
        </div>,
    ];

    useEffect(() => {
        onboardingStep < 2
            ? routeNavigator.showPopout(
                  <PopoutWrapper>
                      <div className={css["onboarding"]}>
                          {onboardingSteps[onboardingStep]}
                          <Button
                              onClick={() =>
                                  setOnboardingStep(onboardingStep + 1)
                              }
                          >
                              <span>
                                  {onboardingStep === onboardingSteps.length - 1
                                      ? "Начать"
                                      : "Продолжить"}
                              </span>
                          </Button>
                      </div>
                  </PopoutWrapper>
              )
            : routeNavigator.hidePopout();

        onboardingStep === 2 && startGame();
    }, [onboardingStep]);

    useEffect(() => {
        const images = [
            frameRun1,
            frameRun2,
            frameJump,
            obstacle1,
            obstacle2,
            obstacle3,
            floor,
            onboardingStep1,
            onboardingStep2,
            game5Title,
        ];

        preloadImages(images);

        if(currentTask?.checked || !currentTask?.active){
            routeNavigator.replace(`/`)
        }
    }, []);

    return (
        <Panel id={id} disableBackground className={css["game-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    setGameStarted(false);
                    routeNavigator.showPopout(
                        <GameCancel
                            reloadHandler={() => {
                                routeNavigator.hidePopout();
                                startGame();
                            }}
                            backHandler={() => routeNavigator.replace(`/`)}
                        />
                    );
                }}
            >
                <img src={game5Title} width={166} alt="" />
            </CustomPanelHeader>
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
                <Div>
                    <div className={css["game-header"]}>
                        <div className={css["lifes"]}>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <img
                                    key={i}
                                    src={heartIcon}
                                    alt=""
                                    className={i < lives ? css["active"] : ""}
                                />
                            ))}
                        </div>
                        <div className={css["counter"]}>
                            <Title size="big" color="black" align="center">
                                {score} / {MAX_SCORE}
                            </Title>
                        </div>
                        <div className={css["sound"]}>
                            {/* <button
                                className={css["mute-button"]}
                                onClick={() => setMuted(!muted)}
                            >
                                {muted ? (
                                    <Icon24MuteCross fill="#E948A8" />
                                ) : (
                                    <Icon24Volume fill="#E948A8" />
                                )}
                            </button> */}
                        </div>
                    </div>
                    <div
                        className={css["game-field"]}
                        onClick={() => {
                            if (!isJumping && gameStarted) {
                                setIsJumping(true);
                                setTimeout(() => setIsJumping(false), 800);
                            }
                        }}
                    >
                        {/* Скрытое изображение для получения размеров */}
                        <img
                            ref={floorRef}
                            src={floor}
                            style={{ display: "none" }}
                            alt=""
                        />

                        {/* Видимые элементы пола */}
                        {floorWidth > 0 && (
                            <>
                                <img
                                    src={floor}
                                    className={css["floor"]}
                                    style={{ left: floorPosition % 340 }}
                                    alt="game floor"
                                />
                                <img
                                    src={floor}
                                    className={css["floor"]}
                                    style={{
                                        left: (floorPosition % 340) + 340,
                                    }}
                                    alt="game floor extension"
                                />
                            </>
                        )}

                        {/* Финишная черта */}
                        {finishLine.visible && (
                            <div
                                className={css["finish"]}
                                style={{ left: finishLine.x }}
                            >
                                <div className={css["finish-flag"]}>🏁</div>
                                {/* <div className={css["finish-text"]}>ФИНИШ</div> */}
                            </div>
                        )}

                        {/* Персонаж */}
                        <img
                            src={isJumping ? frameJump : currentFrame}
                            className={classNames(
                                css["character"],
                                heroIsDamaged && css["character_damaged"]
                            )}
                            style={{
                                bottom: isJumping ? JUMP_HEIGHT : 0,
                                transition: isJumping
                                    ? "bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                    : "bottom 0.2s ease-out",
                            }}
                        />

                        {/* Препятствия */}
                        {obstacles.map((obs, i) => (
                            <img
                                key={i}
                                src={
                                    obs.type === 1
                                        ? obstacle1
                                        : obs.type === 2
                                        ? obstacle2
                                        : obstacle3
                                }
                                className={css["obstacle"]}
                                style={{ left: obs.x }}
                            />
                        ))}
                    </div>
                </Div>
            </div>
        </Panel>
    );
};
