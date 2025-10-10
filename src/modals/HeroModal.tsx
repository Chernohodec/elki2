import { Icon24Dismiss } from "@vkontakte/icons";
import {
    useMetaParams,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import {
    Div,
    ModalPage,
    ModalPageHeader,
    NavIdProps,
    PanelHeaderButton
} from "@vkontakte/vkui";
import React from "react";
import character1 from "../assets/img/map/map-item1.png";
import character2 from "../assets/img/map/map-item2.png";
import character3 from "../assets/img/map/map-item3.png";
import character4 from "../assets/img/map/map-item4.png";
import character5 from "../assets/img/map/map-item5.png";
import character6 from "../assets/img/map/map-item6.png";
import { checkTimeIsAllowed } from "../helpers/checkTimeIsAllowed";
import { useAppSelector } from "../store";
import { } from "../store/main.reducer";
import { selectTasks } from "../store/tasks.reducer";

const HeroModal: React.FC<NavIdProps & { onClose: () => void }> = (props) => {
    // const chars = [
    //     { id: 1, pic: character1 },
    //     { id: 2, pic: character2 },
    //     { id: 3, pic: character3 },
    //     { id: 4, pic: character4 },
    //     { id: 5, pic: character5 },
    //     { id: 6, pic: character6 },
    // ];

    // const routeNavigator = useRouteNavigator();

    // const params = useMetaParams<{ action: string; value: number }>();
    // const tasks = useAppSelector(selectTasks);
    // const currentTask = tasks.find((task) => task.id === params?.value);
    // const taskIsReady = checkTimeIsAllowed(currentTask?.activation_time);
    // const currentCharPic = chars.find(
    //     (char) => char.id === currentTask?.id
    // )?.pic;

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
            {/* {currentTask && (
                <Div style={{ paddingTop: 0 }}></Div>
            )} */}
        </ModalPage>
    );
};

export { HeroModal };
