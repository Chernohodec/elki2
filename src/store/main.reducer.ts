import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface Main {
    appIsLoaded: boolean;
    onboardingComplete: boolean;
    notificationIsAllowed: boolean;
    heroes: {
        id: number;
        img: string;
        actor: {
            name: string;
            voice: string;
            text: string;
        };
    }[];
}

const initialState: Main = {
    appIsLoaded: true,
    onboardingComplete: true,
    notificationIsAllowed: true,
    heroes: [
        {
            id: 1,
            img: "assets/img/tasks/task2/character-pic.png",
            actor: {
                name: "Дядя юра",
                voice: "Дмитрий Нагиев",
                text: 'Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur'
            },
        },
        {
            id: 2,
            img: "assets/img/tasks/task5/character-pic.png",
            actor: {
                name: "ДАМИР",
                voice: "РУЗИЛЬ МИНЕКАЕВ",
                text: 'Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur'
            },
        },
        {
            id: 3,
            img: "assets/img/tasks/task4/character-pic.png",
            actor: {
                name: "Зина",
                voice: "ОЛЬГА КАРТУНКОВА",
                text: 'Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur'
            },
        },
        {
            id: 4,
            img: "assets/img/tasks/task3/character-pic.png",
            actor: {
                name: "ВИТАЛИК",
                voice: "АНДРЕЙ РОЖКОВ",
                text: 'Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur'
            },
        },
        {
            id: 5,
            img: "assets/img/tasks/task6/character-pic.png",
            actor: {
                name: "Аня",
                voice: "ТИНА СТОЙИЛКОВИЧ",
                text: 'Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur'
            },
        },
        {
            id: 6,
            img: "assets/img/tasks/task2/character-pic.png",
            actor: {
                name: "ВИТАЛИК",
                voice: "АНДРЕЙ РОЖКОВ",
                text: 'Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur'
            },
        },
        {
            id: 7,
            img: "assets/img/actors/actor6.png",
            actor: {
                name: "ИГОРЬ",
                voice: "ДМИТРИЙ ЖУРАВЛЁВ",
                text: 'Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur'
            },
        },
        {
            id: 8,
            img: "assets/img/actors/actor7.png",
            actor: {
                name: "Света",
                voice: "ЮЛИЯ ТОПОЛЬНИЦКАЯ",
                text: 'Lorem ipsum dolor sit amet consectetur. Pretium placerat duis convallis felis eget nunc arcu id at. Facilisi augue ultrices molestie.Lorem ipsum dolor sit amet consectetur'
            },
        },
    ],
};

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setOnboardingComplete(state, action: PayloadAction<boolean>) {
            state.onboardingComplete = action.payload;
        },
        setAppIsLoaded(state, action: PayloadAction<boolean>) {
            state.appIsLoaded = action.payload;
        },
        setNotificationIsAllowed(state, action: PayloadAction<boolean>) {
            state.notificationIsAllowed = action.payload;
        },
    },
});

const { reducer } = mainSlice;
export { reducer as mainReducer };
export const selectOnboardingComplete = (state: RootState) =>
    state.main.onboardingComplete;
export const selectAppIsLoaded = (state: RootState) => state.main.appIsLoaded;
export const selectNotificationIsAllowed = (state: RootState) =>
    state.main.notificationIsAllowed;
export const selectHeroes = (state: RootState) =>
    state.main.heroes;
export const {
    setOnboardingComplete,
    setAppIsLoaded,
    setNotificationIsAllowed,
} = mainSlice.actions;
