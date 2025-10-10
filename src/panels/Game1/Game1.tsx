import {
    Icon24MuteCross,
    Icon24Volume
} from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    NavIdProps,
    Panel,
    PopoutWrapper,
    Spacing,
    usePlatform,
} from "@vkontakte/vkui";
import { FC, useCallback, useEffect, useState } from "react";
import Confetti from "react-confetti";
import lifeIcon from "../../assets/img/tasks/heart-icon.svg";
import note from "../../assets/img/tasks/task1/note-icon.svg";
import pauseIcon from "../../assets/img/tasks/task1/play-button-paused.svg";
import playIcon from "../../assets/img/tasks/task1/play-button-play.svg";
import reloadIcon from "../../assets/img/tasks/task1/play-button-reload.svg";
import leftBottomActive from "../../assets/img/tasks/task1/task1-game-button-bottom-left-active.svg";
import leftBottom from "../../assets/img/tasks/task1/task1-game-button-bottom-left.svg";
import rightBottomActive from "../../assets/img/tasks/task1/task1-game-button-bottom-right-active.svg";
import rightBottom from "../../assets/img/tasks/task1/task1-game-button-bottom-right.svg";
import leftTopActive from "../../assets/img/tasks/task1/task1-game-button-top-left-active.svg";
import leftTop from "../../assets/img/tasks/task1/task1-game-button-top-left.svg";
import rightTopActive from "../../assets/img/tasks/task1/task1-game-button-top-right-active.svg";
import rightTop from "../../assets/img/tasks/task1/task1-game-button-top-right.svg";
import game1Title from "../../assets/img/tasks/task1/task1-header-title.png";
import onboardingStep1 from "../../assets/img/tasks/task1/task1-onboarding1.png";
import onboardingStep2 from "../../assets/img/tasks/task1/task1-onboarding2.png";
import onboardingStep3 from "../../assets/img/tasks/task1/task1-onboarding3.png";
import onboardingStep4 from "../../assets/img/tasks/task1/task1-onboarding4.png";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import { GameDone } from "../../components/GameDone/GameDone";
import { GameFailed } from "../../components/GameFailed/GameFailed";
import css from "./Game1.module.css";

// Импортируем звуковые файлы
import { checkQuest } from "../../api/user/checkQuest";
import { preloadImages } from "../../helpers/preloadImages";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";

type GameStatus = "idle" | "playing" | "waitingInput" | "finished";
type ButtonId = "left-top" | "right-top" | "left-bottom" | "right-bottom";

export const Game1: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const currentTask = useAppSelector(selectTasks).find(task=>task?.id === 1)
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [muted, setMuted] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);
    const [sequence, setSequence] = useState<ButtonId[]>([]);
    const [userInput, setUserInput] = useState<ButtonId[]>([]);
    const [level, setLevel] = useState(1);
    const [lives, setLives] = useState(3);
    const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
    const [activeButton, setActiveButton] = useState<ButtonId | null>(null);
    const [isCelebrating, setIsCelebrating] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiSize, setConfettiSize] = useState({ width: 0, height: 0 });
    const [isError, setIsError] = useState(false);
    const platform = usePlatform()
    const dispatch = useAppDispatch();

    const [audioElements] = useState<Record<ButtonId, HTMLAudioElement>>(
        () => ({
            "left-top": new Audio(
                "https://finnik2.ilovebot.ru/assets/sample1.mp3"
            ),
            "right-top": new Audio(
                "https://finnik2.ilovebot.ru/assets/sample2.mp3"
            ),
            "left-bottom": new Audio(
                "https://finnik2.ilovebot.ru/assets/sample3.mp3"
            ),
            "right-bottom": new Audio(
                "https://finnik2.ilovebot.ru/assets/sample4.mp3"
            ),
        })
    );

    // Инициализация размеров для конфетти
    useEffect(() => {
        const updateSize = () => {
            setConfettiSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", updateSize);
        updateSize();

        const images = [
            lifeIcon,
            note,
            pauseIcon,
            playIcon,
            reloadIcon,
            leftBottomActive,
            leftBottom,
            rightBottomActive,
            rightBottom,
            leftTopActive,
            leftTop,
            rightTopActive,
            rightTop,
            game1Title,
            onboardingStep1,
            onboardingStep2,
            onboardingStep3,
        ];

        preloadImages(images);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Настройка аудио
    useEffect(() => {
        Object.values(audioElements).forEach((audio) => audio.load());
        return () => {
            Object.values(audioElements).forEach((audio) => {
                audio.pause();
                audio.src = "";
            });
        };
    }, [audioElements]);

    useEffect(() => {
        Object.values(audioElements).forEach((audio) => {
            audio.muted = muted;
        });
    }, [muted, audioElements]);

    const generateSequence = useCallback(() => {
        const buttons: ButtonId[] = [
            "left-top",
            "right-top",
            "left-bottom",
            "right-bottom",
        ];
        return Array.from(
            { length: 2 + level },
            () => buttons[Math.floor(Math.random() * buttons.length)]
        );
    }, [level]);

    const initLevel = useCallback(() => {
        setIsCelebrating(false);
        setGameStatus("idle");
        setUserInput([]);
        setSequence(generateSequence());
    }, [generateSequence]);

    const playButtonSound = (buttonId: ButtonId) => {
        if (!muted) {
            const audio = new Audio(audioElements[buttonId].src);
            audio.play().catch(console.error);
        }
    };

    const showErrorAnimation = useCallback(async () => {
        setIsError(true);
        await new Promise((resolve) => setTimeout(resolve, 1900));
        setIsError(false);
    }, []);

    const celebrateSuccess = useCallback(async () => {
        setIsCelebrating(true);
        setShowConfetti(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setShowConfetti(false);
        setIsCelebrating(false);
    }, []);

    const celebrateFinal = useCallback(async () => {
        setIsCelebrating(true);
        setShowConfetti(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setShowConfetti(false);
        setGameStatus("finished");
        await checkQuest(1);
        dispatch(setTaskChecked(1));
        updateTasks();
        routeNavigator.showPopout(
            <GameDone onClick={() => routeNavigator.replace(`/`)} />
        );
    }, [routeNavigator]);

    const playSequence = useCallback(() => {
        if (isCelebrating) return;

        setGameStatus("playing");
        let i = 0;

        const playNextNote = () => {
            if (i >= sequence.length) {
                setIsPlayed(false);
                setGameStatus("waitingInput");
                return;
            }

            const currentButton = sequence[i];
            setActiveButton(currentButton);
            playButtonSound(currentButton);

            setTimeout(() => {
                setActiveButton(null);
                i++;
                setTimeout(playNextNote, 500);
            }, 500);
        };

        playNextNote();
    }, [sequence, isCelebrating, muted, audioElements]);

    const handleButtonClick = (buttonId: ButtonId) => {
        if (gameStatus !== "waitingInput" || isCelebrating) return;

        setUserInput([...userInput, buttonId]);
        setActiveButton(buttonId);
        playButtonSound(buttonId);
        setTimeout(() => setActiveButton(null), 200);
    };

    useEffect(() => {
        if (
            userInput.length === sequence.length &&
            sequence.length > 0 &&
            !isCelebrating &&
            gameStatus === "waitingInput" // Добавляем проверку статуса
        ) {
            const isCorrect = userInput.every(
                (note, i) => note === sequence[i]
            );

            if (isCorrect) {
                if (level < 5) {
                    celebrateSuccess().then(() => {
                        setLevel(level + 1);
                        initLevel();
                    });
                } else {
                    celebrateFinal();
                }
            } else {
                setUserInput([]); // Сбрасываем ввод ДО анимации ошибки
                showErrorAnimation().then(() => {
                    const newLives = lives - 1;
                    setLives(newLives);

                    if (newLives <= 0) {
                        setGameStatus("finished");
                        routeNavigator.showPopout(
                            <GameFailed
                                reloadHandler={() => {
                                    routeNavigator.hidePopout();
                                    reloadGame(); // Добавляем перезагрузку
                                }}
                                backHandler={() => routeNavigator.replace(`/`)}
                            />
                        );
                    } else {
                        playSequence(); // Перезапускаем последовательность
                    }
                });
            }
        }
    }, [userInput, sequence, level, lives, gameStatus, isCelebrating]);

    const handlePlayClick = () => {
        if (isCelebrating) return;

        if (gameStatus === "idle") {
            setIsPlayed(true);
            playSequence();
        } else if (gameStatus === "playing") {
            setIsPlayed(false);
        } else if (gameStatus === "waitingInput") {
            setIsPlayed(true);
            playSequence();
        } else {
            setIsPlayed(false);
            setGameStatus("idle");
        }
    };

    useEffect(() => {
        initLevel();
    }, [initLevel]);

    const reloadGame = useCallback(() => {
        setLevel(1);
        setLives(3); // или начальное количество жизней
        setGameStatus("idle");
        setUserInput([]);
        setSequence([]);
        setActiveButton(null);
        setIsCelebrating(false);
        setShowConfetti(false);
        setIsError(false);
        setIsPlayed(false);
        initLevel(); // переинициализируем уровень
    }, [initLevel]);

    const getButtonImage = (buttonId: ButtonId) => {
        const isActive = activeButton === buttonId;
        switch (buttonId) {
            case "left-top":
                return isActive ? leftTopActive : leftTop;
            case "right-top":
                return isActive ? rightTopActive : rightTop;
            case "left-bottom":
                return isActive ? leftBottomActive : leftBottom;
            case "right-bottom":
                return isActive ? rightBottomActive : rightBottom;
            default:
                return "";
        }
    };

    const onboardingSteps = [
        <div className={css["onboarding-step1"]}>
            <img width={195} src={onboardingStep1} alt="" />
        </div>,
        <div className={css["onboarding-step2"]}>
            <img width={350} src={onboardingStep2} alt="" />
        </div>,
        <div className={css["onboarding-step3"]}>
            <img width={350} src={onboardingStep3} alt="" />
        </div>,
        <div className={css["onboarding-step4"]}>
            <img width={240} src={onboardingStep4} alt="" />
        </div>,
    ];

    useEffect(() => {
        if (onboardingStep < 4) {
            routeNavigator.showPopout(
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
                                    ? "Начать игру"
                                    : "Продолжить"}
                            </span>
                        </Button>
                    </div>
                </PopoutWrapper>
            );
        } else {
            routeNavigator.hidePopout();
        }
    }, [onboardingStep]);

    useEffect(()=>{
        if(currentTask?.checked || !currentTask?.active){
            routeNavigator.replace(`/`)
        }
    },[])

    const getGameFieldClasses = () =>
        classNames(css["game-field"], isError && css["game-field__error"]);

    return (
        <Panel id={id} disableBackground className={classNames(css["game-panel"])}>
            {showConfetti && (
                <Confetti
                    width={confettiSize.width}
                    height={confettiSize.height}
                    recycle={false}
                    numberOfPieces={400}
                    gravity={0.5}
                    tweenDuration={900}
                />
            )}

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
                <img src={game1Title} width={166} alt="" />
            </CustomPanelHeader>

            <div className={classNames(css["game-start-panel__content"], css[`game-start-panel__content_platform_${platform}`])}>
                <Div>
                    <div className={css["game-field-wrapper"]}>
                        <div className={getGameFieldClasses()}>
                            <div
                                className={classNames(
                                    css["game-field__left-top"],
                                    activeButton === "left-top" &&
                                        css["game-field__button_active"]
                                )}
                                onClick={() => handleButtonClick("left-top")}
                            >
                                <img src={getButtonImage("left-top")} alt="" />
                            </div>
                            <div
                                className={classNames(
                                    css["game-field__right-top"],
                                    activeButton === "right-top" &&
                                        css["game-field__button_active"]
                                )}
                                onClick={() => handleButtonClick("right-top")}
                            >
                                <img src={getButtonImage("right-top")} alt="" />
                            </div>
                            <div
                                className={classNames(
                                    css["game-field__left-bottom"],
                                    activeButton === "left-bottom" &&
                                        css["game-field__button_active"]
                                )}
                                onClick={() => handleButtonClick("left-bottom")}
                            >
                                <img
                                    src={getButtonImage("left-bottom")}
                                    alt=""
                                />
                            </div>
                            <div
                                className={classNames(
                                    css["game-field__right-bottom"],
                                    activeButton === "right-bottom" &&
                                        css["game-field__button_active"]
                                )}
                                onClick={() =>
                                    handleButtonClick("right-bottom")
                                }
                            >
                                <img
                                    src={getButtonImage("right-bottom")}
                                    alt=""
                                />
                            </div>
                            <button
                                className={css["reload-button"]}
                                onClick={handlePlayClick}
                                disabled={isCelebrating}
                            >
                                <img
                                    src={
                                        isPlayed
                                            ? pauseIcon
                                            : gameStatus === "waitingInput"
                                            ? reloadIcon
                                            : playIcon
                                    }
                                    alt=""
                                />
                            </button>
                        </div>
                        <div className={css["game-field-wrapper__stats"]}>
                            <div className={css["game-lifes"]}>
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <img
                                        key={i}
                                        src={lifeIcon}
                                        alt=""
                                        style={{ opacity: i < lives ? 1 : 0.3 }}
                                    />
                                ))}
                            </div>
                            <button
                                className={css["mute-button"]}
                                onClick={() => setMuted(!muted)}
                            >
                                {muted ? (
                                    <Icon24MuteCross fill="#E948A8" />
                                ) : (
                                    <Icon24Volume fill="#E948A8" />
                                )}
                            </button>
                        </div>
                        <Spacing size={30} />
                        <div className={css["game-field-counter"]}>
                            <img src={note} alt="" />
                            <span>{level}/5</span>
                        </div>
                    </div>
                    <Spacing size={30} />
                    <Button
                        color="transparent-dashed"
                        onClick={() => setOnboardingStep(0)}
                    >
                        Как играть?
                    </Button>
                </Div>
            </div>
        </Panel>
    );
};
