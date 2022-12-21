/** resources for tic tac toe */

export enum CellStates {
    Empty = 0,
    X = 1,
    O = 2,
}

//#region Public Helper Functions

/**
 * create a new board
 * @returns an array of empty cell states
 */
export function makeEmptyBoard(): CellStates[] {
    return Array(9).fill(CellStates.Empty);
}

/**
 * determine if the board is full
 * @param board tic tac toe game board
 * @returns true if the board is full
 */
export function boardFull(board: CellStates[]): boolean {
    return board.every(cell => cell !== CellStates.Empty);
}

//#endregion
//#region Private Helper Functions

function serializeBoard(board: CellStates[]): string {
    return board.map(cell => cell.toString()).join('');
}

function deserializeBoard(boardStr: string): CellStates[] {
    let board: CellStates[] = [];
    for (let i = 0; i < 9; i++) {
        const char = boardStr[i];
        if (char === '1') {
            board.push(CellStates.X);
        }
        else if (char === '2') {
            board.push(CellStates.O);
        }
        else {
            board.push(CellStates.Empty);
        }
    }
    return board;
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
export async function getNextMove(board: CellStates[], nextPlayer: CellStates): Promise<CellStates[]> {
    const apiCall = `${BaseRoute}/nextmove/${serializeBoard(board)}/${nextPlayer.toString()}`;
    const response = await fetch(apiCall, {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' },
    });

    // see if API returned error
    if (response.status !== 200) {
        console.log(`error with call: ${apiCall}\nreturned: ${JSON.stringify(response)}`);
        return makeEmptyBoard();
    }

    // process data from API response
    const data = await response.json();
    if ('board' in data) {
        return deserializeBoard(data['board']);
    }

    return makeEmptyBoard();
}

//#endregion