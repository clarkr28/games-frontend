import React from "react";
import { ConnectFourBoard } from "./ConnectFourBoard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    reset,
    selectNextTurnPlayer,
    selectStatus,
} from "../../features/connect-four/connectFourSlice";
import { C4GameStatus } from "../../assets/ConnectFourResources";
import styles from "./ConnectFourStyles.module.css";
import { ConnectFourStatus } from "./ConnectFourStatus";

export const ConnectFourGame: React.FC<{}> = (props) => {
    const gameStatus = useAppSelector(selectStatus);
    const nextTurnPlayer = useAppSelector(selectNextTurnPlayer);
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
