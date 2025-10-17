import {
    useMetaParams,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    ModalCard,
    NavIdProps,
    Spacing,
} from "@vkontakte/vkui";
import React from "react";
import { useAppSelector } from "../store";
import {} from "../store/main.reducer";
import { selectTasks } from "../store/tasks.reducer";
import css from "./modals.module.css";
import { Title } from "../components/Title/Title";
import { Text } from "../components/Text/Text";
import { Button } from "../components/Button/Button";

const TaskModal: React.FC<NavIdProps & { onClose: () => void }> = (props) => {
    const routeNavigator = useRouteNavigator();

    const params = useMetaParams<{ action: string; value: number }>();
    const tasks = useAppSelector(selectTasks);
    const currentTask = tasks.find((task) => task.id === params?.value);

    return (
        <ModalCard className={css["modal"]} {...props} onClose={props.onClose}>
            {currentTask && (
                <div className={css["modal__content"]}>
                    <div className={css["modal__image-wrapper"]}>
                        <div
                            className={classNames(
                                css["modal__image"],
                                css[`modal__image_type_${currentTask.type}`]
                            )}
                        >
                            <img
                                className={css["modal__image-pic"]}
                                width={120}
                                src={`assets/img/tasks/task${currentTask.id}-icon.png`}
                                alt=""
                            />
                            <div
                                className={classNames(
                                    css["modal__character"],
                                    css[
                                        `modal__character_type_${currentTask.type}`
                                    ]
                                )}
                            >
                                <img
                                    src={`assets/img/${currentTask.type}-icon.png`}
                                    width={30}
                                    alt=""
                                />
                                <Title size="small" color="red-black">
                                    {currentTask.type === "parent"
                                        ? "Родители"
                                        : "Ваня"}
                                </Title>
                            </div>
                        </div>
                    </div>
                    <Spacing size={35} />
                    <Title align="center">{currentTask?.name}</Title>
                    <Spacing size={5} />
                    <Text align="center">{currentTask?.text}</Text>
                    <Spacing size={35} />
                    <Button
                        onClick={() =>
                            routeNavigator.push(`/game${currentTask?.id}_start`)
                        }
                    >
                        Продолжить
                    </Button>
                </div>
            )}
        </ModalCard>
    );
};

export { TaskModal };
