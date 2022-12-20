import React from 'react';
import './TicTacToeBoardStyles.css';
import { CellStates } from './resources';

export interface ITicTacToeBoardProps {
    boardState: CellStates[];
    performMove: (index: number, value: CellStates) => void;
}

export const TicTacToeBoard: React.FC<ITicTacToeBoardProps> = (props) => {
    const {boardState, performMove} = props;

    return (
        <div>
            <TicTacToeBoardRow startIndex={0} boardState={boardState} performMove={performMove}/>
            <TicTacToeBoardRow startIndex={3} boardState={boardState} performMove={performMove}/>
            <TicTacToeBoardRow startIndex={6} boardState={boardState} performMove={performMove}/>
        </div>
    );
}



interface ITicTacToeBoardRowProps {
    startIndex: number;
    boardState: CellStates[];
    performMove: (index: number, value: CellStates) => void;
}

const TicTacToeBoardRow: React.FC<ITicTacToeBoardRowProps> = (props) => {
    const {startIndex, boardState, performMove} = props;
    const rowCells = boardState.slice(startIndex, startIndex + 3);

    return (
        <div className='boardRow'>
            {rowCells.map((cell: CellStates, index: number) => 
                <TicTacToeBoardCell 
                    cellValue={cell} 
                    cellIndex={startIndex + index} 
                    performMove={performMove}
                />
            )}
        </div>
    )
}



interface ITicTacToeBoardCellProps {
    cellValue: CellStates;
    cellIndex: number;
    performMove: (index: number, value: CellStates) => void;
}

const TicTacToeBoardCell: React.FC<ITicTacToeBoardCellProps> = (props) => {
    const {cellValue, cellIndex, performMove} = props;

    return (<div onClick={() => performMove(cellIndex, CellStates.X)}>{cellValue}</div>);
}
