import React from "react";
import styles from "./Chip.module.scss";

export type ChipValue = 1 | 5 | 25 | 50 | 100;

export interface IChipProps {
    value: ChipValue;
}

export const Chip: React.FC<IChipProps> = ({ value }) => {
    return (
        <div className={`${styles.chip} ${chipValueToStyleClass(value)}`}>
            <div>{value}</div>
        </div>
    );
};

function chipValueToStyleClass(value: ChipValue): string {
    switch (value) {
        case 1:
            return styles.white;
        case 5:
            return styles.red;
        case 25:
            return styles.green;
        case 50:
            return styles.blue;
        case 100:
            return styles.black;
    }
}
