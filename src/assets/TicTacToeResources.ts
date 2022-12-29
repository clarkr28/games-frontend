/** resources for tic tac toe */

export enum CellState {
    Empty = 0,
    X = 1,
    O = 2,
}

export enum GameStatus {
    Playing,
    WinX,
    WinO,
    NoWin,
}

export interface TicTacToeState {
    board: CellState[];
    status: GameStatus;
    winningInds: number[];
}

//#region Public Helper Functions

/**
 * @returns the state for a new game
 */
export function makeNewGame(): TicTacToeState {
    return  {
        board: Array(9).fill(CellState.Empty),
        status: GameStatus.Playing,
        winningInds: [],
    };
}

/**
 * determine if the board is full
 * @param board tac toe game state
 * @returns true if the board is full
 */
export function boardFull(board: CellState[]): boolean {
    return board.every(cell => cell !== CellState.Empty);
}

/**
 * determine if the board is empty
 * @param board tic tac toe game board
 * @returns true if the board is empty
 */
export function boardEmpty(board: CellState[]): boolean {
    return board.every(cell => cell === CellState.Empty);
}

/**
 * make a deep copy of the game state
 * @param gameState the game state to copy
 * @returns a deep copy of the game state
 */
export function copyGame(gameState: TicTacToeState): TicTacToeState {
    return {
        board: [...gameState.board],
        status: gameState.status,
        winningInds: [],
    }
}

/**
 * Perform a move on the board and upate game status
 * @param gameState the game state before the move has been made
 * @param index the index of the board to make the move
 * @param value the value to put at that board index
 * @returns a new game state object with the move applied
 */
export function recordMove(gameState: TicTacToeState, index: number, value: CellState): TicTacToeState {
    const newGameState = copyGame(gameState);
    newGameState.board[index] = value;
    const [status, winningIngs] = determineGameStatus(newGameState.board);
    newGameState.status = status; 
    newGameState.winningInds = winningIngs;
    return newGameState;
}

//#endregion
//#region Private Helper Functions

function serializeBoard(gameState: TicTacToeState): string {
    return gameState.board.map(cell => cell.toString()).join('');
}

function deserializeBoard(boardStr: string): CellState[] {
    let board: CellState[] = [];
    for (let i = 0; i < 9; i++) {
        const char = boardStr[i];
        if (char === '1') {
            board.push(CellState.X);
        }
        else if (char === '2') {
            board.push(CellState.O);
        }
        else {
            board.push(CellState.Empty);
        }
    }
    return board;
}

/**
 * based on the board, calculate the game's status
 * @param board the board to evaluate
 * @returns [GameStatus, winning cell indexes if winner is found]
 */
function determineGameStatus(board: CellState[]): [GameStatus, number[]]{
    // indexes to check for a winner
    const checkInds = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (let idx = 0; idx < checkInds.length; idx++) {
        const testInds = checkInds[idx];
        if (board[testInds[0]] === board[testInds[1]] && 
            board[testInds[1]] === board[testInds[2]] &&
            board[testInds[0]] !== CellState.Empty) {
                const status = board[testInds[0]] === CellState.O ? GameStatus.WinO : GameStatus.WinX;
                return [status, testInds];
            }
    }

    // if the board is full, it's a scratch game.  If the board isn't full, the game is still being played
    const status = boardFull(board) ? GameStatus.NoWin : GameStatus.Playing;
    return [status, []];
}

//#endregion
//#region API Calls 

const BaseRoute = 'http://localhost:5001'

/**
 * API request to get the next move
 * @param board the board to send to the backend to get the next move
 * @param nextPlayer the player that should make the next move
 * @returns a new board with the next move performed
 */
export async function getNextMove(gameState: TicTacToeState, nextPlayer: CellState): Promise<TicTacToeState> {
    const apiCall = `${BaseRoute}/nextmove/${serializeBoard(gameState)}/${nextPlayer.toString()}`;
    const response = await fetch(apiCall, {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' },
    });

    // see if API returned error
    if (response.status !== 200) {
        console.log(`error with call: ${apiCall}\nreturned: ${JSON.stringify(response)}`);
        return makeNewGame();
    }

    // process data from API response
    const data = await response.json();
    if ('board' in data) {
        const newBoard = deserializeBoard(data['board']);
        const [status, winningInds] = determineGameStatus(newBoard);
        return {
            board: newBoard,
            status: status,
            winningInds: winningInds,
        }
    }

    return makeNewGame();
}

//#endregion