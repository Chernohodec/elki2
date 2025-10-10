import { classNames, Div, PopoutWrapper, Spacing } from "@vkontakte/vkui";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import css from "./GameCancel.module.css";
import cancelImage from "../../assets/img/tasks/task-cancel-modal-pic.png";

export const GameCancel = ({
    reloadHandler,
    backHandler,
}: {
    reloadHandler: () => void;
    backHandler: () => void;
}) => {
    return (
        <PopoutWrapper>
        <Div className={classNames(css["game-cancel"])}>
            <img
                width={220}
                className={css["game-cancel__ticket"]}
                src={cancelImage}
                alt=""
            />
            <Spacing size={30} />
            <Title
                align="center"
                color="white"
                className={css["game-cancel__title"]}
            >Хотите выйти<br/>из игры?</Title>
            <Button
                className={css["game-cancel__button"]}
                onClick={reloadHandler}
            >Продолжить игру</Button>
            <Spacing size={15} />
            <Button color="transparent" onClick={backHandler}>Выйти</Button>
        </Div>
        </PopoutWrapper>
    );
};
