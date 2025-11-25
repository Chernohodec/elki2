import { classNames, Div, Spacing } from "@vkontakte/vkui";
import { Text } from "../Text/Text";
import { Title } from "../Title/Title";
import css from "./GameFailed.module.css";
import failImage from "/assets/img/tasks/task-fail-modal-pic.png";

export const GameFailed = ({}: {
    reloadHandler: () => void;
    backHandler: () => void;
}) => {
    return (
        <Div className={classNames(css["game-failed"])}>
            <img
                width={220}
                className={css["game-failed__ticket"]}
                src={failImage}
                alt=""
            />
            <Spacing size={30} />
            <Title
                align="center"
                color="yellow"
                className={css["game-failed__title"]}
            >
                Свин зарылся в сугроб
            </Title>
            <Spacing size={7} />
            <Text align="center" color="white">
                Поймать Пига оказалось непросто, придется повторить попытку еще
                раз, но на этот раз будь более внимательным
            </Text>
            <Spacing size={10} />
        </Div>
    );
};
