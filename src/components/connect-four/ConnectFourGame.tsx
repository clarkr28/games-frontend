import React from "react";
import { ConnectFourBoard } from "./ConnectFourBoard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    reset,
    selectStatus,
} from "../../features/connect-four/connectFourSlice";
import { C4GameStatus } from "../../assets/ConnectFourResources";

export const ConnectFourGame: React.FC<{}> = (props) => {
    const gameStatus = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    return (
        <>
            <ConnectFourBoard />
            <button
                onClick={() => dispatch(reset())}
                disabled={gameStatus === C4GameStatus.New}
            >
                reset
            </button>
        </>
    );
};
