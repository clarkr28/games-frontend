import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./IncrementChange.module.css";

export interface IncrementChangeProps {
    changeIncrement: number;
    tryChangeValue: (delta: number) => void;
}

export const IncrementChange: React.FC<IncrementChangeProps> = (props) => {
    const { changeIncrement, tryChangeValue } = props;

    const incrementCallback = () => tryChangeValue(changeIncrement);
    const decrementCallback = () => tryChangeValue(-1 * changeIncrement);

    return (
        <div className={styles.incrementChangeContainer}>
            <div
                className={`${styles.button} ${styles.incrementButton}`}
                onClick={incrementCallback}
            >
                <FontAwesomeIcon icon={solid("chevron-up")} />
            </div>
            <div>{changeIncrement}</div>
            <div
                className={`${styles.button} ${styles.decrementButton}`}
                onClick={decrementCallback}
            >
                <FontAwesomeIcon icon={solid("chevron-down")} />
            </div>
        </div>
    );
};
