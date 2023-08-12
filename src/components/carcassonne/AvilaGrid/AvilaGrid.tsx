import React from "react";
import styles from "./AvilaGrid.module.scss";
import { AvilaTile } from "../AvilaTile/AvilaTile";
import { useAppSelector } from "../../../app/hooks";
import { selectAvilaBoard } from "../../../features/avilaSlice";
import { AvilaEmptyTile } from "../AvilaEmptyTile/AvilaEmptyTile";

export const AvilaGrid: React.FC<{}> = () => {
    const gridData = useAppSelector(selectAvilaBoard);

    return (
        <div className={styles.grid}>
            {gridData.map((gridRow, row) => (
                <div>
                    {gridRow.map((cell, col) =>
                        cell ? (
                            <AvilaTile tile={cell} />
                        ) : (
                            <AvilaEmptyTile row={row} col={col} />
                        )
                    )}
                </div>
            ))}
        </div>
    );
};
