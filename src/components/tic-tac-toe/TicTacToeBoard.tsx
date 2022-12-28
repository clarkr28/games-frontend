import React, { useCallback } from 'react';
import './TicTacToeBoardStyles.css';
import { CellState } from '../../assets/TicTacToeResources';

export interface ITicTacToeBoardProps {
    boardState: CellState[];
    performMove: (index: number, value: CellState) => Promise<void>;
    /** true if the user can make a selection */
    canMakeMove: boolean;
}

export const TicTacToeBoard: React.FC<ITicTacToeBoardProps> = (props) => {
    const {boardState, performMove, canMakeMove} = props;

    return (
        <div className='boardContainer'>
            <TicTacToeBoardRow 
                startIndex={0} 
                boardState={boardState} 
                performMove={performMove} 
                canMakeMove={canMakeMove}
            />
            <div className='rowDivider'/>
            <TicTacToeBoardRow 
                startIndex={3} 
                boardState={boardState} 
                performMove={performMove} 
                canMakeMove={canMakeMove}
            />
            <div className='rowDivider'/>
            <TicTacToeBoardRow 
                startIndex={6} 
                boardState={boardState} 
                performMove={performMove} 
                canMakeMove={canMakeMove}
            />
        </div>
    );
}



interface ITicTacToeBoardRowProps {
    startIndex: number;
    boardState: CellState[];
    performMove: (index: number, value: CellState) => Promise<void>;
    /** true if the user can make a selection */
    canMakeMove: boolean;
}

const TicTacToeBoardRow: React.FC<ITicTacToeBoardRowProps> = (props) => {
    const {startIndex, boardState, performMove, canMakeMove} = props;
    const rowCells = boardState.slice(startIndex, startIndex + 3);

    return (
        <div className='boardRow'>
            {rowCells.map((cell: CellState, index: number) => 
                <div key={index} style={{display: 'flex'}}>
                    <TicTacToeBoardCell
                        cellValue={cell}
                        cellIndex={startIndex + index}
                        performMove={performMove}
                        canMakeMove={canMakeMove}
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
    /** true if the user can make a selection */
    canMakeMove: boolean;
}

const TicTacToeBoardCell: React.FC<ITicTacToeBoardCellProps> = (props) => {
    const {cellValue, cellIndex, performMove, canMakeMove} = props;

    /**
     * Handle the user clicking a cell on the board
     */
    const clickHandler = useCallback(() => {
        if (canUserMakeMove(canMakeMove, cellValue)) {
            performMove(cellIndex, CellState.X);
        }
    }, [cellValue, cellIndex, performMove, canMakeMove]);

    return (
        <div 
            className={`boardCell ${canUserMakeMove(canMakeMove, cellValue) ? 'cellEmptyHover' : ''}`}
            onClick={clickHandler}
        >
            {cellValue === CellState.Empty ? null
                : cellValue === CellState.X ? 'X'
                    : 'O'}
        </div>
        );
}

/**
 * determine if the user can pick this cell
 * @param canMakeMove true if the user is allowed to pick a cell
 * @param cellValue the current cell value
 * @returns true if the user is allowed to make their move on this cell
 */
function canUserMakeMove(canMakeMove: boolean, cellValue: CellState): boolean {
    return canMakeMove && cellValue === CellState.Empty;
}
