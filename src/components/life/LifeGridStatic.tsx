import React from "react";
import { LifeCellState } from "../../assets/LifePatternResources";
import styles from "./LifeStyles.module.css";

export interface LifeGridStaticProps {
    gridData: LifeCellState[][];
    clickCallback?: () => void;
}

export const LifeGridStatic: React.FC<LifeGridStaticProps> = (props) => {
    const { gridData, clickCallback } = props;

    const width = gridData.length > 0 ? gridData[0].length : 0;

    return (
        <div
            style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
            className={styles.lifeGridStatic}
            onClick={() => clickCallback && clickCallback()}
        >
            {gridData.map((row) =>
                row.map((cell) => (
                    <div
                        className={
                            cell === LifeCellState.Alive ? styles.alive : ""
                        }
                    ></div>
                ))
            )}
        </div>
    );
};
