import React, { useState, useEffect } from "react";
import { C4CellState, C4_ROWS, Point } from "../../assets/ConnectFourResources";
import { ConnectFourCell } from "./ConnectFourCell";
import styles from "./ConnectFourStyles.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    recordMove,
    selectC4WinningCells,
} from "../../features/connectFourSlice";

export interface IConnectFourColumn {
    cellStates: C4CellState[];
    columnIndex: number;
    allowMoves: boolean;
}

/* renders a single column in the connect four grid */
export const ConnectFourColumn: React.FC<IConnectFourColumn> = (props) => {
    const { cellStates, columnIndex, allowMoves } = props;
    const [isHovering, setIsHovering] = useState(false);
    const winningCells = useAppSelector(selectC4WinningCells);
    const dispatch = useAppDispatch();

    const classes = `${styles.columnGrid}`;

    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseEnter = () => {
        setIsHovering(allowMoves && hasEmptyCell(cellStates));
    };

    useEffect(() => {
        // if the last empty cell was just filled, stop the hovering effect
        if (!hasEmptyCell(cellStates)) {
            setIsHovering(false);
        }
    }, [cellStates]);

    useEffect(() => {
        // if moves are no longer allowed, stop the hovering effect
        if (!allowMoves) {
            setIsHovering(false);
        }
    }, [allowMoves]);

    // index 0 of cellStates should be the bottom of the column
    const cellsRenderOrder = cellStates.slice().reverse();

    return (
        <div
            className={classes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => allowMoves && dispatch(recordMove(columnIndex))}
        >
            {cellsRenderOrder.map((value: C4CellState, index: number) => {
                return (
                    <ConnectFourCell
                        key={index}
                        cellState={value}
                        isHovering={isHovering}
                        isWinner={isWiningCell(
                            winningCells,
                            columnIndex,
                            C4_ROWS - index - 1
                        )}
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

function isWiningCell(
    winningCells: Point[] | null,
    x: number,
    y: number
): boolean {
    if (!winningCells) {
        return false;
    }
    return winningCells.some((point) => point.X === x && point.Y === y);
}
