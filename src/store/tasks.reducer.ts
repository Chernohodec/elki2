import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface Task {
    id: number;
    name: string;
    text: string;
    type: "parent" | "kid";
    completed: boolean;
    is_active: boolean;
    activation_time: string;
    order: number;
}

export interface Ball {
    id: number;
    number: string;
}

export interface Friend {
    id: number;
    name: string;
    value: number;
}

export interface TasksState {
    tasks: Task[];
    balls: Ball[];
    friends: Friend[];
}

const initialState: TasksState = {
    tasks: [
        {
            id: 1,
            name: "Письмо Деду Морозу",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            type: "kid",
            activation_time: "2025-10-17T12:08:13+03:00",
            is_active: true,
            order: 1,
            completed: false,
        },
        {
            id: 2,
            name: "Поймай пига",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            type: "parent",
            activation_time: "2025-10-18T20:51:03+03:00",
            is_active: true,
            order: 2,
            completed: false,
        },
        {
            id: 3,
            name: "Ёлочка для Витали",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            type: "kid",
            activation_time: "2025-10-19T20:52:04+03:00",
            is_active: true,
            order: 3,
            completed: false,
        },
        {
            id: 4,
            name: "Совет от Зины",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            type: "parent",
            activation_time: "2025-10-19T20:52:11+03:00",
            is_active: true,
            order: 4,
            completed: false,
        },
        {
            id: 5,
            name: "Кулинарная игра",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            type: "kid",
            activation_time: "2025-10-19T20:52:32+03:00",
            is_active: true,
            order: 5,
            completed: false,
        },
        {
            id: 6,
            name: "Найди отличия",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            type: "parent",
            activation_time: "2025-10-19T12:08:37+03:00",
            is_active: true,
            order: 6,
            completed: false,
        },
    ],
    balls: [
        {
            id: 1,
            number: "12131345",
            type: "QUEST"
        },
        {
            id: 2,
            number: "12131345",
            type: "QUEST"
        },
        {
            id: 3,
            number: "12131345",
            type: "QUEST"
        },
        {
            id: 4,
            number: "12131345",
            type: "QUEST"
        },
    ],
};

const mainSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            const taskSorted = [
                ...action.payload
                    .sort((a, b) => a.order - b.order)
                    .map((task) => ({
                        ...task,
                        type: task?.id % 2 === 0 ? "parent" : "kid",
                    })),
            ];
            state.tasks = taskSorted;
        },
        setTaskCompleted(state, action: PayloadAction<number>) {
            const taskId = action.payload;
            const taskToUpdate = state.tasks.find((task) => task.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.completed = true;
            }
        },
        setBalls(state, action: PayloadAction<Ball[]>) {
            state.balls = action.payload;
        },
    },
});

const { reducer } = mainSlice;
export { reducer as tasksReducer };
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectBalls = (state: RootState) => state.tasks.balls;
export const { setTasks, setBalls, setTaskCompleted } =
    mainSlice.actions;
