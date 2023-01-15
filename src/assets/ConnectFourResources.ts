
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