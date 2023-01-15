import React from "react";
import { C4CellState, C4_COLS } from "../../assets/ConnectFourResources";
import styles from "./ConnectFourStyles.module.css";
import { ConnectFourColumn } from "./ConnectFourColumn";
import { useAppSelector } from "../../app/hooks";
import { selectBoard } from "../../features/connect-four/connectFourSlice";

export const ConnectFourBoard: React.FC<{}> = (props) => {
    const board = useAppSelector(selectBoard);

    return (
        <div className={styles.boardContainer}>
            <div className={styles.boardGrid}>
                {board.map((column: C4CellState[], index: number) => {
                    return (
                        <ConnectFourColumn
                            key={index}
                            cellStates={column}
                            columnIndex={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};
