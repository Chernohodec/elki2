import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface Task {
    id: number;
    name: string;
    text: string;
    image: string;
    type: 'parent' | 'kid';
    checked: boolean;
    active: boolean;
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
            image: 'assets/img/tasks/task1-icon.png',
            type: 'kid',
            activation_time: "2025-08-18T12:08:13+03:00",
            active: true,
            order: 1,
            checked: false,
        },
        {
            id: 2,
            name: "Поймай пига",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            image: 'assets/img/tasks/task2-icon.png',
            type: 'parent',
            activation_time: "2025-08-11T20:51:03+03:00",
            active: true,
            order: 2,
            checked: false,
        },
        {
            id: 3,
            name: "Елочка для Витали",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            image: 'assets/img/tasks/task3-icon.png',
            type: 'kid',
            activation_time: "2025-08-11T20:52:04+03:00",
            active: true,
            order: 3,
            checked: false,
        },
        {
            id: 4,
            name: "Совет от Зины",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            image: 'assets/img/tasks/task4-icon.png',
            type: 'parent',
            activation_time: "2025-08-11T20:52:11+03:00",
            active: true,
            order: 4,
            checked: false,
        },
        {
            id: 5,
            name: "Кулинарная игра",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            image: 'assets/img/tasks/task5-icon.png',
            type: 'kid',
            activation_time: "2025-08-12T20:52:32+03:00",
            active: true,
            order: 5,
            checked: false,
        },
        {
            id: 6,
            name: "Найди отличия",
            text: "Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.",
            image: 'assets/img/tasks/task6-icon.png',
            type: 'parent',
            activation_time: "2025-08-26T12:08:37+03:00",
            active: true,
            order: 6,
            checked: false,
        },
    ],
    balls: [
        {
            id: 1,
            number: "12131345",
        },
        {
            id: 2,
            number: "12131345",
        },
        {
            id: 3,
            number: "12131345",
        },
        {
            id: 4,
            number: "12131345",
        },
    ],
    friends: [
        {
            id: 1,
            name: "Константин. А",
            value: 3,
        },
        {
            id: 2,
            name: "Константин. А",
            value: 3,
        },
        {
            id: 3,
            name: "Константин. А",
            value: 3,
        },
        {
            id: 4,
            name: "Константин. А",
            value: 3,
        },
    ],
};

const mainSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
        },
        setTaskChecked(state, action: PayloadAction<number>) {
            const taskId = action.payload;
            const taskToUpdate = state.tasks.find((task) => task.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.checked = true;
            }
        },
        setBalls(state, action: PayloadAction<Ball[]>) {
            state.balls = action.payload;
        },
        setFriends(state, action: PayloadAction<Friend[]>) {
            state.friends = action.payload;
        },
    },
});

const { reducer } = mainSlice;
export { reducer as tasksReducer };
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectBalls = (state: RootState) => state.tasks.balls;
export const selectFriends = (state: RootState) => state.tasks.friends;
export const { setTasks, setBalls, setFriends, setTaskChecked } =
    mainSlice.actions;
