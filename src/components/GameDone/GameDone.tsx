import { classNames, Div, Spacing } from "@vkontakte/vkui";
import { Title } from "../Title/Title";
import css from "./GameDone.module.css";
import { Text } from "../Text/Text";
import { PlusBall } from "../PlusBall/PlusBall";

export const GameDone = ({ pic, text }: { pic?: string, text: string }) => {
    return (
        <Div className={classNames(css["game-done"])}>
            <img
                width={190}
                className={css["game-done__ticket"]}
                src={pic ? pic : 'assets/img/tasks/task-done-pic.png'}
                alt=""
            />
            <Spacing size={20} />
            <Title
                align="center"
                color="yellow"
                className={css["game-done__title"]}
            >Задание выполнено</Title>
            <Spacing size={5} />
            <Text
                align="center"
                color="white"
                className={css["game-done__title"]}
            >{text}</Text>
            <Spacing size={15} />
            <PlusBall />
        </Div>
    );
};
