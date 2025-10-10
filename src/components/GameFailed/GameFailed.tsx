import { classNames, Div, PopoutWrapper, Spacing } from "@vkontakte/vkui";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import css from "./GameFailed.module.css";
import failImage from "../../assets/img/tasks/task-fail-modal-pic.png";

export const GameFailed = ({
    reloadHandler,
    backHandler,
}: {
    reloadHandler: () => void;
    backHandler: () => void;
}) => {
    return (
        <PopoutWrapper>
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
                    color="white"
                    className={css["game-failed__title"]}
                >Увы, в этот раз не получилось. <br/>Попробуйте ещё раз! </Title>
                <Button
                    className={css["game-failed__button"]}
                    onClick={reloadHandler}
                >
                    Повторить попытку
                </Button>
                <Spacing size={15} />
                <Button color="transparent" onClick={backHandler}>
                    Попробую позже
                </Button>
            </Div>
        </PopoutWrapper>
    );
};
