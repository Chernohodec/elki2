import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    classNames,
    Div,
    NavIdProps,
    Panel,
    Spacing,
    usePlatform,
} from "@vkontakte/vkui";
import { FC, useEffect, useRef, useState, useCallback } from "react";
import { checkQuest } from "../../api/user/checkQuest";
import part1 from "../../assets/img/tasks/task3/1.png";
import part2 from "../../assets/img/tasks/task3/2.png";
import part3 from "../../assets/img/tasks/task3/3.png";
import part4 from "../../assets/img/tasks/task3/4.png";
import part5 from "../../assets/img/tasks/task3/5.png";
import part6 from "../../assets/img/tasks/task3/6.png";
import part7 from "../../assets/img/tasks/task3/7.png";
import part8 from "../../assets/img/tasks/task3/8.png";
import part9 from "../../assets/img/tasks/task3/9.png";
import game3Title from "../../assets/img/tasks/task3/task3-header-title.png";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import { GameDone } from "../../components/GameDone/GameDone";
import { preloadImages } from "../../helpers/preloadImages";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game3.module.css";

interface PuzzlePiece {
    id: number;
    src: string;
    correctPosition: number; // Правильная позиция (1-9)
    currentPosition: number | null; // Текущая позиция (null - внизу)
}

interface DragState {
    piece: PuzzlePiece;
    touchId: number;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    originalElement: HTMLElement;
    isDragging: boolean;
}

// Определяем тип устройства/браузера
const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const isFirefox = () => {
    return navigator.userAgent.toLowerCase().includes("firefox");
};

export const Game3: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const dispatch = useAppDispatch();
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 3
    );
    const [pieces, setPieces] = useState<PuzzlePiece[]>([
        { id: 1, src: part1, correctPosition: 1, currentPosition: null },
        { id: 2, src: part2, correctPosition: 2, currentPosition: null },
        { id: 3, src: part3, correctPosition: 3, currentPosition: null },
        { id: 4, src: part4, correctPosition: 4, currentPosition: null },
        { id: 5, src: part5, correctPosition: 5, currentPosition: null },
        { id: 6, src: part6, correctPosition: 6, currentPosition: null },
        { id: 7, src: part7, correctPosition: 7, currentPosition: null },
        { id: 8, src: part8, correctPosition: 8, currentPosition: null },
        { id: 9, src: part9, correctPosition: 9, currentPosition: null },
    ]);

    const [dragState, setDragState] = useState<DragState | null>(null);
    const fieldRef = useRef<HTMLDivElement>(null);
    const platform = usePlatform();
    const containerRef = useRef<HTMLDivElement>(null);
    const dragImageRef = useRef<HTMLImageElement>(null);

    // Определяем, какой метод перетаскивания использовать
    const shouldUseTouchEvents = isTouchDevice();
    const shouldUseMouseFallback = isFirefox() || !shouldUseTouchEvents;

    // Универсальная функция для получения координат
    const getEventCoordinates = (e: any) => {
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            return {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            };
        } else {
            return { x: e.clientX, y: e.clientY };
        }
    };

    // Предотвращение скролла и зума на мобильных устройствах
    useEffect(() => {
        const preventDefault = (e: Event) => {
            if (dragState?.isDragging) {
                e.preventDefault();
            }
        };

        const options = { passive: false };

        document.addEventListener("touchmove", preventDefault, options);
        document.addEventListener("gesturestart", preventDefault, options);
        document.addEventListener("gesturechange", preventDefault, options);
        document.addEventListener("gestureend", preventDefault, options);

        return () => {
            document.removeEventListener("touchmove", preventDefault);
            document.removeEventListener("gesturestart", preventDefault);
            document.removeEventListener("gesturechange", preventDefault);
            document.removeEventListener("gestureend", preventDefault);
        };
    }, [dragState?.isDragging]);

    // Обработка начала перетаскивания
    const handlePointerStart = useCallback((piece: PuzzlePiece, e: any) => {
        e.preventDefault();
        e.stopPropagation();

        const coords = getEventCoordinates(e);
        const target = e.currentTarget as HTMLElement;

        // Для touch событий получаем touchId, для mouse - используем -1
        const touchId = e.touches ? e.touches[0].identifier : -1;

        const newDragState: DragState = {
            piece,
            touchId,
            startX: coords.x,
            startY: coords.y,
            currentX: coords.x,
            currentY: coords.y,
            originalElement: target,
            isDragging: true,
        };

        setDragState(newDragState);
        target.classList.add(css.dragging);
    }, []);

    // Обработка движения
    const handlePointerMove = useCallback(
        (e: any) => {
            if (!dragState || !dragState.isDragging) return;

            e.preventDefault();
            e.stopPropagation();

            const coords = getEventCoordinates(e);

            // Для touch событий проверяем правильный touchId
            if (e.touches && dragState.touchId !== -1) {
                const touch = Array.from(e.touches).find(
                    (t: any) => t.identifier === dragState.touchId
                );
                if (!touch) return;
            }

            setDragState((prev) =>
                prev
                    ? {
                          ...prev,
                          currentX: coords.x,
                          currentY: coords.y,
                      }
                    : null
            );
        },
        [dragState]
    );

    // Обработка завершения перетаскивания
    const handlePointerEnd = useCallback(
        (e: any) => {
            if (!dragState || !dragState.isDragging || !fieldRef.current) {
                setDragState(null);
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            const coords = getEventCoordinates(e);

            // Для touch событий проверяем правильный touchId
            if (e.changedTouches && dragState.touchId !== -1) {
                const touch = Array.from(e.changedTouches).find(
                    (t: any) => t.identifier === dragState.touchId
                );
                if (!touch) {
                    setDragState(null);
                    return;
                }
            }

            const fieldRect = fieldRef.current.getBoundingClientRect();
            const touchX = coords.x;
            const touchY = coords.y;

            // Проверяем, находится ли точка завершения в области поля
            if (
                touchX >= fieldRect.left &&
                touchX <= fieldRect.right &&
                touchY >= fieldRect.top &&
                touchY <= fieldRect.bottom
            ) {
                const cellSize = fieldRect.width / 3;
                const col = Math.floor((touchX - fieldRect.left) / cellSize);
                const row = Math.floor((touchY - fieldRect.top) / cellSize);
                const position = row * 3 + col + 1;

                if (position >= 1 && position <= 9) {
                    handleDrop(position);
                }
            }

            // Убираем визуальные эффекты
            if (dragState.originalElement) {
                dragState.originalElement.classList.remove(css.dragging);
            }

            setDragState(null);
        },
        [dragState]
    );

    const handleDrop = (position: number) => {
        if (!dragState) return;

        // Проверяем, можно ли разместить этот кусок на этой позиции
        if (dragState.piece.correctPosition === position) {
            setPieces((prevPieces) =>
                prevPieces.map((p) =>
                    p.id === dragState.piece.id
                        ? { ...p, currentPosition: position }
                        : p
                )
            );
        } else {
            // Анимация тряски для неправильного размещения
            const element = document.querySelector(
                `.${css["field-cell_position_" + position]}`
            );
            if (element) {
                element.classList.add(css.shake);
                setTimeout(() => {
                    element.classList.remove(css.shake);
                }, 500);
            }
        }
    };

    const handleRemoveFromField = (pieceId: number) => {
        setPieces((prevPieces) =>
            prevPieces.map((p) =>
                p.id === pieceId ? { ...p, currentPosition: null } : p
            )
        );
    };

    // Создаем обработчики событий для разных типов ввода
    const createEventHandlers = (piece: PuzzlePiece) => {
        const handlers: any = {};

        if (shouldUseTouchEvents) {
            handlers.onTouchStart = (e: React.TouchEvent) =>
                handlePointerStart(piece, e);
        }

        if (shouldUseMouseFallback) {
            handlers.onMouseDown = (e: React.MouseEvent) =>
                handlePointerStart(piece, e);
            handlers.draggable = false; // Отключаем стандартный drag&drop для лучшей совместимости
        }

        return handlers;
    };

    const renderFieldCell = (position: number) => {
        const pieceInCell = pieces.find((p) => p.currentPosition === position);

        return (
            <div
                className={`${css["field-cell"]} ${
                    css[`field-cell_position_${position}`]
                }`}
            >
                {pieceInCell && (
                    <div
                        className={css["piece-in-field"]}
                        {...createEventHandlers(pieceInCell)}
                        onDoubleClick={() =>
                            handleRemoveFromField(pieceInCell.id)
                        }
                    >
                        <img width={56} src={pieceInCell.src} alt="" />
                    </div>
                )}
            </div>
        );
    };

    // Рендер перетаскиваемого элемента
    const renderDraggingPiece = () => {
        if (!dragState || !dragState.isDragging) return null;

        const style: React.CSSProperties = {
            position: "fixed",
            left: dragState.currentX - 28, // центрируем по размеру изображения (56/2)
            top: dragState.currentY - 28,
            width: 56,
            height: 56,
            zIndex: 1000,
            pointerEvents: "none",
            transform: "scale(1.1)",
            transition: "none",
            opacity: 0.9,
        };

        return (
            <div style={style} className={css["dragging-piece"]}>
                <img
                    width={56}
                    src={dragState.piece.src}
                    alt=""
                    style={{ filter: "brightness(1.1)" }}
                />
            </div>
        );
    };

    const gameVictoryHandler = async () => {
        dispatch(setTaskChecked(3));
        await checkQuest(3);
        updateTasks();
        routeNavigator.showPopout(
            <GameDone onClick={() => routeNavigator.replace(`/`)} />
        );
    };

    useEffect(() => {
        const isWin =
            pieces.filter((piece) => piece.currentPosition).length === 9;
        if (isWin) {
            gameVictoryHandler();
        }
    }, [pieces]);

    useEffect(() => {
        const images = [
            part1,
            part2,
            part3,
            part4,
            part5,
            part6,
            part7,
            part8,
            part9,
            game3Title,
        ];

        preloadImages(images);
    }, []);

    // Глобальные обработчики событий
    useEffect(() => {
        if (!dragState?.isDragging) return;

        const handleGlobalMove = (e: Event) => handlePointerMove(e);
        const handleGlobalEnd = (e: Event) => handlePointerEnd(e);

        const options = { passive: false };

        if (shouldUseTouchEvents) {
            document.addEventListener("touchmove", handleGlobalMove, options);
            document.addEventListener("touchend", handleGlobalEnd, options);
            document.addEventListener("touchcancel", handleGlobalEnd, options);
        }

        if (shouldUseMouseFallback) {
            document.addEventListener("mousemove", handleGlobalMove, options);
            document.addEventListener("mouseup", handleGlobalEnd, options);
        }

        return () => {
            document.removeEventListener("touchmove", handleGlobalMove);
            document.removeEventListener("touchend", handleGlobalEnd);
            document.removeEventListener("touchcancel", handleGlobalEnd);
            document.removeEventListener("mousemove", handleGlobalMove);
            document.removeEventListener("mouseup", handleGlobalEnd);
        };
    }, [dragState?.isDragging, handlePointerMove, handlePointerEnd]);

    useEffect(() => {
        if (currentTask?.checked || !currentTask?.active) {
            routeNavigator.replace(`/`)
        }
    }, []);

    return (
        <Panel id={id} disableBackground className={css["game-panel"]}>
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
                <img src={game3Title} width={166} alt="" />
            </CustomPanelHeader>
            <div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
                ref={containerRef}
            >
                <Div>
                    <div className={css["game-field"]} ref={fieldRef}>
                        <div className={css["field-grid"]}>
                            {renderFieldCell(1)}
                            {renderFieldCell(2)}
                            {renderFieldCell(3)}
                            {renderFieldCell(4)}
                            {renderFieldCell(5)}
                            {renderFieldCell(6)}
                            {renderFieldCell(7)}
                            {renderFieldCell(8)}
                            {renderFieldCell(9)}
                        </div>
                    </div>
                    <Spacing size={15} />
                    <div className={css["parts"]}>
                        {pieces
                            .filter((piece) => piece.currentPosition === null)
                            .map((piece) => (
                                <div
                                    key={piece.id}
                                    className={`${css["part"]} ${
                                        dragState?.piece.id === piece.id
                                            ? css.hidden
                                            : ""
                                    }`}
                                    {...createEventHandlers(piece)}
                                >
                                    <img width={56} src={piece.src} alt="" />
                                </div>
                            ))}
                    </div>
                </Div>
            </div>
            {renderDraggingPiece()}
        </Panel>
    );
};
