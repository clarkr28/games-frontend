import React, { useState } from 'react';
import { TicTacToeBoard } from './TicTacToeBoard';
import { CellStates } from './resources';

export const TicTacToeGame: React.FC<{}> = props => {
    const [boardState, setBoardState] = useState<CellStates[]>(Array(9).fill(CellStates.Empty));
    const [nextMove, setNextMove] = useState<CellStates>(CellStates.X);

    /**
     * Make a move on the board
     * @param index the index of the value to set
     * @param value the value to set on the board
     */
    const performMove = (index: number, value: CellStates): void => {
        setBoardState(currValues => {
            let newValues = [...currValues];
            newValues[index] = value;
            return newValues;
        });

        setNextMove(value === CellStates.X ? CellStates.O : CellStates.X);
    }
    
    return (
        <TicTacToeBoard boardState={boardState} performMove={performMove} nextMove={nextMove}/>
    );
}