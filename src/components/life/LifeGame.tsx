import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
    advanceGeneration,
    boardResize,
    pickPreset,
} from "../../features/lifeSlice";
import { LifeBoard } from "./LifeBoard";
import styles from "./LifeStyles.module.css";
import { LifePresets } from "../../assets/LifePatternResources";

export const LifeGame: React.FC<{}> = () => {
    const shellRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [advanceTrigger, setAdvanceTrigger] = useState(0);
    const [interval, setInterval] = useState(200);

    const tripper = useCallback(() => {
        setAdvanceTrigger((val) => val + 1);
        dispatch(advanceGeneration());
    }, [dispatch]);

    useEffect(() => {
        if (isPlaying) {
            setTimeout(() => tripper(), interval);
        }
    }, [isPlaying, tripper, advanceTrigger]);

    const trySetInterval = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNum = parseInt(event.target.value);
        if (!isNaN(newNum) && newNum >= 0) {
            setInterval(newNum);
        }
    };

    /** add a resize observer to the outermost div */
    useEffect(() => {
        if (shellRef && shellRef.current) {
            const observer = new ResizeObserver(
                (entries: ResizeObserverEntry[]) => {
                    const width = entries[0].contentBoxSize[0].inlineSize;
                    const height = entries[0].contentBoxSize[0].blockSize;
                    dispatch(boardResize({ width: width, height: height }));
                }
            );

            observer.observe(shellRef.current);

            return () => observer.disconnect();
        }
    }, [shellRef]);

    return (
        <div className={styles.gameShell} ref={shellRef}>
            <button onClick={() => dispatch(advanceGeneration())}>
                Advance
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Stop" : "Start"}
            </button>
            <input value={interval} onChange={trySetInterval} />
            <button onClick={() => dispatch(pickPreset(LifePresets.Glider))}>
                Glider
            </button>
            <button onClick={() => dispatch(pickPreset(LifePresets.LWSH))}>
                LWSH
            </button>
            <button
                onClick={() => dispatch(pickPreset(LifePresets.CircleOfLife))}
            >
                Circle of Life
            </button>
            <LifeBoard />
        </div>
    );
};
