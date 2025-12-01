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
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { checkQuest } from "../../api/user/checkQuest";
import { postStat } from "../../api/user/postStat";
import { Button } from "../../components/Button/Button";
import { GameDone } from "../../components/GameDone/GameDone";
import { Title } from "../../components/Title/Title";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskCompleted } from "../../store/tasks.reducer";

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
    const [startTime, setStartTime] = useState<number | null>(null);
    const formIsValid =
        input1 !== "Выберите вариант" &&
        input2 !== "Выберите вариант" &&
        input3;
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 1
    );
    const platform = usePlatform();
    const dispatch = useAppDispatch();
    const [userInfo, setUserInfo] = useState<UserInfo>();

    const results = [
        {
            id: 1,
            value: "хорошо и послушно",
            text: (
                <>
                    Ох,&nbsp;как радостно мне стало от&nbsp;мысли, что
                    ты&nbsp;посвящаешь себя хорошим поступкам. Это достойно
                    восхищения!
                </>
            ),
        },
        {
            id: 2,
            value: "лучше, чем в прошлом",
            text: (
                <>
                    Весь год я&nbsp;с&nbsp;интересом наблюдал за&nbsp;тобой
                    и&nbsp;хочу сказать: не&nbsp;переставай стремиться
                    к&nbsp;добру. Именно хорошие поступки делают мир таким
                    сказочным и&nbsp;чудесным.
                </>
            ),
        },
        {
            id: 3,
            value: "плохо (и не горжусь)",
            text: (
                <>
                    Знаю, твой год выдался непростым. Не&nbsp;всегда всё
                    складывается так, как нам хочется. Но&nbsp;не&nbsp;спеши
                    вешать нос: каждый день даёт возможность совершить поступки,
                    которыми можно гордиться.
                </>
            ),
        },
        {
            id: 4,
            value: "много помогать",
            text: (
                <>
                    Дарить заботу и&nbsp;радость от&nbsp;чистого
                    сердца&nbsp;&mdash; это и&nbsp;есть настоящее волшебство.
                    Продолжай в&nbsp;том&nbsp;же духе, и&nbsp;каждая искорка
                    доброты вернётся к&nbsp;тебе с&nbsp;лихвой, наполняя жизнь
                    светом и&nbsp;теплом.
                </>
            ),
        },
        {
            id: 5,
            value: "найти новое хобби",
            text: (
                <>
                    Здорово, что в&nbsp;тебе живёт дух истинного исследователя.
                    Продолжай заниматься любимыми делами и&nbsp;смело открывай
                    новые. Пусть каждый день станет для тебя маленьким
                    праздником!
                </>
            ),
        },
        {
            id: 6,
            value: "перестать лениться",
            text: (
                <>
                    Любая работа над собой воздаётся сторицей.
                    Сегодня&nbsp;&mdash; маленький шаг, а&nbsp;через
                    неделю&nbsp;&mdash; уже самая настоящая тропинка, что
                    уж&nbsp;говорить о&nbsp;целом годе. Так держать!
                </>
            ),
        },
    ];

    const getResultText = (input1: string, input2: string) => {
        const text1 = results.find((result) => result?.value === input1)?.text;
        const text2 = results.find((result) => result?.value === input2)?.text;
        return (
            <>
                {text1}
                <br />
                {text2}
            </>
        );
    };

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
        const completionTime = Date.now();
        const totalTime = (completionTime - startTime) / 1000;
        checkQuest(1).then(() => {
            updateTasks();
            postStat({
                name: "game1",
                data: {
                    input1: input1,
                    input2: input2,
                    input3: input3,
                    timespent: totalTime,
                },
            });
        });
        dispatch(setTaskCompleted(1));
        setGameComplete(true);
        setShowConfetti(true);
    };

    useEffect(() => {
        bridge.send("VKWebAppGetUserInfo", {}).then((data) => {
            if (data.id) {
                // Данные пользователя получены
                // console.log(data);
                setUserInfo(data);
            }
        });

        setStartTime(Date.now());
        if (currentTask?.completed || !currentTask?.is_active) {
            routeNavigator.replace(`/`);
        }
    }, []);

    return (
        <Panel
            id={id}
            disableBackground
            className={classNames(css["game-panel"])}
        >
            <CustomPanelHeader
                onBackClick={() => {
                    gameComplete
                        ? routeNavigator.replace("/")
                        : routeNavigator.showModal(
                              DEFAULT_VIEW_MODALS.CLOSE_MODAL
                          );
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
                    className={css["motion-wrapper"]}
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
                        <GameDone text="Ура, Ваня стал на шаг ближе к Великому Устюгу! Впереди его ждут новые приключения, а вас — увлекательные задания." />
                    ) : currentStep === 0 ? (
                        <div className={css["mail-game"]}>
                            <div className={css["letter"]}>
                                <Title size="medium" align="center">
                                    Здравствуй, Дедушка Мороз!
                                    <br />В этом году я&nbsp;
                                    {userInfo?.sex === 1 ? "вела" : "вёл"} себя
                                </Title>
                                <Spacing size={10} />
                                <div className={css["custom-select"]}>
                                    <div
                                        onClick={() => {
                                            setInput1IsOpen(!input1IsOpen);
                                            setInput2IsOpen(false);
                                        }}
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
                                <Spacing size={30} />
                                <Title size="medium" align="center">
                                    У МЕНЯ СТОЛЬКО ВСЕГО ПОЛУЧИЛОСЬ СДЕЛАТЬ,
                                    НАПРИМЕР
                                </Title>
                                <Spacing size={10} />
                                <div className={css["custom-select"]}>
                                    <div
                                        onClick={() => {
                                            setInput2IsOpen(!input2IsOpen);
                                            setInput1IsOpen(false);
                                        }}
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
                                                    input2 ===
                                                        "много помогать" &&
                                                        css[
                                                            "custom-select__button_active"
                                                        ]
                                                )}
                                                onClick={() => {
                                                    setInput2("много помогать");
                                                    setInput2IsOpen(false);
                                                }}
                                            >
                                                <Title
                                                    size="medium"
                                                    color={
                                                        input2 ===
                                                        "много помогать"
                                                            ? "white"
                                                            : "red"
                                                    }
                                                    align="center"
                                                >
                                                    много помогать
                                                </Title>
                                            </button>
                                            <button
                                                className={classNames(
                                                    css[
                                                        "custom-select__button"
                                                    ],
                                                    input2 ===
                                                        "найти новое хобби" &&
                                                        css[
                                                            "custom-select__button_active"
                                                        ]
                                                )}
                                                onClick={() => {
                                                    setInput2(
                                                        "найти новое хобби"
                                                    );
                                                    setInput2IsOpen(false);
                                                }}
                                            >
                                                <Title
                                                    size="medium"
                                                    color={
                                                        input2 ===
                                                        "найти новое хобби"
                                                            ? "white"
                                                            : "red"
                                                    }
                                                    align="center"
                                                >
                                                    найти новое хобби
                                                </Title>
                                            </button>
                                            <button
                                                className={classNames(
                                                    css[
                                                        "custom-select__button"
                                                    ],
                                                    input2 ===
                                                        "перестать лениться" &&
                                                        css[
                                                            "custom-select__button_active"
                                                        ]
                                                )}
                                                onClick={() => {
                                                    setInput2(
                                                        "перестать лениться"
                                                    );
                                                    setInput2IsOpen(false);
                                                }}
                                            >
                                                <Title
                                                    size="medium"
                                                    color={
                                                        input2 ===
                                                        "перестать лениться"
                                                            ? "white"
                                                            : "red"
                                                    }
                                                    align="center"
                                                >
                                                    перестать лениться
                                                </Title>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <Spacing size={30} />
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
                            <Title
                                color="yellow"
                                align="center"
                                className={css["mail-sending__text"]}
                            >
                                Отправляем письмо
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
                                        Здравствуй, {userInfo?.first_name}
                                    </Title>
                                    <Spacing size={10} />
                                    <Title
                                        color="black"
                                        size="medium"
                                        align="center"
                                        className={css["letter__result"]}
                                    >
                                        {getResultText(input1, input2)}
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
                <Div style={{ padding: 22 }}>
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
