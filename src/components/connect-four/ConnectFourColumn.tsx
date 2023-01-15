import React, { useCallback, useState, useEffect } from "react";
import { C4CellState, C4_ROWS } from "../../assets/ConnectFourResources";
import { ConnectFourCell } from "./ConnectFourCell";
import styles from "./ConnectFourStyles.module.css";
import { useAppDispatch } from "../../app/hooks";
import { recordMove } from "../../features/connect-four/connectFourSlice";

export interface IConnectFourColumn {
    cellStates: C4CellState[];
    columnIndex: number;
}

/* renders a single column in the connect four grid */
export const ConnectFourColumn: React.FC<IConnectFourColumn> = (props) => {
    const { cellStates, columnIndex } = props;
    const [isHovering, setIsHovering] = useState(false);
    const dispatch = useAppDispatch();

    const classes = `${styles.columnGrid}`;

    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseEnter = useCallback(() => {
        setIsHovering(hasEmptyCell(cellStates));
    }, [cellStates]);

    useEffect(() => {
        if (!hasEmptyCell(cellStates)) {
            // if the last empty cell was just filled, stop the hovering effect
            setIsHovering(false);
        }
    }, [cellStates]);

    // index 0 of cellStates should be the bottom of the column
    const cellsRenderOrder = cellStates.slice().reverse();

    return (
        <div
            className={classes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => dispatch(recordMove(columnIndex))}
        >
            {cellsRenderOrder.map((value: C4CellState, index: number) => {
                return (
                    <ConnectFourCell
                        key={index}
                        cellState={value}
                        isHovering={isHovering}
                    />
                );
            })}
        </div>
    );
};

/**
 * determine if there is an empty cell
 * @param cells a column of cells to check if some are empty
 * @returns true if at least one cell is empty
 */
function hasEmptyCell(cells: C4CellState[]): boolean {
    return cells.indexOf(C4CellState.Empty) !== -1;
}
