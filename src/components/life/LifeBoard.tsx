import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectLifeBoard, toggleCell } from "../../features/lifeSlice";
import {
    LIFE_COLS,
    LIFE_ROWS,
    LifeCellStates,
} from "../../assets/LifeResources";
import { useDispatch } from "react-redux";
import { Point } from "../../assets/ConnectFourResources";

export const LifeBoard: React.FC<{}> = () => {
    const board = useAppSelector(selectLifeBoard);
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${LIFE_COLS}, 15px)`,
                fontSize: "20px",
            }}
        >
            {board.map((row, rowInd) =>
                row.map((cell, colInd) => (
                    <LifeCell
                        cellState={cell}
                        rowInd={rowInd}
                        colInd={colInd}
                    />
                ))
            )}
        </div>
    );
};

interface ILifeCell {
    cellState: LifeCellStates;
    rowInd: number;
    colInd: number;
}

export const LifeCell: React.FC<ILifeCell> = (props) => {
    const { cellState, rowInd, colInd } = props;
    const dispatch = useDispatch();
    return (
        <div onClick={() => dispatch(toggleCell({ X: colInd, Y: rowInd }))}>
            {cellState === LifeCellStates.Alive ? 1 : 0}
        </div>
    );
};
