import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
    selectBoardHeight,
    selectBoardWidth,
    selectLifeBoard,
    toggleCell,
} from "../../features/lifeSlice";
import { LifeCellStates, getCellState } from "../../assets/LifeResources";
import { useDispatch } from "react-redux";
import styles from "./LifeStyles.module.css";

export const LifeBoard: React.FC<{}> = () => {
    const board = useAppSelector(selectLifeBoard);
    const boardWidth = useAppSelector(selectBoardWidth);
    const boardHeight = useAppSelector(selectBoardHeight);

    const widthArray = Array<number>(boardWidth);
    const heightArray = Array<number>(boardHeight);

    return (
        <div className={styles.gameGrid}>
            {heightArray.map((_, rowInd) => (
                <div className={styles.gridRow} key={rowInd}>
                    {widthArray.map((_, colInd) => (
                        <LifeCell
                            key={colInd}
                            cellState={getCellState(
                                board,
                                { X: colInd, Y: rowInd },
                                boardWidth
                            )}
                            rowInd={rowInd}
                            colInd={colInd}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

interface LifeCellProps {
    cellState: LifeCellStates;
    rowInd: number;
    colInd: number;
}

const LifeCell: React.FC<LifeCellProps> = (props) => {
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
