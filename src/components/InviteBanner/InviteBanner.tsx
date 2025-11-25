import { parseURLSearchParamsForGetLaunchParams } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Spacing } from "@vkontakte/vkui";
import { DEFAULT_VIEW_MODALS } from "../../routes";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import css from "./InviteBanner.module.css";

export const InviteBanner = ({}) => {
    const { vk_user_id } = parseURLSearchParamsForGetLaunchParams(
        window.location.search
    );
    const routeNavigator = useRouteNavigator();

    return (
        <div className={classNames(css["invite-banner"])}>
            <Title
                size="small"
                color="white"
                className={css["invite-banner__title"]}
            >
                Приглашайте друзей
                <br />и получайте шары!
            </Title>
            <Spacing size={5} />
            <Button
                size="small"
                color="yellow"
                className={css["invite-banner__button"]}
                onClick={() =>
                    routeNavigator.showModal(DEFAULT_VIEW_MODALS.SHARE_MODAL)
                }
            >
                Пригласить
            </Button>
        </div>
    );
};
