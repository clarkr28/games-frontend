import React, { useCallback } from 'react';
import './TicTacToeBoardStyles.css';
import { CellStates } from './resources';

export interface ITicTacToeBoardProps {
    boardState: CellStates[];
    performMove: (index: number, value: CellStates) => void;
    nextMove: CellStates;
}

export const TicTacToeBoard: React.FC<ITicTacToeBoardProps> = (props) => {
    const {boardState, performMove, nextMove} = props;

    return (
        <div className='boardContainer'>
            <TicTacToeBoardRow startIndex={0} boardState={boardState} performMove={performMove} nextMove={nextMove}/>
            <div className='rowDivider'/>
            <TicTacToeBoardRow startIndex={3} boardState={boardState} performMove={performMove} nextMove={nextMove}/>
            <div className='rowDivider'/>
            <TicTacToeBoardRow startIndex={6} boardState={boardState} performMove={performMove} nextMove={nextMove}/>
        </div>
    );
}



interface ITicTacToeBoardRowProps {
    startIndex: number;
    boardState: CellStates[];
    performMove: (index: number, value: CellStates) => void;
    nextMove: CellStates;
}

const TicTacToeBoardRow: React.FC<ITicTacToeBoardRowProps> = (props) => {
    const {startIndex, boardState, performMove, nextMove} = props;
    const rowCells = boardState.slice(startIndex, startIndex + 3);

    return (
        <div className='boardRow'>
            {rowCells.map((cell: CellStates, index: number) => 
                <>
                    <TicTacToeBoardCell
                        cellValue={cell}
                        cellIndex={startIndex + index}
                        performMove={performMove}
                        nextMove={nextMove}
                    />
                    {index < 2 && <div className='colDivider'/>}
                </>
            )}
        </div>
    )
}



interface ITicTacToeBoardCellProps {
    cellValue: CellStates;
    cellIndex: number;
    performMove: (index: number, value: CellStates) => void;
    nextMove: CellStates;
}

const TicTacToeBoardCell: React.FC<ITicTacToeBoardCellProps> = (props) => {
    const {cellValue, cellIndex, performMove, nextMove} = props;

    /**
     * Handle the user clicking a cell on the board
     */
    const clickHandler = useCallback(() => {
        if (cellValue === CellStates.Empty) {
            performMove(cellIndex, nextMove);
        }
    }, [cellValue, nextMove, cellIndex, performMove]);

    return (
        <div 
            className={`boardCell ${cellValue === CellStates.Empty ? 'cellEmptyHover' : ''}`}
            onClick={clickHandler}
        >
            {cellValue === CellStates.Empty ? null
                : cellValue === CellStates.X ? 'X'
                    : 'O'}
        </div>
        );
}
