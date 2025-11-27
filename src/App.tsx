import { Root, SplitCol, SplitLayout, View } from "@vkontakte/vkui";

import {
    useActiveVkuiLocation,
    usePopout,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { getUser } from "./api/user/getUser";
import { CustomTabbar } from "./components/CustomTabbar/CustomTabbar";
import "./index.css";
import { Modals } from "./modals";
import { About } from "./panels/About/About";
import { Game1 } from "./panels/Game1/Game1";
import { Game1Start } from "./panels/Game1/Game1Start";
import { Game2 } from "./panels/Game2/Game2";
import { Game2Start } from "./panels/Game2/Game2Start";
import { Game3 } from "./panels/Game3/Game3";
import { Game3Start } from "./panels/Game3/Game3Start";
import { Game4 } from "./panels/Game4/Game4";
import { Game4Start } from "./panels/Game4/Game4Start";
import { Game5 } from "./panels/Game5/Game5";
import { Game5Start } from "./panels/Game5/Game5Start";
import { Game6 } from "./panels/Game6/Game6";
import { Game6Start } from "./panels/Game6/Game6Start";
import { Loading } from "./panels/Loading/Loading";
import { Main } from "./panels/Main/Main";
import { OnboardingNotifications } from "./panels/OnboardingNotifications/OnboardingNotifications";
import { OnboardingStart } from "./panels/OnboardingStart/OnboardingStart";
import { Prize } from "./panels/Prize/Prize";
import { Settings } from "./panels/Settings/Settings";
import { Tasks } from "./panels/Tasks/Tasks";
import {
    DEFAULT_VIEW,
    DEFAULT_VIEW_PANELS,
    LOADING_VIEW,
    ONBOADING_VIEW,
    ONBOARDING_VIEW_PANELS,
} from "./routes";
import { useAppDispatch, useAppSelector } from "./store";
import {
    selectAppIsLoaded,
    selectOnboardingComplete,
} from "./store/main.reducer";
import { selectTasks, setBalls, setTasks } from "./store/tasks.reducer";
import { preloadImages } from "./helpers/preloadImages";
import { useEffect } from "react";

export const App = () => {
    const routerPopout = usePopout();
    const onboardingCompleted = useAppSelector(selectOnboardingComplete);
    const routeNavigator = useRouteNavigator();
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();
    const {
        panel: activePanel = DEFAULT_VIEW_PANELS.MAIN,
        view: activeView = DEFAULT_VIEW,
        panelsHistory,
    } = useActiveVkuiLocation();
    const gamePanels: string[] = [
        DEFAULT_VIEW_PANELS.GAME1_START,
        DEFAULT_VIEW_PANELS.GAME2_START,
        DEFAULT_VIEW_PANELS.GAME3_START,
        DEFAULT_VIEW_PANELS.GAME4_START,
        DEFAULT_VIEW_PANELS.GAME5_START,
        DEFAULT_VIEW_PANELS.GAME6_START,
        DEFAULT_VIEW_PANELS.GAME1,
        DEFAULT_VIEW_PANELS.GAME2,
        DEFAULT_VIEW_PANELS.GAME3,
        DEFAULT_VIEW_PANELS.GAME4,
        DEFAULT_VIEW_PANELS.GAME5,
        DEFAULT_VIEW_PANELS.GAME6,
    ];

    const appIsLoaded = useAppSelector(selectAppIsLoaded);
    const panelIsGame = gamePanels.includes(activePanel);

    const updateTasks = async () => {
        const userUpdated: any = await getUser();
        dispatch(setBalls(userUpdated.data.tickets));
        dispatch(setTasks(userUpdated.data.quests));
    };

    const onBackClick = () => {
        if (panelsHistory.length !== 1) {
            routeNavigator.back();
        } else {
            routeNavigator.replace("/");
        }
    };

    useEffect(() => {
        const images = [
            "/assets/img/prizes/prize6.png",
            "/assets/img/ball-counter-bg.png",
            "/assets/img/big-counter-bg.png",
            "/assets/img/friends-pic.png",
            "/assets/img/kid-icon.png",
            "/assets/img/loading-bg-mobile.jpg",
            "/assets/img/loading-bg.jpg",
            "/assets/img/loading-logo.png",
            "/assets/img/logo.png",
            "/assets/img/main-bg.jpg",
            "/assets/img/map-bg.jpg",
            "/assets/img/map-car-wheel1.png",
            "/assets/img/map-car-wheel2.png",
            "/assets/img/map-car1.png",
            "/assets/img/map-car2.png",
            "/assets/img/map-frame.png",
            "/assets/img/movie-pic.jpg",
            "/assets/img/onboarding-bells.png",
            "/assets/img/onboarding-bg.png",
            "/assets/img/onboarding-gifts.png",
            "/assets/img/parent-icon.png",
            "/assets/img/prize-bg.png",
            "/assets/img/prize1.png",
            "/assets/img/progressbar-bg.jpg",
            "/assets/img/tasks/task2/cat.png",
            "/assets/img/tasks/task2/deer.png",
            "/assets/img/tasks/task2/dog.png",
            "/assets/img/tasks/task2/done.png",
            "/assets/img/tasks/task2/game-bg.jpg",
            "/assets/img/tasks/task2/horse.png",
            "/assets/img/tasks/task2/pig.png",
            "/assets/img/tasks/task3/done.png",
            "/assets/img/tasks/task3/game-bg.jpg",
            "/assets/img/tasks/task3/tree.png",
            "/assets/img/tasks/task5/done.png",
            "/assets/img/tasks/task5/item1.png",
            "/assets/img/tasks/task5/item2.png",
            "/assets/img/tasks/task5/item3.png",
            "/assets/img/tasks/task5/item4.png",
            "/assets/img/tasks/task5/item5.png",
            "/assets/img/tasks/task5/item6.png",
            "/assets/img/tasks/task5/item7.png",
        ];

        preloadImages(images);
    }, []);

    return (
        <>
            <SplitLayout>
                <SplitCol>
                    <Root activeView={appIsLoaded ? activeView : LOADING_VIEW}>
                        <View
                            activePanel={ONBOARDING_VIEW_PANELS.LOADING}
                            nav={LOADING_VIEW}
                        >
                            <Loading nav={ONBOARDING_VIEW_PANELS.LOADING} />
                        </View>
                        <View
                            activePanel={activePanel}
                            nav={ONBOADING_VIEW}
                            onSwipeBackStart={() => "prevent"}
                        >
                            <OnboardingStart
                                nav={ONBOARDING_VIEW_PANELS.START}
                            />
                            <OnboardingNotifications
                                nav={ONBOARDING_VIEW_PANELS.NOTIFICATIONS}
                            />
                        </View>
                        <View
                            activePanel={activePanel}
                            nav={DEFAULT_VIEW}
                            onSwipeBackStart={onBackClick}
                        >
                            <Main nav={DEFAULT_VIEW_PANELS.MAIN} />
                            <Tasks
                                nav={DEFAULT_VIEW_PANELS.TASKS}
                                onBackClick={onBackClick}
                            />
                            <Settings
                                nav={DEFAULT_VIEW_PANELS.SETTINGS}
                                onBackClick={onBackClick}
                            />
                            <Prize
                                nav={DEFAULT_VIEW_PANELS.PRIZE}
                                onBackClick={onBackClick}
                            />
                            <About
                                nav={DEFAULT_VIEW_PANELS.ABOUT}
                                onBackClick={onBackClick}
                            />
                            <Game1Start nav={DEFAULT_VIEW_PANELS.GAME1_START} />
                            <Game1
                                updateTasks={updateTasks}
                                nav={DEFAULT_VIEW_PANELS.GAME1}
                            />
                            <Game2Start nav={DEFAULT_VIEW_PANELS.GAME2_START} />
                            <Game2
                                updateTasks={updateTasks}
                                nav={DEFAULT_VIEW_PANELS.GAME2}
                            />
                            <Game3Start nav={DEFAULT_VIEW_PANELS.GAME3_START} />
                            <Game3
                                updateTasks={updateTasks}
                                nav={DEFAULT_VIEW_PANELS.GAME3}
                            />
                            <Game4Start nav={DEFAULT_VIEW_PANELS.GAME4_START} />
                            <Game4
                                updateTasks={updateTasks}
                                nav={DEFAULT_VIEW_PANELS.GAME4}
                            />
                            <Game5Start nav={DEFAULT_VIEW_PANELS.GAME5_START} />
                            <Game5
                                updateTasks={updateTasks}
                                nav={DEFAULT_VIEW_PANELS.GAME5}
                            />
                            <Game6Start nav={DEFAULT_VIEW_PANELS.GAME6_START} />
                            <Game6
                                updateTasks={updateTasks}
                                nav={DEFAULT_VIEW_PANELS.GAME6}
                            />
                        </View>
                    </Root>
                </SplitCol>
                {routerPopout}
                {appIsLoaded &&
                    onboardingCompleted &&
                    !panelIsGame &&
                    activeView !== ONBOADING_VIEW && <CustomTabbar />}
                <Modals />
            </SplitLayout>
        </>
    );
};
