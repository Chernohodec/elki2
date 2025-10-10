import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { mainReducer } from "./main.reducer";
import { tasksReducer } from "./tasks.reducer";


const rootReducer = combineReducers({
    main: mainReducer,
    tasks: tasksReducer
});

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export { store };

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

type DispatchFunc = () => RootDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
