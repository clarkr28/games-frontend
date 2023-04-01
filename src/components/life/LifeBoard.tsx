import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectLifeBoard, toggleCell } from "../../features/lifeSlice";
import { LifeCellStates } from "../../assets/LifeResources";
import { useDispatch } from "react-redux";
import styles from "./LifeStyles.module.css";

export const LifeBoard: React.FC<{}> = () => {
    const board = useAppSelector(selectLifeBoard);
    return (
        <div className={styles.gameGrid}>
            {board.map((row, rowInd) => (
                <div className={styles.gridRow} key={rowInd}>
                    {row.map((cell, colInd) => (
                        <LifeCell
                            key={colInd}
                            cellState={cell}
                            rowInd={rowInd}
                            colInd={colInd}
                        />
                    ))}
                </div>
            ))}
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

    const colorClass =
        cellState === LifeCellStates.Alive ? styles.alive : styles.dead;

    return (
        <div
            className={colorClass}
            onClick={() => dispatch(toggleCell({ X: colInd, Y: rowInd }))}
        />
    );
};
