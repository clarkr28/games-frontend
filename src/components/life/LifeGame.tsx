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
    }, [setAdvanceTrigger, dispatch]);

    useEffect(() => {
        if (isPlaying) {
            setTimeout(() => tripper(), interval);
        }
    }, [isPlaying, tripper, advanceTrigger]);

    return (
        <div>
            <button onClick={() => dispatch(advanceGeneration())}>
                Advance
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Stop" : "Start"}
            </button>
            <input
                value={interval}
                onChange={(e) => setInterval(parseInt(e.target.value))}
            />
            <LifeBoard />
        </div>
    );
};
