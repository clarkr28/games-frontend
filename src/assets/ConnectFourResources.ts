
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

export interface Point {
    X: number;
    Y: number;
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

export function matchesVertical(board: C4CellState[][], startX: number, startY: number): Point[] {
    const matchValue = board[startX][startY];
    const x = startX;
    const matchingPoints: Point[] = [{X: startX, Y: startY}];

    // check up
    let y = startY + 1;
    while (y < C4_ROWS && board[x][y] === matchValue) {
        matchingPoints.push({X: x, Y: y});
        y++;
    }

    // check down
    y = startY - 1;
    while (y >= 0 && board[x][y] === matchValue) {
        matchingPoints.push({X: x, Y: y});
        y--;
    }

    return matchingPoints;
}

export function matchesHorizontal(board: C4CellState[][], startX: number, startY: number): Point[] {
    const matchValue = board[startX][startY];
    const y = startY;
    const matchingPoints: Point[] = [{X: startX, Y: startY}];

    // check to the right
    let x = startX + 1;
    while (x < C4_COLS && board[x][y] === matchValue) {
        matchingPoints.push({X: x, Y: y});
        x++;
    }

    // check to the left
    x = startX - 1;
    while (x >= 0 && board[x][y] === matchValue) {
        matchingPoints.push({X: x, Y: y});
        x--;
    }

    return matchingPoints;
}

/** return the number of matches on the top-right and bottom-left diagonal */
export function matchesTRBL(board: C4CellState[][], startX: number, startY: number): Point[] {
    const matchValue = board[startX][startY];
    const matchingPoints: Point[] = [{X: startX, Y: startY}];

    // check the top-right direction 
    let x = startX + 1, y = startY + 1;
    while (x < C4_COLS && y < C4_ROWS && board[x][y] === matchValue) {
        matchingPoints.push({X: x, Y: y});
        x++;
        y++;
    }

    // check the bottom-left direction 
    x = startX - 1, y = startY - 1;
    while (x >= 0 && y >= 0 && board[x][y] === matchValue) {
        matchingPoints.push({X: x, Y: y});
        x--;
        y--;
    }

    return matchingPoints;
}

/** return the number of matches on the bottom-right and top-left diagonal */
export function matchesBRTL(board: C4CellState[][], startX: number, startY: number): Point[] {
    const matchValue = board[startX][startY];
    const matchingPoints: Point[] = [{X: startX, Y: startY}];

    // check the bottom-right direction 
    let x = startX + 1, y = startY - 1;
    while (x < C4_COLS && y >= 0 && board[x][y] === matchValue) {
        matchingPoints.push({X: x, Y: y});
        x++;
        y--;
    }

    // check the top-left direction 
    x = startX - 1, y = startY + 1;
    while (x >= 0 && y < C4_ROWS && board[x][y] === matchValue) {
        matchingPoints.push({X: x, Y: y});
        x--;
        y++;
    }

    return matchingPoints;
}

/**
 * find the winning cells on the board
 * @param board the game board
 * @param lastMoveCol the column with the most recent move
 * @return locations of each winning cell, or null if no winner
 */
export function findWinningCells(board: C4CellState[][], lastMoveCol: number): Point[] | null {
    let lastMoveRow = board[lastMoveCol].indexOf(C4CellState.Empty) - 1;
    if (lastMoveRow === -1) {
        return null;  // error case, this shouldn't occur
    }
    if (lastMoveRow === -2) {
        // this happens when the last empty cell in a column is filled
        lastMoveRow = board[lastMoveCol].length - 1;
    }

    const matchValue = board[lastMoveCol][lastMoveRow];
    // there are four diagonals to check for 4 in a row
    // diag 1 - vertical
    let matches = matchesVertical(board, lastMoveCol, lastMoveRow);
    if (matches.length >= 4) {
        return matches;
    }

    // diag 2 - top-right and bottom-left 
    matches = matchesTRBL(board, lastMoveCol, lastMoveRow);
    if (matches.length >= 4){
        return matches;
    }

    // diag 3 - horizontal
    matches = matchesHorizontal(board, lastMoveCol, lastMoveRow);
    if (matches.length >= 4) {
        return matches;
    }

    // diag 4 - bottom-right and top-left
    matches = matchesBRTL(board, lastMoveCol, lastMoveRow);
    if (matches.length >= 4) {
        return matches;
    }

    return null;
}

/** return the status of the game after a move has been made */
export function calculateStatus(board: C4CellState[][], winningCells: Point[] | null): C4GameStatus {
    if (winningCells) {
        // return the win state based on what cells are the winning cells
        return board[winningCells[0].X][winningCells[0].Y] === C4CellState.Black ? C4GameStatus.WinBlack : C4GameStatus.WinRed;
    }

    // there aren't any winners, game is either still in progress or doesn't have a winner
    return isBoardFull(board) ? C4GameStatus.NoWin : C4GameStatus.InProgress;
}