import { classNames, Div, PopoutWrapper, Spacing } from "@vkontakte/vkui";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import css from "./GameDone.module.css";
import ticketImage from '../../assets/img/ticket-icon.svg'

export const GameDone = ({ onClick }: { onClick: () => void }) => {
    return (
        <PopoutWrapper>
        <Div className={classNames(css["game-done"])}>
            <img width={110} className={css["game-done__ticket"]} src={ticketImage} alt="" />
            <Spacing size={30} />
            <Title
                align="center"
                color="white"
                className={css["game-done__title"]}
            >
                Ура, задание пройдено! <br />
                Билетик ваш!
            </Title>
            <Button
                className={css["game-done__button"]}
                onClick={onClick}
            >
                Забрать
            </Button>
        </Div>
        </PopoutWrapper>
    );
};
