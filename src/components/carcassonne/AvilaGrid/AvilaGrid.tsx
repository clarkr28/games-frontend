import React from "react";
import styles from "./AvilaGrid.module.scss";
import { AvilaTile } from "../AvilaTile/AvilaTile";
import { AvilaEmptyTile } from "../AvilaEmptyTile/AvilaEmptyTile";
import { AvilaBoard } from "../../../assets/avila/Resources";

export interface IAvilaGridProps {
    gridData: AvilaBoard;
}

export const AvilaGrid: React.FC<IAvilaGridProps> = (props) => {
    const { gridData } = props;

    return (
        <div className={styles.grid}>
            {gridData.map((gridRow, row) => (
                <div key={row}>
                    {gridRow.map((cell, col) =>
                        cell ? (
                            <AvilaTile key={col} tile={cell} />
                        ) : (
                            <AvilaEmptyTile key={col} row={row} col={col} />
                        )
                    )}
                </div>
            ))}
        </div>
    );
};
