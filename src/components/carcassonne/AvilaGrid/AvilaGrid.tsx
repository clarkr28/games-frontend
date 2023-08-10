import React from "react";
import { IAvilaTile } from "../../../assets/AvilaResources";
import styles from "./AvilaGrid.module.scss";
import { AvilaTile } from "../AvilaTile/AvilaTile";

export interface IAvilaGridProps {
    gridData: IAvilaTile[][];
}

export const AvilaGrid: React.FC<IAvilaGridProps> = (props) => {
    const { gridData } = props;

    return (
        <div className={styles.grid}>
            {gridData.map((gridRow) =>
                gridRow.map((cell) => <AvilaTile tile={cell} />)
            )}
        </div>
    );
};
