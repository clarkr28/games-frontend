import React from "react";
import { CHIP_HEIGHT, CHIP_WIDTH, Chip } from "../Chip/Chip";
import styles from "./ChipStack.module.scss";
import { ChipValue } from "../../../assets/ChipResources";

const CHIP_OFFSET = 15; // offset (pixels) for stacked chips

export interface IChipStackProps {
    chips: ChipValue[];
}

export const ChipStack: React.FC<IChipStackProps> = (props) => {
    const { chips } = props;

    if (chips.length === 0) {
        return null;
    }

    return (
        <div
            className={styles.chipStack}
            style={{
                width: `${CHIP_WIDTH + CHIP_OFFSET * (chips.length - 1)}px`,
                height: `${CHIP_HEIGHT}px`,
            }}
        >
            {chips.map((chipVal, index) => (
                <div key={index} style={{ left: `${CHIP_OFFSET * index}px` }}>
                    <Chip value={chipVal} />
                </div>
            ))}
        </div>
    );
};
