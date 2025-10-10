import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Div, NavIdProps, Panel } from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";

import { ONBOARDING_VIEW_PANELS } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../store";
import {
    selectOnboardingComplete,
    setAppIsLoaded,
} from "../../store/main.reducer";
import css from "./Loading.module.css";
import { useInit } from "../../hooks/useInit";

export const Loading: FC<NavIdProps> = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const dispatch = useAppDispatch();
    const onboardingComplete = useAppSelector(selectOnboardingComplete);
    const {isLoading, init} = useInit()
    const [timeIsLoading, setTimeIsLoading] = useState(true)

    useEffect(() => {
        init()
        const loading = setTimeout(() => {
            setTimeIsLoading(false)
        }, 3000);
        return () => clearTimeout(loading);
    }, []);

    useEffect(()=>{
        if(!isLoading && !timeIsLoading){
            dispatch(setAppIsLoaded(true));
            if(!onboardingComplete){
                routeNavigator.push(`/${ONBOARDING_VIEW_PANELS.START}`)
            }
        }
    },[isLoading, timeIsLoading])

    return (
        <Panel id={id}>
            <Div className={css["loading-page"]}>
                <div className={css["loading-block"]}>
                    <div className={css["loading-block__bar"]}></div>
                </div>
            </Div>
        </Panel>
    );
};
