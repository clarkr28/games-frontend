import React from "react";
import { C4CellState, C4GameStatus } from "../../assets/ConnectFourResources";
import styles from "./ConnectFourStyles.module.css";

export enum DisplayColor {
    Red,
    Black,
    NoWinner,
}

export interface IConnectFourStatus {
    gameStatus: C4GameStatus;
    nextTurnPlayer: C4CellState;
}

export const ConnectFourStatus: React.FC<IConnectFourStatus> = (props) => {
    const { gameStatus, nextTurnPlayer } = props;

    const [text, color] = display(gameStatus, nextTurnPlayer);
    const iconColorClass =
        color === DisplayColor.Red
            ? styles.statusIconRed
            : color === DisplayColor.Black
            ? styles.statusIconBlack
            : styles.statusIconNoWinner;

    return (
        <div className={styles.gameStatus}>
            <div className={`${styles.statusIconShape} ${iconColorClass}`} />
            <div>{text}</div>
        </div>
    );
};

function display(
    gameStatus: C4GameStatus,
    nextTurn: C4CellState
): [string, DisplayColor] {
    if (gameStatus === C4GameStatus.WinBlack) {
        return ["Black wins!", DisplayColor.Black];
    }
    if (gameStatus === C4GameStatus.WinRed) {
        return ["Red wins!", DisplayColor.Red];
    }
    if (gameStatus === C4GameStatus.NoWin) {
        return ["No winner", DisplayColor.NoWinner];
    }
    // game is still in progress
    return nextTurn === C4CellState.Black
        ? ["Black's turn", DisplayColor.Black]
        : ["Red's turn", DisplayColor.Red];
}
