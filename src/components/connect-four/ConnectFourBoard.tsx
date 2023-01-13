import React from "react";
import { C4_COLS, C4_ROWS } from "../../assets/ConnectFourResources";
import { ConnectFourCell } from "./ConnectFourCell";
import styles from "./ConnectFourStyles.module.css";

export const ConnectFourBoard: React.FC<{}> = (props) => {
    const numCells = C4_COLS * C4_ROWS;
    const cells: JSX.Element[] = [];
    for (let i = 0; i < numCells; i++) {
        cells.push(<ConnectFourCell />);
    }

    return (
        <div className={styles.boardContainer}>
            <div className={styles.boardGrid}>{cells}</div>
        </div>
    );
};
