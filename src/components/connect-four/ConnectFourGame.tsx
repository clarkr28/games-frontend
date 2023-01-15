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
            {showGameResult(gameStatus) && (
                <div>{gameResultText(gameStatus)}</div>
            )}
        </>
    );
};

function showGameResult(status: C4GameStatus): boolean {
    return status !== C4GameStatus.New && status !== C4GameStatus.InProgress;
}

function gameResultText(status: C4GameStatus): string {
    if (status === C4GameStatus.NoWin) {
        return "No Winner";
    }
    if (status === C4GameStatus.WinBlack) {
        return "Black Wins!";
    }
    if (status === C4GameStatus.WinRed) {
        return "Red Wins!";
    }
    return "";
}
