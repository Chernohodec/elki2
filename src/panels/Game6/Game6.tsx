import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    FixedLayout,
    NavIdProps,
    Panel,
    usePlatform,
} from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import Confetti from "react-confetti";
import "swiper/css";
import { Button } from "../../components/Button/Button";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameDone } from "../../components/GameDone/GameDone";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game6.module.css";

export const Game6: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const dispatch = useAppDispatch();
    const [gameComplete, setGameComplete] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [foundItems, setFoundItems] = useState<number[]>([]);
    const platform = usePlatform();
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 6
    );

    useEffect(() => {
        if (!currentTask?.active) {
            routeNavigator.replace(`/`);
        }
    }, []);

    const completeTask = () => {
        // checkQuest(6).then(() => {
        //     updateTasks();
        // });
        dispatch(setTaskChecked(6));
        setGameComplete(true);
        setShowConfetti(true);
    };

    return (
        <Panel id={id} disableBackground className={css["game-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.showModal(DEFAULT_VIEW_MODALS.CLOSE_MODAL);
                }}
                title="Найди отличия"
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
                    <Div className={css["game-area"]}>
                        <div className={css["game-area__pic1"]}></div>
                        <div className={css["game-area__counter"]}>
                            {foundItems.length}/5
                        </div>
                        <div className={css["game-area__pic2"]}>
                            <button
                                className={classNames(
                                    css["game-area__item"],
                                    css["game-area__item_order_1"],
                                    foundItems.includes(1) &&
                                        css["game-area__item_active"]
                                )}
                                onClick={() => {
                                    !foundItems.includes(1) &&
                                        setFoundItems([...foundItems, 1]);
                                }}
                            ></button>
                            <button
                                className={classNames(
                                    css["game-area__item"],
                                    css["game-area__item_order_2"],
                                    foundItems.includes(2) &&
                                        css["game-area__item_active"]
                                )}
                                onClick={() => {
                                    !foundItems.includes(2) &&
                                        setFoundItems([...foundItems, 2]);
                                }}
                            ></button>
                            <button
                                className={classNames(
                                    css["game-area__item"],
                                    css["game-area__item_order_3"],
                                    foundItems.includes(3) &&
                                        css["game-area__item_active"]
                                )}
                                onClick={() => {
                                    !foundItems.includes(3) &&
                                        setFoundItems([...foundItems, 3]);
                                }}
                            ></button>
                            <button
                                className={classNames(
                                    css["game-area__item"],
                                    css["game-area__item_order_4"],
                                    foundItems.includes(4) &&
                                        css["game-area__item_active"]
                                )}
                                onClick={() => {
                                    !foundItems.includes(4) &&
                                        setFoundItems([...foundItems, 4]);
                                }}
                            ></button>
                            <button
                                className={classNames(
                                    css["game-area__item"],
                                    css["game-area__item_order_5"],
                                    foundItems.includes(5) &&
                                        css["game-area__item_active"]
                                )}
                                onClick={() => {
                                    !foundItems.includes(5) &&
                                        setFoundItems([...foundItems, 5]);
                                }}
                            ></button>
                        </div>
                    </Div>
                ) : (
                    <GameDone text="Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie." />
                )}
            </div>
            <FixedLayout vertical="bottom">
                <Div style={{paddingLeft: 22, paddingRight: 22}}>
                    {!gameComplete ? (
                        <Button
                            disabled={foundItems.length !== 5}
                            color="yellow"
                            onClick={completeTask}
                        >
                            Продолжить
                        </Button>
                    ) : (
                        <Button
                            color="yellow"
                            onClick={() => routeNavigator.replace("/")}
                        >
                            К заданиям
                        </Button>
                    )}
                </Div>
            </FixedLayout>
        </Panel>
    );
};
