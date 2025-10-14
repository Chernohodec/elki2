import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface Main {
    appIsLoaded: boolean;
    onboardingComplete: boolean;
    notificationIsAllowed: boolean;
}

const initialState: Main = {
    appIsLoaded: false,
    onboardingComplete: false,
    notificationIsAllowed: false,
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
export const {
    setOnboardingComplete,
    setAppIsLoaded,
    setNotificationIsAllowed,
} = mainSlice.actions;
