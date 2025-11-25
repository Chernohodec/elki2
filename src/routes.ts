import {
    createHashRouter,
    createModal,
    createPanel,
    createRoot,
    createView,
    RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";
export const DEFAULT_VIEW = "default_view";
export const ONBOADING_VIEW = "onboarding_view";
export const LOADING_VIEW = "loading_view";

export const ONBOARDING_VIEW_PANELS = {
    START: "onboarding_start",
    NOTIFICATIONS: "onboarding_notifications",
    LOADING: "loading"
} as const;

export const DEFAULT_VIEW_PANELS = {
    MAIN: "/",
    SETTINGS: "settings",
    TASKS: "tasks",
    ABOUT: "about",
    PRIZE: "prize",
    INFO: "info",
    GAME1: 'game1',
    GAME1_START: 'game1_start',
    GAME2: 'game2',
    GAME2_START: 'game2_start',
    GAME3: 'game3',
    GAME3_START: 'game3_start',
    GAME4: 'game4',
    GAME4_START: 'game4_start',
    GAME5: 'game5',
    GAME5_START: 'game5_start',
    GAME6: 'game6',
    GAME6_START: 'game6_start',
} as const;

export const DEFAULT_VIEW_MODALS = {
    HERO_MODAL: "hero_modal",
    TASK_MODAL: "task_modal",
    CLOSE_MODAL: "close_modal"
} as const;

export const routes = RoutesConfig.create([
    createRoot(DEFAULT_ROOT, [
        createView(DEFAULT_VIEW, [
            createPanel(DEFAULT_VIEW_PANELS.MAIN, `/`, []),
            createPanel(
                DEFAULT_VIEW_PANELS.INFO,
                `/${DEFAULT_VIEW_PANELS.INFO}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.SETTINGS,
                `/${DEFAULT_VIEW_PANELS.SETTINGS}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.MAIN,
                `${DEFAULT_VIEW_PANELS.MAIN}`,
                [
                    createModal(
                        DEFAULT_VIEW_MODALS.HERO_MODAL,
                        `/${DEFAULT_VIEW_PANELS.MAIN}/${DEFAULT_VIEW_MODALS.HERO_MODAL}`
                    ),
                ]
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.TASKS,
                `/${DEFAULT_VIEW_PANELS.TASKS}`,
                [
                    createModal(
                        DEFAULT_VIEW_MODALS.HERO_MODAL,
                        `/${DEFAULT_VIEW_PANELS.MAIN}/${DEFAULT_VIEW_MODALS.HERO_MODAL}`
                    ),
                ]
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.ABOUT,
                `/${DEFAULT_VIEW_PANELS.ABOUT}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.PRIZE,
                `/${DEFAULT_VIEW_PANELS.PRIZE}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME1_START,
                `/${DEFAULT_VIEW_PANELS.GAME1_START}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME1,
                `/${DEFAULT_VIEW_PANELS.GAME1}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME2_START,
                `/${DEFAULT_VIEW_PANELS.GAME2_START}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME2,
                `/${DEFAULT_VIEW_PANELS.GAME2}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME3_START,
                `/${DEFAULT_VIEW_PANELS.GAME3_START}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME3,
                `/${DEFAULT_VIEW_PANELS.GAME3}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME4_START,
                `/${DEFAULT_VIEW_PANELS.GAME4_START}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME4,
                `/${DEFAULT_VIEW_PANELS.GAME4}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME5_START,
                `/${DEFAULT_VIEW_PANELS.GAME5_START}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME5,
                `/${DEFAULT_VIEW_PANELS.GAME5}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME6_START,
                `/${DEFAULT_VIEW_PANELS.GAME6_START}`,
                []
            ),
            createPanel(
                DEFAULT_VIEW_PANELS.GAME6,
                `/${DEFAULT_VIEW_PANELS.GAME6}`,
                []
            ),
        ]),
        createView(ONBOADING_VIEW, [
            createPanel(
                ONBOARDING_VIEW_PANELS.START,
                `/${ONBOARDING_VIEW_PANELS.START}`,
                []
            ),
            createPanel(
                ONBOARDING_VIEW_PANELS.NOTIFICATIONS,
                `/${ONBOARDING_VIEW_PANELS.NOTIFICATIONS}`,
                []
            ),
        ]),
    ]),
]);

export const router = createHashRouter(routes.getRoutes());
