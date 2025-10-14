import { Root, SplitCol, SplitLayout, View } from "@vkontakte/vkui";

import {
    useActiveVkuiLocation,
    usePopout,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { CustomTabbar } from "./components/CustomTabbar/CustomTabbar";
import "./index.css";
import { Modals } from "./modals";
import { Loading } from "./panels/Loading/Loading";
import { Main } from "./panels/Main/Main";
import { OnboardingNotifications } from "./panels/OnboardingNotifications/OnboardingNotifications";
import { OnboardingStart } from "./panels/OnboardingStart/OnboardingStart";
import {
    DEFAULT_VIEW,
    DEFAULT_VIEW_PANELS,
    ONBOADING_VIEW,
    ONBOARDING_VIEW_PANELS,
} from "./routes";
import { useAppDispatch, useAppSelector } from "./store";
import {
    selectAppIsLoaded,
    selectOnboardingComplete,
} from "./store/main.reducer";
import { selectTasks } from "./store/tasks.reducer";
import { Tasks } from "./panels/Tasks/Tasks";
import { Settings } from "./panels/Settings/Settings";
import { About } from "./panels/About/About";
import { Prize } from "./panels/Prize/Prize";

export const App = () => {
    const routerPopout = usePopout();
    const onboardingCompleted = useAppSelector(selectOnboardingComplete);
    const routeNavigator = useRouteNavigator();
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();
    const {
        panelsHistory,
        panel: activePanel = DEFAULT_VIEW_PANELS.MAIN,
        view: activeView = DEFAULT_VIEW,
    } = useActiveVkuiLocation();
    const gamePanels = [
        DEFAULT_VIEW_PANELS.GAME1,
        DEFAULT_VIEW_PANELS.GAME2,
        DEFAULT_VIEW_PANELS.GAME3,
        DEFAULT_VIEW_PANELS.GAME4,
        DEFAULT_VIEW_PANELS.GAME5,
        DEFAULT_VIEW_PANELS.GAME6,
    ];

    const appIsLoaded = useAppSelector(selectAppIsLoaded);
    const panelIsGame = gamePanels.includes(activePanel);

    return (
        <SplitLayout>
            {!appIsLoaded ? (
                <Loading />
            ) : (
                <SplitCol>
                    <Root activeView={activeView}>
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
                            onSwipeBackStart={() => "prevent"}
                        >
                            <Main nav={DEFAULT_VIEW_PANELS.MAIN} />
                            <Tasks nav={DEFAULT_VIEW_PANELS.TASKS} />
                            <Settings nav={DEFAULT_VIEW_PANELS.SETTINGS} />
                            <Prize nav={DEFAULT_VIEW_PANELS.PRIZE} />
                            <About nav={DEFAULT_VIEW_PANELS.ABOUT} />

                            {/* <Game1Start nav={DEFAULT_VIEW_PANELS.GAME1_START} />
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
                            /> */}
                        </View>
                    </Root>
                </SplitCol>
            )}
            {routerPopout}
            {appIsLoaded && onboardingCompleted && !panelIsGame && (
                <CustomTabbar />
            )}
            <Modals />
        </SplitLayout>
    );
};
