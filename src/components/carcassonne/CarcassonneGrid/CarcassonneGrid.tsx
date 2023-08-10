import React from "react";
import { ICarcassonneTile } from "../../../assets/CarcassonneResources";
import styles from "./CarcassonneGrid.module.scss";
import { CarcassonneTile } from "../CarcassonneTile/CarcassonneTile";

export interface ICarcassonneGridProps {
    gridData: ICarcassonneTile[][];
}

export const CarcassonneGrid: React.FC<ICarcassonneGridProps> = (props) => {
    const { gridData } = props;

    return (
        <div className={styles.grid}>
            {gridData.map((gridRow) =>
                gridRow.map((cell) => <CarcassonneTile tile={cell} />)
            )}
        </div>
    );
};
