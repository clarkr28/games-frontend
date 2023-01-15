
export const C4_ROWS = 6; // y in the coordinate plane
export const C4_COLS = 7; // x in the coordinate plane

/** connect four cell states */
export enum C4CellState {
    Empty = 0,
    Red = 1,
    Black = 2,
}

export enum C4GameStatus {
    New,
    InProgress,
    WinRed,
    WinBlack,
    NoWin,
}

/**
 * create an empty connect four board
 * @returns an empty connect four board, each inner array stores a column of the board
 */
export function createEmptyBoard() {
    const board: C4CellState[][] = [];
    for (let i = 0; i < C4_COLS; i++) {
        // add a column of empty cell states
        board.push(Array<C4CellState>(C4_ROWS).fill(C4CellState.Empty));
    }

    return board;
}

export function isBoardFull(board: C4CellState[][]): boolean {
    // only the top cell of every column needs to be checked
    return !board.some(column => column[column.length - 1] === C4CellState.Empty);
}

export function matchCountVertical(board: C4CellState[][], startX: number, startY: number): number {
    const matchValue = board[startX][startY];
    const x = startX;
    let matches = 1;

    // check up
    let y = startY + 1;
    while (y < C4_ROWS && board[x][y] === matchValue) {
        matches++;
        y++;
    }

    // check down
    y = startY - 1;
    while (y >= 0 && board[x][y] === matchValue) {
        matches++;
        y--;
    }

    return matches;
}

export function matchCountHorizontal(board: C4CellState[][], startX: number, startY: number): number {
    const matchValue = board[startX][startY];
    const y = startY;
    let matches = 1;

    // check to the right
    let x = startX + 1;
    while (x < C4_COLS && board[x][y] === matchValue) {
        matches++;
        x++;
    }

    // check to the left
    x = startX - 1;
    while (x >= 0 && board[x][y] === matchValue) {
        matches++;
        x--;
    }

    return matches;
}

/** return the number of matches on the top-right and bottom-left diagonal */
export function matchCountTRBL(board: C4CellState[][], startX: number, startY: number): number {
    const matchValue = board[startX][startY];
    let matches = 1;

    // check the top-right direction 
    let x = startX + 1, y = startY + 1;
    while (x < C4_COLS && y < C4_ROWS && board[x][y] === matchValue) {
        matches++;
        x++;
        y++;
    }

    // check the bottom-left direction 
    x = startX - 1, y = startY - 1;
    while (x >= 0 && y >= 0 && board[x][y] === matchValue) {
        matches++;
        x--;
        y--;
    }

    return matches;
}

/** return the number of matches on the bottom-right and top-left diagonal */
export function matchCountBRTL(board: C4CellState[][], startX: number, startY: number): number {
    const matchValue = board[startX][startY];
    let matches = 1;

    // check the bottom-right direction 
    let x = startX + 1, y = startY - 1;
    while (x < C4_COLS && y >= 0 && board[x][y] === matchValue) {
        matches++;
        x++;
        y--;
    }

    // check the top-left direction 
    x = startX - 1, y = startY + 1;
    while (x >= 0 && y < C4_ROWS && board[x][y] === matchValue) {
        matches++;
        x--;
        y++;
    }

    return matches;
}

export function calculateStatus(board: C4CellState[][], lastMoveCol: number): C4GameStatus {
    let lastMoveRow = board[lastMoveCol].indexOf(C4CellState.Empty) - 1;
    if (lastMoveRow === -1) {
        return C4GameStatus.NoWin;  // error case, this shouldn't occur
    }
    if (lastMoveRow === -2) {
        // this happens when the last empty cell in a column is filled
        lastMoveRow = board[lastMoveCol].length - 1;
    }

    const matchValue = board[lastMoveCol][lastMoveRow];
    // there are four diagonals to check for 4 in a row
    // diag 1 - vertical
    if (matchCountVertical(board, lastMoveCol, lastMoveRow) >= 4) {
        return matchValue === C4CellState.Black ? C4GameStatus.WinBlack : C4GameStatus.WinRed;
    }

    // diag 2 - top-right and bottom-left 
    if (matchCountTRBL(board, lastMoveCol, lastMoveRow) >= 4) {
        return matchValue === C4CellState.Black ? C4GameStatus.WinBlack : C4GameStatus.WinRed;
    }

    // diag 3 - horizontal
    if (matchCountHorizontal(board, lastMoveCol, lastMoveRow) >= 4) {
        return matchValue === C4CellState.Black ? C4GameStatus.WinBlack : C4GameStatus.WinRed;
    }

    // diag 4 - bottom-right and top-left
    if (matchCountBRTL(board, lastMoveCol, lastMoveRow) >= 4) {
        return matchValue === C4CellState.Black ? C4GameStatus.WinBlack : C4GameStatus.WinRed;
    }

    // there aren't any winners, game is either still in progress or doesn't have a winner
    return isBoardFull(board) ? C4GameStatus.NoWin : C4GameStatus.InProgress;
}