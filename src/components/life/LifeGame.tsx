import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { advanceGeneration } from "../../features/lifeSlice";
import { LifeBoard } from "./LifeBoard";

export const LifeGame: React.FC<{}> = () => {
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

    return (
        <div>
            <button onClick={() => dispatch(advanceGeneration())}>
                Advance
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Stop" : "Start"}
            </button>
            <input value={interval} onChange={trySetInterval} />
            <LifeBoard />
        </div>
    );
};
