import React from "react";
import {
    C4CellState,
    C4GameStatus,
    C4_COLS,
} from "../../assets/ConnectFourResources";
import styles from "./ConnectFourStyles.module.css";
import { ConnectFourColumn } from "./ConnectFourColumn";
import { useAppSelector } from "../../app/hooks";
import { selectBoard, selectStatus } from "../../features/connectFourSlice";

export const ConnectFourBoard: React.FC<{}> = (props) => {
    const board = useAppSelector(selectBoard);
    const status = useAppSelector(selectStatus);

    const allowMoves =
        status === C4GameStatus.New || status === C4GameStatus.InProgress;

    return (
        <div className={styles.boardContainer}>
            <div className={styles.boardGrid}>
                {board.map((column: C4CellState[], index: number) => {
                    return (
                        <ConnectFourColumn
                            key={index}
                            cellStates={column}
                            columnIndex={index}
                            allowMoves={allowMoves}
                        />
                    );
                })}
            </div>
        </div>
    );
};
