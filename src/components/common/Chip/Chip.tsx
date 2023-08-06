import React from "react";
import styles from "./Chip.module.scss";
import { ChipValue } from "../../../assets/ChipResources";

export const CHIP_WIDTH = 60; // pixels
export const CHIP_HEIGHT = 60; // pixels

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
