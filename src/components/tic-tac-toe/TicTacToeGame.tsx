import React, { useCallback, useState } from 'react';
import { TicTacToeBoard } from './TicTacToeBoard';
import { CellStates, boardFull, getNextMove, makeEmptyBoard } from '../../assets/TicTacToeResources';

export const TicTacToeGame: React.FC<{}> = props => {
    const [boardState, setBoardState] = useState<CellStates[]>(makeEmptyBoard());

    /**
     * Make a move on the board
     * @param index the index of the value to set
     * @param value the value to set on the board
     */
    const performMove = useCallback(async (index: number, value: CellStates): Promise<void> => {
        let newBoard: CellStates[] = [...boardState];
        newBoard[index] = value;

        if (!boardFull(newBoard)) {
            // get the move from the opponent
            newBoard = await getNextMove(newBoard, CellStates.O);
        }
        setBoardState(newBoard);
    },[boardState]);
    
    return (
        <>
            <TicTacToeBoard boardState={boardState} performMove={performMove} />
            <button onClick={() => setBoardState(makeEmptyBoard())}>Reset</button>
        </>
    );
}