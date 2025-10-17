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
import item1Image from "../../../public/assets/img/tasks/task5/item1.png";
import item2Image from "../../../public/assets/img/tasks/task5/item2.png";
import item3Image from "../../../public/assets/img/tasks/task5/item3.png";
import item4Image from "../../../public/assets/img/tasks/task5/item4.png";
import item5Image from "../../../public/assets/img/tasks/task5/item5.png";
import item6Image from "../../../public/assets/img/tasks/task5/item6.png";
import { FC, useEffect, useState } from "react";
import "swiper/css";
import { checkQuest } from "../../api/user/checkQuest";
import { CustomPanelHeader } from "../../components/CustomPanelHeader/CustomPanelHeader";
import { GameCancel } from "../../components/GameCancel/GameCancel";
import { GameDone } from "../../components/GameDone/GameDone";
import { preloadImages } from "../../helpers/preloadImages";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTasks, setTaskChecked } from "../../store/tasks.reducer";
import css from "./Game5.module.css";
import { Button } from "../../components/Button/Button";
import { DEFAULT_VIEW_MODALS } from "../../routes";

export const Game5: FC<NavIdProps> = ({ id, updateTasks }) => {
    const routeNavigator = useRouteNavigator();
    const dispatch = useAppDispatch();
    const platform = usePlatform();
    const currentTask = useAppSelector(selectTasks).find(
        (task) => task?.id === 5
    );
    const [counters, setCounters] = useState([0, 0, 0, 0]);
    const [gameComplete, setGameComplete] = useState(false);
    const [touchStartPos, setTouchStartPos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [selectedGem, setSelectedGem] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [mouseStartPos, setMouseStartPos] = useState<{
        x: number;
        y: number;
    } | null>(null);

    const config = {
        countRows: 8,
        countCols: 7,
        gemSize: 44,
        images: [
            item1Image,
            item2Image,
            item3Image,
            item4Image,
            item5Image,
            item6Image,
        ],
        gemClass: "gem",
        gemIdPrefix: "gem",
        gameStates: ["pick", "switch", "revert", "remove", "refill"],
        gameState: "",
        movingItems: 0,
        swapDuration: 300,
    };

    const player = {
        selectedRow: -1,
        selectedCol: -1,
        posX: "",
        posY: "",
    };

    const [gems, setGems] = useState<number[][]>([]);

    // Инициализация игрового поля
    const initGame = () => {
        const newGems: number[][] = Array(config.countRows)
            .fill(null)
            .map(() => Array(config.countCols).fill(-1));

        for (let i = 0; i < config.countRows; i++) {
            for (let j = 0; j < config.countCols; j++) {
                let gemType;
                do {
                    gemType = Math.floor(Math.random() * 6);
                    newGems[i][j] = gemType;
                } while (isStreak(newGems, i, j));
            }
        }
        setGems(newGems);
    };

    // Проверка на завершение игры
    useEffect(() => {
        if (counters.every((counter) => counter >= 10)) {
            // Анимация завершения уровня
            const allGems = document.querySelectorAll(`.${css["game-gem"]}`);
            allGems.forEach((gem, index) => {
                setTimeout(() => {
                    gem.classList.add(css["match-animation"]);
                    gem.addEventListener(
                        "animationend",
                        () => {
                            gem.classList.remove(css["match-animation"]);
                        },
                        { once: true }
                    );
                }, index * 50);
            });

            setTimeout(() => {
                checkQuest(6).then(() => {
                    updateTasks();
                });
                dispatch(setTaskChecked(6));
                setGameComplete(true);
            }, allGems.length * 50 + 300);
        }
    }, [counters]);

    // Проверка на группу из 3+ элементов
    const isStreak = (grid: number[][], row: number, col: number) => {
        if (!grid || !grid[row] || grid[row][col] === undefined) return false;
        return (
            isVerticalStreak(grid, row, col) ||
            isHorizontalStreak(grid, row, col)
        );
    };

    const isVerticalStreak = (grid: number[][], row: number, col: number) => {
        if (!grid || !grid[row] || grid[row][col] === undefined) return false;

        const gemValue = grid[row][col];
        let streak = 1;
        let tmp = row - 1;

        while (tmp >= 0 && grid[tmp] && grid[tmp][col] === gemValue) {
            streak++;
            tmp--;
        }

        tmp = row + 1;
        while (
            tmp < config.countRows &&
            grid[tmp] &&
            grid[tmp][col] === gemValue
        ) {
            streak++;
            tmp++;
        }

        return streak >= 3;
    };

    const isHorizontalStreak = (grid: number[][], row: number, col: number) => {
        if (!grid || !grid[row] || grid[row][col] === undefined) return false;

        const gemValue = grid[row][col];
        let streak = 1;
        let tmp = col - 1;

        while (
            tmp >= 0 &&
            grid[row][tmp] !== undefined &&
            grid[row][tmp] === gemValue
        ) {
            streak++;
            tmp--;
        }

        tmp = col + 1;
        while (
            tmp < config.countCols &&
            grid[row][tmp] !== undefined &&
            grid[row][tmp] === gemValue
        ) {
            streak++;
            tmp++;
        }

        return streak >= 3;
    };

    // Обмен элементов местами с анимацией
    const swapGems = (
        row1: number,
        col1: number,
        row2: number,
        col2: number
    ) => {
        const gem1 = document.getElementById(
            `${config.gemIdPrefix}-${row1}-${col1}`
        );
        const gem2 = document.getElementById(
            `${config.gemIdPrefix}-${row2}-${col2}`
        );

        if (!gem1 || !gem2) return;

        // Запрещаем взаимодействие во время анимации
        gem1.style.pointerEvents = "none";
        gem2.style.pointerEvents = "none";

        // Получаем позиции элементов
        const rect1 = gem1.getBoundingClientRect();
        const rect2 = gem2.getBoundingClientRect();

        // Вычисляем смещения
        const deltaX = rect2.left - rect1.left;
        const deltaY = rect2.top - rect1.top;

        // Применяем анимацию
        gem1.style.transition = `transform ${config.swapDuration}ms ease-in-out`;
        gem2.style.transition = `transform ${config.swapDuration}ms ease-in-out`;
        gem1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        gem2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;
        gem1.style.zIndex = "10";
        gem2.style.zIndex = "10";

        // Обновляем состояние после начала анимации
        const newGems = [...gems];
        const temp = newGems[row1][col1];
        newGems[row1][col1] = newGems[row2][col2];
        newGems[row2][col2] = temp;
        setGems(newGems);

        setTimeout(() => {
            // Сбрасываем трансформации после анимации
            gem1.style.transition = "none";
            gem2.style.transition = "none";
            gem1.style.transform = "translate(0, 0)";
            gem2.style.transform = "translate(0, 0)";
            gem1.style.zIndex = "";
            gem2.style.zIndex = "";

            // Возвращаем возможность взаимодействия
            setTimeout(() => {
                gem1.style.pointerEvents = "";
                gem2.style.pointerEvents = "";
            }, 50);

            if (
                !isStreak(newGems, row1, col1) &&
                !isStreak(newGems, row2, col2)
            ) {
                // Анимация возврата, если обмен не привел к совпадению
                setTimeout(() => {
                    gem1.style.transition = `transform ${config.swapDuration}ms ease-in-out`;
                    gem2.style.transition = `transform ${config.swapDuration}ms ease-in-out`;
                    gem1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                    gem2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;
                    gem1.style.zIndex = "10";
                    gem2.style.zIndex = "10";

                    setTimeout(() => {
                        const revertedGems = [...newGems];
                        revertedGems[row1][col1] = newGems[row2][col2];
                        revertedGems[row2][col2] = newGems[row1][col1];
                        setGems(revertedGems);

                        // gem1.style.transition = "none";
                        // gem2.style.transition = "none";
                        // gem1.style.transform = "translate(0, 0)";
                        // gem2.style.transform = "translate(0, 0)";
                        // gem1.style.zIndex = "";
                        // gem2.style.zIndex = "";

                        config.gameState = "pick";
                        player.selectedRow = -1;
                        player.selectedCol = -1;
                    }, config.swapDuration);
                }, 200);
            } else {
                removeMatches(newGems);
            }
        }, config.swapDuration);
    };

    // Удаление совпадающих элементов с анимацией
    const removeMatches = (grid: number[][]) => {
        if (!grid) return;

        const newGrid = [...grid];
        const matchedGems: { row: number; col: number }[] = [];
        const gemTypes = new Set<number>();

        // Находим все совпадения
        for (let i = 0; i < config.countRows; i++) {
            for (let j = 0; j < config.countCols; j++) {
                if (grid[i][j] === -1) continue;

                if (isStreak(newGrid, i, j)) {
                    const gemType = newGrid[i][j];
                    if (gemType === undefined) continue;

                    if (gemType < 4) {
                        gemTypes.add(gemType);
                    }

                    if (isVerticalStreak(newGrid, i, j)) {
                        let tmp = i;
                        while (tmp >= 0 && newGrid[tmp][j] === gemType) {
                            matchedGems.push({ row: tmp, col: j });
                            tmp--;
                        }
                        tmp = i + 1;
                        while (
                            tmp < config.countRows &&
                            newGrid[tmp][j] === gemType
                        ) {
                            matchedGems.push({ row: tmp, col: j });
                            tmp++;
                        }
                    }

                    if (isHorizontalStreak(newGrid, i, j)) {
                        let tmp = j;
                        while (tmp >= 0 && newGrid[i][tmp] === gemType) {
                            matchedGems.push({ row: i, col: tmp });
                            tmp--;
                        }
                        tmp = j + 1;
                        while (
                            tmp < config.countCols &&
                            newGrid[i][tmp] === gemType
                        ) {
                            matchedGems.push({ row: i, col: tmp });
                            tmp++;
                        }
                    }
                }
            }
        }

        // Добавляем анимацию перед удалением
        matchedGems.forEach(({ row, col }) => {
            const gem = document.getElementById(
                `${config.gemIdPrefix}-${row}-${col}`
            );
            if (gem) {
                gem.classList.add(css["match-animation"]);
                gem.addEventListener(
                    "animationend",
                    () => {
                        gem.classList.remove(css["match-animation"]);
                        // Восстанавливаем стили на случай, если элемент остался на поле
                        // gem.style.opacity = "1";
                        // gem.style.transform = "scale(1)";
                        // gem.style.visibility = "visible";
                    },
                    { once: true }
                );
            }
        });

        setTimeout(() => {
            // Удаляем совпадения из поля
            matchedGems.forEach(({ row, col }) => {
                newGrid[row][col] = -1;
            });

            // Обновляем счетчики
            if (gemTypes.size > 0) {
                setCounters((prevCounters) => {
                    const newCounters = [...prevCounters];
                    gemTypes.forEach((type) => {
                        if (type >= 0 && type < 4) {
                            newCounters[type] += 1;
                        }
                    });
                    return newCounters;
                });
            }

            setGems(newGrid);
            setTimeout(() => dropGems(newGrid), 100);
        }, 300);
    };

    // Падение элементов с анимацией
    const dropGems = (grid: number[][]) => {
        if (!grid) return;

        const newGrid = [...grid];
        let moved = false;

        for (let j = 0; j < config.countCols; j++) {
            for (let i = config.countRows - 1; i > 0; i--) {
                if (newGrid[i][j] === -1 && newGrid[i - 1][j] !== -1) {
                    const gem = document.getElementById(
                        `${config.gemIdPrefix}-${i - 1}-${j}`
                    );
                    if (gem) {
                        gem.classList.add(css["falling-animation"]);
                        // Гарантируем, что элемент видим перед анимацией
                        gem.style.opacity = "1";
                        gem.style.transform = "scale(1)";
                        gem.style.visibility = "visible";
                    }

                    newGrid[i][j] = newGrid[i - 1][j];
                    newGrid[i - 1][j] = -1;
                    moved = true;
                }
            }
        }

        if (moved) {
            setGems(newGrid);
            setTimeout(() => {
                document
                    .querySelectorAll(`.${css["falling-animation"]}`)
                    .forEach((el) => {
                        el.classList.remove(css["falling-animation"]);
                    });
                dropGems(newGrid);
            }, 100);
        } else {
            fillEmptySpaces(newGrid);
        }
    };

    // Заполнение пустых мест с анимацией
    const fillEmptySpaces = (grid: number[][]) => {
        const newGrid = [...grid];
        let filled = false;

        for (let j = 0; j < config.countCols; j++) {
            if (newGrid[0][j] === -1) {
                newGrid[0][j] = Math.floor(Math.random() * 6);
                filled = true;

                setTimeout(() => {
                    const gem = document.getElementById(
                        `${config.gemIdPrefix}-0-${j}`
                    );
                    if (gem) {
                        // Сбрасываем стили перед анимацией появления
                        gem.style.opacity = "1";
                        gem.style.transform = "scale(1)";
                        gem.style.visibility = "visible";
                        gem.classList.add(css["spawn-animation"]);
                        gem.addEventListener(
                            "animationend",
                            () => {
                                gem.classList.remove(css["spawn-animation"]);
                            },
                            { once: true }
                        );
                    }
                }, 10);
            }
        }

        setGems(newGrid);

        if (filled) {
            setTimeout(() => dropGems(newGrid), 300);
        } else {
            checkNewMatches(newGrid);
        }
    };

    // Проверка новых совпадений после заполнения
    const checkNewMatches = (grid: number[][]) => {
        let hasMatches = false;

        for (let i = 0; i < config.countRows; i++) {
            for (let j = 0; j < config.countCols; j++) {
                if (isStreak(grid, i, j)) {
                    hasMatches = true;
                    break;
                }
            }
            if (hasMatches) break;
        }

        if (hasMatches) {
            setTimeout(() => removeMatches(grid), 100);
        } else {
            if (!hasPossibleMoves(grid)) {
                shuffleBoard();
            } else {
                config.gameState = "pick";
                player.selectedRow = -1;
                player.selectedCol = -1;
            }
        }
    };

    // Проверка наличия возможных ходов
    const hasPossibleMoves = (grid: number[][]) => {
        for (let i = 0; i < config.countRows; i++) {
            for (let j = 0; j < config.countCols; j++) {
                if (j < config.countCols - 1) {
                    const tempGrid = JSON.parse(JSON.stringify(grid));
                    [tempGrid[i][j], tempGrid[i][j + 1]] = [
                        tempGrid[i][j + 1],
                        tempGrid[i][j],
                    ];
                    if (
                        isStreak(tempGrid, i, j) ||
                        isStreak(tempGrid, i, j + 1)
                    ) {
                        return true;
                    }
                }

                if (i < config.countRows - 1) {
                    const tempGrid = JSON.parse(JSON.stringify(grid));
                    [tempGrid[i][j], tempGrid[i + 1][j]] = [
                        tempGrid[i + 1][j],
                        tempGrid[i][j],
                    ];
                    if (
                        isStreak(tempGrid, i, j) ||
                        isStreak(tempGrid, i + 1, j)
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    // Перемешивание поля
    const shuffleBoard = () => {
        const flatGems = gems.flat();
        for (let i = flatGems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [flatGems[i], flatGems[j]] = [flatGems[j], flatGems[i]];
        }

        const newGems: number[][] = [];
        for (let i = 0; i < config.countRows; i++) {
            newGems[i] = [];
            for (let j = 0; j < config.countCols; j++) {
                newGems[i][j] = flatGems[i * config.countCols + j];
            }
        }

        setGems(newGems);

        if (!hasPossibleMoves(newGems)) {
            shuffleBoard();
        } else {
            config.gameState = "pick";
            player.selectedRow = -1;
            player.selectedCol = -1;
        }
    };

    // Обработчики свайпов и кликов
    const handleTouchStart = (
        e: React.TouchEvent,
        row: number,
        col: number
    ) => {
        const touch = e.touches[0];
        setTouchStartPos({ x: touch.clientX, y: touch.clientY });
        setSelectedGem({ row, col });
        const gem = document.getElementById(
            `${config.gemIdPrefix}-${row}-${col}`
        );
        if (gem) gem.classList.add(css["gem-selected"]);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStartPos || !selectedGem) return;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartPos || !selectedGem) return;

        document.querySelectorAll(`.${css["gem-selected"]}`).forEach((el) => {
            el.classList.remove(css["gem-selected"]);
        });

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartPos.x;
        const deltaY = touch.clientY - touchStartPos.y;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > absDeltaY && absDeltaX > 10) {
            const direction = deltaX > 0 ? "right" : "left";
            handleSwipe(selectedGem.row, selectedGem.col, direction);
        } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
            const direction = deltaY > 0 ? "down" : "up";
            handleSwipe(selectedGem.row, selectedGem.col, direction);
        }

        setTouchStartPos(null);
        setSelectedGem(null);
    };

    const handleSwipe = (
        row: number,
        col: number,
        direction: "up" | "down" | "left" | "right"
    ) => {
        let targetRow = row;
        let targetCol = col;

        switch (direction) {
            case "left":
                targetCol--;
                break;
            case "right":
                targetCol++;
                break;
            case "up":
                targetRow--;
                break;
            case "down":
                targetRow++;
                break;
        }

        if (
            targetRow < 0 ||
            targetRow >= config.countRows ||
            targetCol < 0 ||
            targetCol >= config.countCols
        ) {
            return;
        }

        const tempGems = gems.map((row) => [...row]);
        [tempGems[row][col], tempGems[targetRow][targetCol]] = [
            tempGems[targetRow][targetCol],
            tempGems[row][col],
        ];

        const isValidSwap =
            isStreak(tempGems, row, col) ||
            isStreak(tempGems, targetRow, targetCol);

        if (isValidSwap) {
            swapGems(row, col, targetRow, targetCol);
        } else {
            if (navigator.vibrate) navigator.vibrate(50);

            const gem1 = document.getElementById(
                `${config.gemIdPrefix}-${row}-${col}`
            );
            const gem2 = document.getElementById(
                `${config.gemIdPrefix}-${targetRow}-${targetCol}`
            );

            if (gem1) gem1.classList.add(css["shake-animation"]);
            if (gem2) gem2.classList.add(css["shake-animation"]);

            setTimeout(() => {
                if (gem1) gem1.classList.remove(css["shake-animation"]);
                if (gem2) gem2.classList.remove(css["shake-animation"]);
            }, 300);
        }
    };

    const handleMouseDown = (e: React.MouseEvent, row: number, col: number) => {
        setMouseStartPos({ x: e.clientX, y: e.clientY });
        setSelectedGem({ row, col });
        const gem = document.getElementById(
            `${config.gemIdPrefix}-${row}-${col}`
        );
        if (gem) gem.classList.add(css["gem-selected"]);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!mouseStartPos || !selectedGem) return;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!mouseStartPos || !selectedGem) return;

        document.querySelectorAll(`.${css["gem-selected"]}`).forEach((el) => {
            el.classList.remove(css["gem-selected"]);
        });

        const deltaX = e.clientX - mouseStartPos.x;
        const deltaY = e.clientY - mouseStartPos.y;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > absDeltaY && absDeltaX > 10) {
            const direction = deltaX > 0 ? "right" : "left";
            handleSwipe(selectedGem.row, selectedGem.col, direction);
        } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
            const direction = deltaY > 0 ? "down" : "up";
            handleSwipe(selectedGem.row, selectedGem.col, direction);
        }

        setMouseStartPos(null);
        setSelectedGem(null);
    };

    // Инициализация игры
    useEffect(() => {
        const images = [
            item1Image,
            item2Image,
            item3Image,
            item4Image,
            item5Image,
            item6Image,
        ];

        preloadImages(images);
        initGame();
    }, []);

    useEffect(() => {
        if (currentTask?.checked || !currentTask?.active) {
            routeNavigator.replace(`/`);
        }
    }, []);

    return (
        <Panel id={id} disableBackground className={css["game-panel"]}>
            <CustomPanelHeader
                onBackClick={() => {
                    routeNavigator.showModal(DEFAULT_VIEW_MODALS.CLOSE_MODAL);
                }}
                title="Кулинарная игра"
            ></CustomPanelHeader>
            <Div
                className={classNames(
                    css["game-start-panel__content"],
                    css[`game-start-panel__content_platform_${platform}`]
                )}
            >
                {gameComplete ? (
                    <GameDone
                        pic="assets/img/tasks/task5/done.png"
                        text="Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie."
                    />
                ) : (
                    <>
                        <div className={css["game-header"]}>
                            {counters.map((counter, index) => (
                                <div
                                    key={index}
                                    className={css["game-header__item"]}
                                >
                                    <img
                                        src={
                                            [
                                                item1Image,
                                                item2Image,
                                                item3Image,
                                                item4Image,
                                            ][index]
                                        }
                                        alt={`Item ${index + 1}`}
                                        width={66}
                                        height={66}
                                        className={
                                            css["game-header__item-image"]
                                        }
                                    />
                                    <span
                                        className={
                                            css["game-header__item-counter"]
                                        }
                                    >
                                        {counter > 9 ? 10 : counter}/10
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Spacing size={15} />
                        <div
                            className={css["game-field"]}
                            data-vkui-swipe-back={false}
                        >
                            {gems.map((row, rowIndex) => (
                                <div key={rowIndex} className={css["game-row"]}>
                                    {row.map((gem, colIndex) => (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            id={`${config.gemIdPrefix}-${rowIndex}-${colIndex}`}
                                            className={css["game-gem"]}
                                            onTouchStart={(e) =>
                                                handleTouchStart(
                                                    e,
                                                    rowIndex,
                                                    colIndex
                                                )
                                            }
                                            onTouchMove={handleTouchMove}
                                            onTouchEnd={handleTouchEnd}
                                            onMouseDown={(e) =>
                                                handleMouseDown(
                                                    e,
                                                    rowIndex,
                                                    colIndex
                                                )
                                            }
                                            onMouseMove={handleMouseMove}
                                            onMouseUp={handleMouseUp}
                                            style={{
                                                backgroundImage:
                                                    gem !== -1
                                                        ? `url(${config.images[gem]})`
                                                        : "none",
                                                width: config.gemSize,
                                                height: config.gemSize,
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Div>
            {gameComplete && (
                <FixedLayout vertical="bottom">
                    <Div>
                        <Button
                            color="yellow"
                            onClick={() => routeNavigator.back(2)}
                        >
                            К заданиям
                        </Button>
                    </Div>
                </FixedLayout>
            )}
        </Panel>
    );
};
