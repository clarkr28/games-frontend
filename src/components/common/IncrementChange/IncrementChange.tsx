import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import styles from "./IncrementChange.module.css";

export interface IncrementChangeProps {
    changeIncrement: number;
    tryChangeValue: (delta: number) => void;
}

export const IncrementChange: React.FC<IncrementChangeProps> = (props) => {
    const { changeIncrement, tryChangeValue } = props;

    const incrementCallback = useCallback(() => {
        tryChangeValue(changeIncrement);
    }, [changeIncrement, tryChangeValue]);

    const decrementCallback = useCallback(() => {
        tryChangeValue(-1 * changeIncrement);
    }, [changeIncrement, tryChangeValue]);

    return (
        <div className={styles.incrementChangeContainer}>
            <div className={`${styles.button} ${styles.incrementButton}`}>
                <FontAwesomeIcon
                    onClick={incrementCallback}
                    icon={solid("chevron-up")}
                />
            </div>
            <div>{changeIncrement}</div>
            <div className={`${styles.button} ${styles.decrementButton}`}>
                <FontAwesomeIcon
                    onClick={decrementCallback}
                    icon={solid("chevron-down")}
                />
            </div>
        </div>
    );
};
