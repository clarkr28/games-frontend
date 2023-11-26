import React, { useEffect, useState } from "react";
import styles from "./LabeledValue.module.scss";

export interface ILabeledValue {
    label: string;
    value: number;
    animateChanges?: boolean;
}

export const LabeledValue: React.FC<ILabeledValue> = (props) => {
    const { label, value, animateChanges } = props;

    const [prevValue, setPrevValue] = useState(0);
    const [valueChange, setValueChange] = useState(0);

    useEffect(() => {
        const newScoreChange = value - prevValue;
        if (animateChanges && newScoreChange) {
            console.log(`someone got ${newScoreChange} points!`);
            setValueChange(newScoreChange);
            setPrevValue(value);
            setTimeout(() => {
                setValueChange(0);
            }, 3200);
        }
    }, [value, prevValue, animateChanges, setValueChange, setPrevValue]);

    const scoreChangeClasses: string[] = [];
    if (valueChange > 9) {
        scoreChangeClasses.push(styles.doubleDigit);
    }
    scoreChangeClasses.push(styles.scoreChangeDisplay);

    return (
        <div className={styles.wrapper}>
            <p>{`${label}: ${value}`}</p>
            {animateChanges && valueChange > 0 && (
                <p className={scoreChangeClasses.join(" ")}>
                    <strong>{`+${valueChange}`}</strong>
                </p>
            )}
        </div>
    );
};
