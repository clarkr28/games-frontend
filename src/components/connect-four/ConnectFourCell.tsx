import React, { useState } from "react";
import { C4CellState } from "../../assets/ConnectFourResources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./ConnectFourStyles.module.css";

export const ConnectFourCell: React.FC<{}> = (props) => {
    const [cellState, setCellState] = useState(C4CellState.Empty);

    const handleClick = () => {
        setCellState((cellState) => {
            if (cellState === C4CellState.Empty) {
                return C4CellState.Black;
            }
            if (cellState === C4CellState.Black) {
                return C4CellState.Red;
            }
            return C4CellState.Empty; // cell must be red
        });
    };

    const classes = `${styles.gridCell} ${
        cellState === C4CellState.Empty ? styles.gridCellSelectable : ""
    }`;

    return (
        <div className={classes} onClick={handleClick}>
            {cellStateToDisplay(cellState)}
        </div>
    );
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
