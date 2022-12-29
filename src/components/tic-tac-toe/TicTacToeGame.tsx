import React, { useCallback, useState } from 'react';
import { TicTacToeBoard } from './TicTacToeBoard';
import { CellState, GameStatus, TicTacToeState, boardEmpty, boardFull, copyGame, getNextMove, makeNewGame, recordMove } from '../../assets/TicTacToeResources';

export const TicTacToeGame: React.FC<{}> = props => {
    const [gameState, setGameState] = useState<TicTacToeState>(makeNewGame());

    /**
     * Make a move on the board
     * @param index the index of the value to set
     * @param value the value to set on the board
     */
    const performMove = useCallback(async (index: number, value: CellState): Promise<void> => {
        let nextGameState = recordMove(gameState, index, value);

        if (nextGameState.status === GameStatus.Playing) {
            // get the move from the opponent
            nextGameState = await getNextMove(nextGameState, CellState.O);
        }
        setGameState(nextGameState);
    },[gameState]);
    
    return (
        <>
            <TicTacToeBoard 
                gameState={gameState} 
                performMove={performMove} 
                canMakeMove={gameState.status === GameStatus.Playing}
            />
            <button 
                onClick={() => setGameState(makeNewGame())}
                disabled={boardEmpty(gameState.board)}
            >
                Reset
            </button>
            {gameState.status !== GameStatus.Playing && <div>{gameStatusDisplayText(gameState.status)}</div>}
        </>
    );
}

function gameStatusDisplayText(status: GameStatus): string {
    return status === GameStatus.NoWin ? "No Winner"
        : status === GameStatus.WinX ? "X Wins!"
            : status === GameStatus.WinO ? "O Wins!"
                : "";
}