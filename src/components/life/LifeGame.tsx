import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { advanceGeneration, boardResize } from "../../features/lifeSlice";
import { LifeBoard } from "./LifeBoard";
import styles from "./LifeStyles.module.css";
import { LifeControls } from "./LifeControls";
import { LifePresetControls } from "./LifePresetControls";

export const LifeGame: React.FC<{}> = () => {
    const shellRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [advanceTrigger, setAdvanceTrigger] = useState(0);
    const [interval, setInterval] = useState(375); // milliseconds

    const tripper = () => {
        setAdvanceTrigger((val) => val + 1);
        dispatch(advanceGeneration());
    };

    useEffect(() => {
        if (isPlaying) {
            setTimeout(() => tripper(), interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, tripper, advanceTrigger]);

    const trySetInterval = (newInterval: number) => {
        if (!isNaN(newInterval) && newInterval >= 0) {
            setInterval(newInterval);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shellRef]);

    return (
        <div className={styles.gameShell} ref={shellRef}>
            <LifeControls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                interval={interval}
                trySetInterval={trySetInterval}
            />
            <LifePresetControls />
            <LifeBoard />
        </div>
    );
};
