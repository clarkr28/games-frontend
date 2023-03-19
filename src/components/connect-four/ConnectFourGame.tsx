import React from "react";
import { ConnectFourBoard } from "./ConnectFourBoard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    reset,
    selectC4NextTurnPlayer,
    selectC4Status,
} from "../../features/connectFourSlice";
import { C4GameStatus } from "../../assets/ConnectFourResources";
import styles from "./ConnectFourStyles.module.css";
import { ConnectFourStatus } from "./ConnectFourStatus";

export const ConnectFourGame: React.FC<{}> = (props) => {
    const gameStatus = useAppSelector(selectC4Status);
    const nextTurnPlayer = useAppSelector(selectC4NextTurnPlayer);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.gameContainer}>
            <ConnectFourBoard />
            <div className={styles.gameInfo}>
                <ConnectFourStatus
                    gameStatus={gameStatus}
                    nextTurnPlayer={nextTurnPlayer}
                />
                <div>
                    <button
                        onClick={() => dispatch(reset())}
                        disabled={gameStatus === C4GameStatus.New}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};
