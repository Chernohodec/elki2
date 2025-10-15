import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    NavIdProps,
    Panel,
    Spacing,
    usePlatform,
} from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import css from "./Game1.module.css";

// Импортируем звуковые файлы
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks } from "../../store/tasks.reducer";
import { Title } from "../../components/Title/Title";
import { Button } from "../../components/Button/Button";

export type GameProps = {
    id: number;
    updateTasks: () => void;
};

export const Game1: FC<GameProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const [currentStep, setCurrentStep] = useState(0);
    const [input1, setInput1] = useState("Выберите вариант");
    const [input2, setInput2] = useState("Выберите вариант");
    const [input1IsOpen, setInput1IsOpen] = useState(false);
    const [input2IsOpen, setInput2IsOpen] = useState(false);
    const [input3, setInput3] = useState("");
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
        if (currentTask?.checked || !currentTask?.active) {
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

    return (
        <Panel
            id={id}
            disableBackground
            className={classNames(css["game-panel"])}
        >
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.showPopout(
                        <GameCancel
                            reloadHandler={() => routeNavigator.hidePopout()}
                            backHandler={() => routeNavigator.replace(`/`)}
                        />
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
                {currentStep === 0 && (
                    <div className={css["mail-game"]}>
                        <div className={css["letter"]}>
                            <Title size="medium" align="center">
                                Дорогой дедушка мороз, <br />в этот год я вел
                                (а) себя
                            </Title>
                            <Spacing size={10} />
                            <div
                                className={css["custom-select"]}
                            >
                                <div
                                    onClick={() => setInput1IsOpen(true)}
                                    className={css["custom-select__main-value"]}
                                >
                                    <Title
                                        size="medium"
                                        color="grey"
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
                                                css["custom-select__button"],
                                                input1 === "Хорошо" &&
                                                    css[
                                                        "custom-select__button_active"
                                                    ]
                                            )}
                                            onClick={() => {
                                                setInput1("Хорошо");
                                                setInput1IsOpen(false);
                                            }}
                                        >
                                            <Title
                                                size="medium"
                                                color={
                                                    input1 === "Хорошо"
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
                                                css["custom-select__button"],
                                                input1 === "Плохо" &&
                                                    css[
                                                        "custom-select__button_active"
                                                    ]
                                            )}
                                            onClick={() => {
                                                setInput1("Плохо");
                                                setInput1IsOpen(false);
                                            }}
                                        >
                                            <Title
                                                size="medium"
                                                color={
                                                    input1 === "Плохо"
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
                                                css["custom-select__button"],
                                                input1 === "Нормально" &&
                                                    css[
                                                        "custom-select__button_active"
                                                    ]
                                            )}
                                            onClick={() => {
                                                setInput1("Нормально");
                                                setInput1IsOpen(false);
                                            }}
                                        >
                                            <Title
                                                size="medium"
                                                color={
                                                    input1 === "Нормально"
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
                                Я сделал много разных
                                <br />
                                дел например:
                            </Title>
                            <Spacing size={10} />
                            <div className={css["custom-select"]}>
                                <div
                                    onClick={() => setInput2IsOpen(true)}
                                    className={css["custom-select__main-value"]}
                                >
                                    <Title
                                        size="medium"
                                        color="grey"
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
                                                css["custom-select__button"],
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
                                                css["custom-select__button"],
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
                                                css["custom-select__button"],
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
                                Поэтому я хочу получить:
                            </Title>
                            <Spacing size={10} />
                            <input
                                placeholder="Начните вводить"
                                onChange={(e) => setInput3(e.target.value)}
                                className={css["text-input"]}
                                type="text"
                                maxLength={30}
                            />
                            <Button
                                disabled={!formIsValid}
                                className={css["letter__submit"]}
                                color="yellow"
                                onClick={submitMail}
                            >
                                Отправить
                            </Button>
                        </div>
                    </div>
                )}
                {currentStep === 1 && (
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
                    </div>
                )}
                {currentStep === 2 && (
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
                        <Button
                            color="yellow"
                            onClick={() => setCurrentStep(3)}
                        >
                            Открыть конверт
                        </Button>
                    </div>
                )}
                {currentStep === 3 && (
                    <div className={css["mail-game"]}>
                        <div className={css["letter"]}>
                            <Title align="center">Привет Иван</Title>
                            <Spacing size={10} />
                            <Title color="black" size="medium" align="center">
                                Lorem ipsum dolor sit amet consectetur. Ipsum id
                                velit odio rutrum tortor nibh nisl. Elementum
                                enim condimentum euismod commodo id. Purus eget
                                cursus sit tortor justo amet. Tempus nullam
                                sodales leo fringilla commodo donec justo massa
                                sed. Etiam massa et at est condimentum nec
                                natoque.
                            </Title>
                            <Button
                                className={css["letter__submit"]}
                                color="yellow"
                                // onClick={submitMail}
                            >
                                Продолжить
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Panel>
    );
};
