import React, { useState } from "react";
import { C4CellState } from "../../assets/ConnectFourResources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./ConnectFourStyles.module.css";

export interface IConnectFourCellProps {
    cellState: C4CellState;
    isHovering?: boolean;
}

export const ConnectFourCell: React.FC<IConnectFourCellProps> = ({
    cellState,
    isHovering,
}) => {
    const classes = `${styles.gridCell} ${
        isHovering ? styles.gridCellHovering : ""
    }`;

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
