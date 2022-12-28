import React, { useCallback } from 'react';
import './TicTacToeBoardStyles.css';
import { CellState } from '../../assets/TicTacToeResources';

export interface ITicTacToeBoardProps {
    boardState: CellState[];
    performMove: (index: number, value: CellState) => Promise<void>;
}

export const TicTacToeBoard: React.FC<ITicTacToeBoardProps> = (props) => {
    const {boardState, performMove} = props;

    return (
        <div className='boardContainer'>
            <TicTacToeBoardRow startIndex={0} boardState={boardState} performMove={performMove}/>
            <div className='rowDivider'/>
            <TicTacToeBoardRow startIndex={3} boardState={boardState} performMove={performMove}/>
            <div className='rowDivider'/>
            <TicTacToeBoardRow startIndex={6} boardState={boardState} performMove={performMove}/>
        </div>
    );
}



interface ITicTacToeBoardRowProps {
    startIndex: number;
    boardState: CellState[];
    performMove: (index: number, value: CellState) => Promise<void>;
}

const TicTacToeBoardRow: React.FC<ITicTacToeBoardRowProps> = (props) => {
    const {startIndex, boardState, performMove} = props;
    const rowCells = boardState.slice(startIndex, startIndex + 3);

    return (
        <div className='boardRow'>
            {rowCells.map((cell: CellState, index: number) => 
                <div key={index} style={{display: 'flex'}}>
                    <TicTacToeBoardCell
                        cellValue={cell}
                        cellIndex={startIndex + index}
                        performMove={performMove}
                    />
                    {index < 2 && <div className='colDivider'/>}
                </div>
            )}
        </div>
    )
}



interface ITicTacToeBoardCellProps {
    cellValue: CellState;
    cellIndex: number;
    performMove: (index: number, value: CellState) => Promise<void>;
}

const TicTacToeBoardCell: React.FC<ITicTacToeBoardCellProps> = (props) => {
    const {cellValue, cellIndex, performMove } = props;

    /**
     * Handle the user clicking a cell on the board
     */
    const clickHandler = useCallback(() => {
        if (cellValue === CellState.Empty) {
            performMove(cellIndex, CellState.X);
        }
    }, [cellValue, cellIndex, performMove]);

    return (
        <div 
            className={`boardCell ${cellValue === CellState.Empty ? 'cellEmptyHover' : ''}`}
            onClick={clickHandler}
        >
            {cellValue === CellState.Empty ? null
                : cellValue === CellState.X ? 'X'
                    : 'O'}
        </div>
        );
}
