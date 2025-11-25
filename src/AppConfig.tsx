import vkBridge, {
    parseURLSearchParamsForGetLaunchParams,
} from "@vkontakte/vk-bridge";
import {
    useAdaptivity,
    useAppearance,
    useInsets,
} from "@vkontakte/vk-bridge-react";
import { AdaptivityProvider, ConfigProvider, AppRoot } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { transformVKBridgeAdaptivity } from "./utils";
import { App } from "./App";
import { router } from "./routes";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import { store } from "./store";
import { Provider } from "react-redux";


export const AppConfig = () => {
    const vkBridgeAppearance = useAppearance() || undefined;
    const vkBridgeInsets = useInsets() || undefined;
    const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
    const { vk_platform } = parseURLSearchParamsForGetLaunchParams(
        window.location.search
    );


    return (
        <ConfigProvider
            colorScheme={"light"}
            // platform="android"
            platform={vk_platform === "desktop_web" ? "vkcom" : undefined}
            isWebView={vkBridge.isWebView()}
            hasCustomPanelHeaderAfter={false}
        >
            <AdaptivityProvider {...adaptivity}>
                <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
                    <Provider store={store}>
                        <RouterProvider
                            router={router}
                            notFoundRedirectPath="/"
                        >
                            <App />
                        </RouterProvider>
                    </Provider>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
};
