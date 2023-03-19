import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { advanceGeneration } from "../../features/lifeSlice";
import { LifeBoard } from "./LifeBoard";

export const LifeGame: React.FC<{}> = () => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <button onClick={() => dispatch(advanceGeneration())}>
                Advance
            </button>
            <LifeBoard />
        </div>
    );
};
