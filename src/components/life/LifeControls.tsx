import React, { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { advanceGeneration } from "../../features/lifeSlice";
import styles from "./LifeStyles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faForwardStep,
    faPause,
} from "@fortawesome/free-solid-svg-icons";

const MaxSliderValue = 750;

export interface LifeControlsProps {
    isPlaying: boolean;
    setIsPlaying: (val: boolean) => void;
    interval: number;
    trySetInterval: (newInterval: number) => void;
}

export const LifeControls: React.FC<LifeControlsProps> = (props) => {
    const { isPlaying, setIsPlaying, interval, trySetInterval } = props;
    const dispatch = useAppDispatch();

    const onSliderChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newNum = parseInt(event.target.value);
            // the subtraction below makes the fast side the right side of the slider
            trySetInterval(MaxSliderValue - newNum);
        },
        [trySetInterval]
    );

    return (
        <div className={styles.lifeControls}>
            <a onClick={() => dispatch(advanceGeneration())}>
                <FontAwesomeIcon icon={faForwardStep} />
            </a>
            <a onClick={() => setIsPlaying(!isPlaying)}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </a>
            <input
                type="range"
                value={MaxSliderValue - interval}
                min="1"
                max={MaxSliderValue}
                onChange={onSliderChange}
            />
        </div>
    );
};
