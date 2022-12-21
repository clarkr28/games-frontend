import React, { useCallback } from 'react';
import './TicTacToeBoardStyles.css';
import { CellStates } from '../../assets/TicTacToeResources';

export interface ITicTacToeBoardProps {
    boardState: CellStates[];
    performMove: (index: number, value: CellStates) => Promise<void>;
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
    boardState: CellStates[];
    performMove: (index: number, value: CellStates) => Promise<void>;
}

const TicTacToeBoardRow: React.FC<ITicTacToeBoardRowProps> = (props) => {
    const {startIndex, boardState, performMove} = props;
    const rowCells = boardState.slice(startIndex, startIndex + 3);

    return (
        <div className='boardRow'>
            {rowCells.map((cell: CellStates, index: number) => 
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
    cellValue: CellStates;
    cellIndex: number;
    performMove: (index: number, value: CellStates) => Promise<void>;
}

const TicTacToeBoardCell: React.FC<ITicTacToeBoardCellProps> = (props) => {
    const {cellValue, cellIndex, performMove } = props;

    /**
     * Handle the user clicking a cell on the board
     */
    const clickHandler = useCallback(() => {
        if (cellValue === CellStates.Empty) {
            performMove(cellIndex, CellStates.X);
        }
    }, [cellValue, cellIndex, performMove]);

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
