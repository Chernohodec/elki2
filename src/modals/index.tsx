import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { ModalRoot } from "@vkontakte/vkui";
import React from "react";
import { DEFAULT_VIEW_MODALS } from "../routes";
import { HeroModal } from "./HeroModal";
import { TicketModal } from "./TicketModal";

const Modals: React.FC = () => {
    const { modal } = useActiveVkuiLocation();
    const routeNavigator = useRouteNavigator();

    return (
        <ModalRoot activeModal={modal}>
            <HeroModal
                id={DEFAULT_VIEW_MODALS.HERO_MODAL}
                onClose={() => routeNavigator.hideModal()}
            />
            <TicketModal
                id={DEFAULT_VIEW_MODALS.TICKETS_MODAL}
                onClose={() => routeNavigator.hideModal()}
            />
        </ModalRoot>
    );
};

export { Modals };
