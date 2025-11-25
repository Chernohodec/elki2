import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface Main {
    appIsLoaded: boolean;
    onboardingComplete: boolean;
    notificationIsAllowed: boolean;
    userCode: string;
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
    appIsLoaded: false,
    onboardingComplete: false,
    notificationIsAllowed: false,
    userCode: '',
    heroes: [
        {
            id: 1,
            img: "assets/img/tasks/task2/character-pic.png",
            actor: {
                name: "ДЯДЯ ЮРА",
                voice: "Дмитрий Нагиев",
                text: 'Ради дамы сердца готов на всё, даже на невинный обман под видом небольшого чуда.'
            },
        },
        {
            id: 2,
            img: "assets/img/tasks/task5/character-pic.png",
            actor: {
                name: "ДАМИР",
                voice: "РУЗИЛЬ МИНЕКАЕВ",
                text: 'В канун Нового года у будущего отца только одна забота: абсурдные желания любимой жены.'
            },
        },
        {
            id: 3,
            img: "assets/img/tasks/task4/character-pic.png",
            actor: {
                name: "Зина",
                voice: "ОЛЬГА КАРТУНКОВА",
                text: 'Даст отпор любому негодняю... а потом проникнется к нему симпатией и споёт под ночным небом.'
            },
        },
        {
            id: 4,
            img: "assets/img/tasks/task3/character-pic.png",
            actor: {
                name: "ВИТАЛИК",
                voice: "АНДРЕЙ РОЖКОВ",
                text: 'В смертельной опасности успокоит разговорами о радикулите. '
            },
        },
        {
            id: 5,
            img: "assets/img/tasks/task6/character-pic.png",
            actor: {
                name: "Аня",
                voice: "ТИНА СТОЙИЛКОВИЧ",
                text: 'Примчится на доске к своему счастью и почти грациозно плюхнется в снег.'
            },
        },
        {
            id: 6,
            img: "assets/img/actors/actor6.png",
            actor: {
                name: "ИГОРЬ",
                voice: "ДМИТРИЙ ЖУРАВЛЁВ",
                text: 'Победитель года в самом неудачном выборе времени для новостей. '
            },
        },
        {
            id: 8,
            img: "assets/img/actors/actor7.png",
            actor: {
                name: "Света",
                voice: "ЮЛИЯ ТОПОЛЬНИЦКАЯ",
                text: 'С правильной поддержкой и толикой волшебства научится всему — даже вождению на механике.'
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
        setUserCode(state, action: PayloadAction<string>){
            state.userCode = action.payload;
        }
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
export const selectUserCode = (state: RootState) =>
    state.main.userCode;
export const {
    setOnboardingComplete,
    setAppIsLoaded,
    setNotificationIsAllowed,
    setUserCode
} = mainSlice.actions;
