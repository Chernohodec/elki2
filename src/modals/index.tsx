import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { ModalRoot, PlatformProvider } from "@vkontakte/vkui";
import React from "react";
import { DEFAULT_VIEW_MODALS } from "../routes";
import { CloseModal } from "./CloseModal";
import { HeroModal } from "./HeroModal";
import { TaskModal } from "./TaskModal";
import { ShareModal } from "./ShareModal";

const Modals: React.FC = () => {
    const { modal } = useActiveVkuiLocation();
    const routeNavigator = useRouteNavigator();

    return (
        <PlatformProvider value="ios">
            <ModalRoot activeModal={modal}>
                <HeroModal
                    id={DEFAULT_VIEW_MODALS.HERO_MODAL}
                    onClose={() => routeNavigator.hideModal()}
                />
                <TaskModal
                    id={DEFAULT_VIEW_MODALS.TASK_MODAL}
                    onClose={() => routeNavigator.hideModal()}
                />
                <CloseModal
                    id={DEFAULT_VIEW_MODALS.CLOSE_MODAL}
                    onClose={() => routeNavigator.hideModal()}
                />
                <ShareModal
                    id={DEFAULT_VIEW_MODALS.SHARE_MODAL}
                    onClose={() => routeNavigator.hideModal()}
                />
            </ModalRoot>
        </PlatformProvider>
    );
};

export { Modals };
