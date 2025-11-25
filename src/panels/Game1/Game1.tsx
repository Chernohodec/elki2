import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    FixedLayout,
    Panel,
    Spacing,
    usePlatform,
} from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import css from "./Game1.module.css";

// Импортируем звуковые файлы
import Confetti from "react-confetti";
import { Button } from "../../components/Button/Button";
import { GameDone } from "../../components/GameDone/GameDone";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskCompleted } from "../../store/tasks.reducer";
import { checkQuest } from "../../api/user/checkQuest";
import { motion } from "framer-motion";

export type GameProps = {
    id: number;
    updateTasks: () => void;
};

export const Game1: FC<GameProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const [currentStep, setCurrentStep] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const [input1, setInput1] = useState("Выберите вариант");
    const [input2, setInput2] = useState("Выберите вариант");
    const [input1IsOpen, setInput1IsOpen] = useState(false);
    const [input2IsOpen, setInput2IsOpen] = useState(false);
    const [input3, setInput3] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);
    const formIsValid =
        input1 !== "Выберите вариант" &&
        input2 !== "Выберите вариант" &&
        input3;
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 1
    );
    const platform = usePlatform();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentTask?.completed || !currentTask?.is_active) {
            routeNavigator.replace(`/`);
        }
    }, []);

    useEffect(() => {
        if (currentStep === 1) {
            const timer = setTimeout(() => {
                setCurrentStep(2);
            }, 3000);
        }
    }, [currentStep]);

    const submitMail = () => {
        setCurrentStep(currentStep + 1);
    };

    const completeTask = () => {
        checkQuest(1).then(() => {
            updateTasks();
        });
        dispatch(setTaskCompleted(1));
        setGameComplete(true);
        setShowConfetti(true);
    };

    return (
        <Panel
            id={id}
            disableBackground
            className={classNames(css["game-panel"])}
        >
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.showModal(DEFAULT_VIEW_MODALS.CLOSE_MODAL);
                }}
                title="Письмо деду морозу"
            ></CustomPanelHeader>

            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
                <motion.div
                    key={[currentStep, showConfetti, gameComplete]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {showConfetti && (
                        <Confetti
                            recycle={false}
                            numberOfPieces={200}
                            gravity={0.6}
                            tweenDuration={200}
                            className={css["game-start-panel__confetti"]}
                        />
                    )}
                    {gameComplete ? (
                        <GameDone text="Ура, Ваня стал на шаг ближе к Великому Устюгу! Впереди его ждут новые приключения, а вас — увлекательные задания." />
                    ) : currentStep === 0 ? (
                        <div className={css["mail-game"]}>
                            <div className={css["letter"]}>
                                <Title size="medium" align="center">
                                    Здравствуй, Дедушка Мороз!
                                    <br />В этом году я вел(а) себя
                                </Title>
                                <Spacing size={10} />
                                <div className={css["custom-select"]}>
                                    <div
                                        onClick={() =>
                                            setInput1IsOpen(!input1IsOpen)
                                        }
                                        className={
                                            css["custom-select__main-value"]
                                        }
                                    >
                                        <Title
                                            size="medium"
                                            color={
                                                input1 === "Выберите вариант"
                                                    ? "grey"
                                                    : "black"
                                            }
                                            align="center"
                                        >
                                            {input1}
                                        </Title>
                                    </div>
                                    {input1IsOpen && (
                                        <div
                                            className={
                                                css["custom-select__dropdown"]
                                            }
                                        >
                                            <button
                                                className={classNames(
                                                    css[
                                                        "custom-select__button"
                                                    ],
                                                    input1 ===
                                                        "хорошо и послушно" &&
                                                        css[
                                                            "custom-select__button_active"
                                                        ]
                                                )}
                                                onClick={() => {
                                                    setInput1(
                                                        "хорошо и послушно"
                                                    );
                                                    setInput1IsOpen(false);
                                                }}
                                            >
                                                <Title
                                                    size="medium"
                                                    color={
                                                        input1 ===
                                                        "хорошо и послушно"
                                                            ? "white"
                                                            : "red"
                                                    }
                                                    align="center"
                                                >
                                                    хорошо и послушно
                                                </Title>
                                            </button>
                                            <button
                                                className={classNames(
                                                    css[
                                                        "custom-select__button"
                                                    ],
                                                    input1 ===
                                                        "лучше, чем в прошлом" &&
                                                        css[
                                                            "custom-select__button_active"
                                                        ]
                                                )}
                                                onClick={() => {
                                                    setInput1(
                                                        "лучше, чем в прошлом"
                                                    );
                                                    setInput1IsOpen(false);
                                                }}
                                            >
                                                <Title
                                                    size="medium"
                                                    color={
                                                        input1 ===
                                                        "лучше, чем в прошлом"
                                                            ? "white"
                                                            : "red"
                                                    }
                                                    align="center"
                                                >
                                                    лучше, чем в прошлом
                                                </Title>
                                            </button>
                                            <button
                                                className={classNames(
                                                    css[
                                                        "custom-select__button"
                                                    ],
                                                    input1 ===
                                                        "плохо (и не горжусь)" &&
                                                        css[
                                                            "custom-select__button_active"
                                                        ]
                                                )}
                                                onClick={() => {
                                                    setInput1(
                                                        "плохо (и не горжусь)"
                                                    );
                                                    setInput1IsOpen(false);
                                                }}
                                            >
                                                <Title
                                                    size="medium"
                                                    color={
                                                        input1 ===
                                                        "плохо (и не горжусь)"
                                                            ? "white"
                                                            : "red"
                                                    }
                                                    align="center"
                                                >
                                                    плохо (и не горжусь)
                                                </Title>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <Spacing size={20} />
                                <Title size="medium" align="center">
                                    У МЕНЯ СТОЛЬКО ВСЕГО ПОЛУЧИЛОСЬ СДЕЛАТЬ,
                                    НАПРИМЕР
                                </Title>
                                <Spacing size={10} />
                                <div className={css["custom-select"]}>
                                    <div
                                        onClick={() =>
                                            setInput2IsOpen(!input2IsOpen)
                                        }
                                        className={
                                            css["custom-select__main-value"]
                                        }
                                    >
                                        <Title
                                            size="medium"
                                            color={
                                                input2 === "Выберите вариант"
                                                    ? "grey"
                                                    : "black"
                                            }
                                            align="center"
                                        >
                                            {input2}
                                        </Title>
                                    </div>
                                    {input2IsOpen && (
                                        <div
                                            className={
                                                css["custom-select__dropdown"]
                                            }
                                        >
                                            <button
                                                className={classNames(
                                                    css[
                                                        "custom-select__button"
                                                    ],
                                                    input2 === "Хорошо" &&
                                                        css[
                                                            "custom-select__button_active"
                                                        ]
                                                )}
                                                onClick={() => {
                                                    setInput2("Хорошо");
                                                    setInput2IsOpen(false);
                                                }}
                                            >
                                                <Title
                                                    size="medium"
                                                    color={
                                                        input2 === "Хорошо"
                                                            ? "white"
                                                            : "red"
                                                    }
                                                    align="center"
                                                >
                                                    Хорошо
                                                </Title>
                                            </button>
                                            <button
                                                className={classNames(
                                                    css[
                                                        "custom-select__button"
                                                    ],
                                                    input2 === "Плохо" &&
                                                        css[
                                                            "custom-select__button_active"
                                                        ]
                                                )}
                                                onClick={() => {
                                                    setInput2("Плохо");
                                                    setInput2IsOpen(false);
                                                }}
                                            >
                                                <Title
                                                    size="medium"
                                                    color={
                                                        input2 === "Плохо"
                                                            ? "white"
                                                            : "red"
                                                    }
                                                    align="center"
                                                >
                                                    Плохо
                                                </Title>
                                            </button>
                                            <button
                                                className={classNames(
                                                    css[
                                                        "custom-select__button"
                                                    ],
                                                    input2 === "Нормально" &&
                                                        css[
                                                            "custom-select__button_active"
                                                        ]
                                                )}
                                                onClick={() => {
                                                    setInput2("Нормально");
                                                    setInput2IsOpen(false);
                                                }}
                                            >
                                                <Title
                                                    size="medium"
                                                    color={
                                                        input2 === "Нормально"
                                                            ? "white"
                                                            : "red"
                                                    }
                                                    align="center"
                                                >
                                                    Нормально
                                                </Title>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <Spacing size={20} />
                                <Title size="medium" align="center">
                                    ПОЭТОМУ, ПОЖАЛУЙСТА, ПОДАРИ МНЕ
                                </Title>
                                <Spacing size={10} />
                                <input
                                    placeholder="Начните вводить"
                                    onChange={(e) => setInput3(e.target.value)}
                                    className={css["text-input"]}
                                    type="text"
                                    maxLength={30}
                                />
                            </div>
                        </div>
                    ) : currentStep === 1 ? (
                        <div className={css["mail-sending"]}>
                            <img
                                className={css["mail-sending__pic"]}
                                width={208}
                                height={208}
                                src="assets/img/tasks/task1/mail-pic.png"
                                alt=""
                            />
                            <Spacing size={90} />
                            <Title color="yellow" align="center">
                                Отправляем письмо...
                            </Title>
                            <Spacing size={90} />
                        </div>
                    ) : currentStep === 2 ? (
                        <div className={css["mail-sent"]}>
                            <Title color="yellow" align="center">
                                Пришло ответное письмо!
                            </Title>
                            <img
                                className={css["mail-sent__pic"]}
                                width={280}
                                src="assets/img/tasks/task1/mail-sent-pic.png"
                                alt=""
                            />
                            <Spacing size={90} />
                        </div>
                    ) : (
                        currentStep === 3 && (
                            <div className={css["mail-game"]}>
                                <div className={css["letter"]}>
                                    <Title align="center">
                                        Здравствуй Иван
                                    </Title>
                                    <Spacing size={10} />
                                    <Title
                                        color="black"
                                        size="medium"
                                        align="center"
                                    >
                                        Ох как радостно мне стало от мысли,
                                        что ты посвящаешь себя хорошим
                                        поступкам. Это достойно восхищения!
                                        Грядущий год подарит ещё больше
                                        счастливых и по‑настоящему волшебных
                                        моментов. Встречай их с улыбкой
                                        и открытым сердцем — и всё непременно
                                        сбудется. С наступающим Новым годом,
                                        мой дорогой друг.
                                        <br />
                                        <br />
                                        Искренне твой,
                                        <br />
                                        Дед Мороз
                                    </Title>
                                </div>
                            </div>
                        )
                    )}
                </motion.div>
            </div>
            <FixedLayout vertical="bottom">
                <Div style={{ paddingLeft: 22, paddingRight: 22 }}>
                    {gameComplete ? (
                        <Button
                            color="yellow"
                            className={css["letter__submit"]}
                            onClick={() => routeNavigator.replace("/")}
                        >
                            К заданиям
                        </Button>
                    ) : currentStep === 0 ? (
                        <Button
                            disabled={!formIsValid}
                            className={css["letter__submit"]}
                            color="yellow"
                            onClick={submitMail}
                        >
                            Отправить
                        </Button>
                    ) : currentStep === 1 ? (
                        <></>
                    ) : currentStep === 2 ? (
                        <Button
                            color="yellow"
                            className={css["letter__submit"]}
                            onClick={() => setCurrentStep(3)}
                        >
                            Открыть конверт
                        </Button>
                    ) : (
                        <Button
                            color="yellow"
                            className={css["letter__submit"]}
                            onClick={completeTask}
                        >
                            Продолжить
                        </Button>
                    )}
                </Div>
            </FixedLayout>
        </Panel>
    );
};
