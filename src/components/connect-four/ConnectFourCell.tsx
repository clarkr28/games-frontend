import React, { useState } from "react";
import { C4CellState } from "../../assets/ConnectFourResources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./ConnectFourStyles.module.css";

export interface IConnectFourCellProps {
    cellState: C4CellState;
    isHovering?: boolean;
    isWinner?: boolean;
}

export const ConnectFourCell: React.FC<IConnectFourCellProps> = (props) => {
    const { cellState, isHovering, isWinner } = props;
    const classes = `${styles.gridCell} ${
        isHovering && !isWinner ? styles.gridCellHovering : ""
    } ${isWinner ? styles.cellWinner : ""}`;

    return <div className={classes}>{cellStateToDisplay(cellState)}</div>;
};

function cellStateToDisplay(state: C4CellState): JSX.Element | null {
    if (state === C4CellState.Black || state === C4CellState.Red) {
        const classes = `${styles.cellIcon} ${
            state === C4CellState.Red ? styles.red : ""
        }`;
        return <FontAwesomeIcon className={classes} icon={solid("circle")} />;
    }
    return null;
}
