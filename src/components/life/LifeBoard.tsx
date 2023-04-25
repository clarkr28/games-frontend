import React, { useCallback, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
    presetHoverCell,
    selectLifeBoard,
    selectPreset,
    toggleCell,
} from "../../features/lifeSlice";
import { useDispatch } from "react-redux";
import styles from "./LifeStyles.module.css";
import { LifeCellState } from "../../assets/LifePatternResources";

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
    cellState: LifeCellState;
    rowInd: number;
    colInd: number;
}

export const LifeCell: React.FC<ILifeCell> = (props) => {
    const { cellState, rowInd, colInd } = props;

    const dispatch = useDispatch();
    const selectedPreset = useAppSelector(selectPreset);
    const [isHovering, setIsHovering] = useState(false);

    const mouseEnterCallback = useCallback(() => {
        if (selectedPreset !== null) {
            dispatch(presetHoverCell({ X: colInd, Y: rowInd }));
        }
    }, [selectedPreset, dispatch]);

    return (
        <div
            className={cellStateToStyleClass(cellState)}
            onClick={() => dispatch(toggleCell({ X: colInd, Y: rowInd }))}
            onMouseEnter={mouseEnterCallback}
        />
    );
};

function cellStateToStyleClass(cellState: LifeCellState): string {
    switch (cellState) {
        case LifeCellState.Alive:
            return styles.alive;
        case LifeCellState.Dead:
            return styles.dead;
        case LifeCellState.HoverPreset:
            return styles.presetHovering;
    }
    return "";
}
