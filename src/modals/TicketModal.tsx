import { Icon24Dismiss } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
    Div,
    ModalPage,
    ModalPageHeader,
    NavIdProps,
    PanelHeaderButton,
    Spacing,
} from "@vkontakte/vkui";
import React from "react";
import { Button } from "../components/Button/Button";
import { Text, TextSize } from "../components/Text/Text";
import {
    Title,
    TitleAlign,
    TitleColors,
    TitleSize,
} from "../components/Title/Title";
import { DEFAULT_VIEW_PANELS } from "../routes";
import { } from "../store/main.reducer";

const TicketModal: React.FC<NavIdProps & { onClose: () => void }> = (props) => {
    const routeNavigator = useRouteNavigator();

    return (
        <ModalPage
            className="modal"
            hideCloseButton={true}
            {...props}
            onClose={props.onClose}
            dynamicContentHeight
            header={
                <ModalPageHeader
                    after={
                        <PanelHeaderButton onClick={props.onClose}>
                            <Icon24Dismiss />
                        </PanelHeaderButton>
                    }
                    noSeparator
                ></ModalPageHeader>
            }
        >
            <Div style={{ paddingTop: 0 }}>
                <Spacing size={20} />
                <Title
                    align={TitleAlign.center}
                    color={TitleColors.black}
                    size={TitleSize.normal}
                >
                    О билетах и призах
                </Title>
                <Spacing size={10} />
                <Text size={TextSize.normal} align="center">
                    Выполняйте задания и получайте билеты за пройденные уровни.
                    Каждый билет увеличивает шансы на победу в розыгрыше!
                    Чтобы получить ещё больше билетов, приглашайте в приложение
                    друзей.
                </Text>
                <Spacing size={30} />
                <Button
                    onClick={() =>
                        routeNavigator.push(
                            `/${DEFAULT_VIEW_PANELS.TASKS}?tab=tasks`
                        )
                    }
                >К заданиям</Button>
            </Div>
        </ModalPage>
    );
};

export { TicketModal };
