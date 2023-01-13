import React, { useCallback, useState } from "react";
import { C4CellState, C4_ROWS } from "../../assets/ConnectFourResources";
import { ConnectFourCell } from "./ConnectFourCell";
import styles from "./ConnectFourStyles.module.css";

/* renders a single column in the connect four grid */
export const ConnectFourColumn: React.FC<{}> = (props) => {
    const [cells, setCells] = useState(
        Array<C4CellState>(C4_ROWS).fill(C4CellState.Empty)
    );
    const [isHovering, setIsHovering] = useState(false);

    const classes = `${styles.columnGrid}`;

    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseEnter = useCallback(() => {
        setIsHovering(hasEmptyCell(cells));
    }, [cells]);

    const handleClick = useCallback(() => {
        const newCells = fillBottomCell(cells);
        if (!hasEmptyCell(newCells)) {
            // if the last empty cell was just filled, stop the hovering effect
            setIsHovering(false);
        }
        setCells(newCells);
    }, [cells]);

    return (
        <div
            className={classes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {cells.map((value: C4CellState, index: number) => {
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

function hasEmptyCell(cells: C4CellState[]): boolean {
    return cells.indexOf(C4CellState.Empty) !== -1;
}

function fillBottomCell(currCells: C4CellState[]): C4CellState[] {
    const newCells = [...currCells];
    // find the bottom-most empty cell and fill it
    for (let i = currCells.length - 1; i >= 0; i--) {
        if (newCells[i] === C4CellState.Empty) {
            newCells[i] =
                Math.random() > 0.5 ? C4CellState.Black : C4CellState.Red;
            break;
        }
    }
    return newCells;
}
