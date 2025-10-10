import {
    parseURLSearchParamsForGetLaunchParams,
} from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames, Spacing } from "@vkontakte/vkui";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import css from "./InviteBanner.module.css";

export const InviteBanner = ({ inviteFriend }) => {
    const { vk_user_id } = parseURLSearchParamsForGetLaunchParams(
        window.location.search
    );
    const routeNavigator = useRouteNavigator();

    return (
        <div className={classNames(css["invite-banner"])}>
            <Title
                size="medium"
                color="yellow"
                className={css["invite-banner__title"]}
            >
                Дарим 5 билетов
                <br />
                за каждого
                <br />
                приглашенного друга!{" "}
            </Title>
            <Spacing size={15} />
            <Button
                size="small"
                color="yellow"
                className={css["invite-banner__button"]}
                onClick={inviteFriend}
            >
                Пригласить
            </Button>
        </div>
    );
};
