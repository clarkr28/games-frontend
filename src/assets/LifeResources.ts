import { Point } from "./ConnectFourResources";

export const LIFE_ROWS = 30;
export const LIFE_COLS = 30;
export const CELL_HEIGHT = 15; // pixel height (and width) of a game square

export interface IRect {
    width: number;
    height: number;
}

export enum LifeCellStates {
    Alive,
    Dead
}

function createEmptyBoard(rows: number, columns: number): LifeCellStates[][] {
    const board: LifeCellStates[][] = [];
    for (let i = 0; i < rows; i++) {
        board.push(Array<LifeCellStates>(columns).fill(LifeCellStates.Dead));
    }
    return board;
}

export function createInitialBoard(): LifeCellStates[][] {
    return createEmptyBoard(30, 30);
}

export function toggleBoardCell(board: LifeCellStates[][], point: Point): LifeCellStates[][] {
    if (point.Y < board.length && point.X < board[0].length) {
        board[point.Y][point.X] = board[point.Y][point.X] === LifeCellStates.Alive ? LifeCellStates.Dead : LifeCellStates.Alive;
    }
    return board;
}

function cellLiveNeighbors(board: LifeCellStates[][], y: number, x: number): number {
    let liveCount = 0;

    for (let i = x - 1; i <= x + 1; i++) {
        // three above the cell
        if (y > 0 && i >= 0 && i < board[0].length && board[y-1][i] === LifeCellStates.Alive) {
            liveCount++;
        }

        // three below the cell
        if (y < board.length - 1 && i >= 0 && i < board[0].length && board[y+1][i] === LifeCellStates.Alive) {
            liveCount++;
        }
    }

    // left of cell
    if (x > 0 && board[y][x-1] === LifeCellStates.Alive) {
        liveCount++;
    }

    // right of cell
    if (x < board[0].length && board[y][x+1] === LifeCellStates.Alive) {
        liveCount++;
    }

    return liveCount;
}

export function makeNextGeneration(board: LifeCellStates[][]): LifeCellStates[][] {
    // treat cells after the walls as dead cells?

    const newBoard = createEmptyBoard(board.length, board[0].length);

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[0].length; x++) {
            const liveNeighbors = cellLiveNeighbors(board, y, x);
            if (board[y][x] === LifeCellStates.Alive) {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    // any live cell with fewer than two neighbor dies
                    // any live cell with more than 3 live neighbors dies
                    newBoard[y][x] = LifeCellStates.Dead;
                } else {
                    // any live cell with 2 or 3 live neighbors lives
                    newBoard[y][x] = LifeCellStates.Alive;
                }
            } else {
                // any dead cell with 3 live neighbors comes to life
                if (liveNeighbors === 3) {
                    newBoard[y][x] = LifeCellStates.Alive;
                }
            }
        }
    }

    return newBoard;
}

export function processBoardResize(board: LifeCellStates[][], newSize: IRect): LifeCellStates[][] {
    // TODO: update width of board

    // see if the height of the board needs to change
    const boardHeight = board.length * CELL_HEIGHT + board.length + 1; // board.length + 1 is for cell borders
    const extraHeight = newSize.height - boardHeight - 22; // 22 for the controls at the top
    const rowDiff = Math.floor(extraHeight / (CELL_HEIGHT + 1)); // +1 for cell border
    if (rowDiff > 0) {
        // add rows 
        for (let i = 0; i < rowDiff; i++) {
            board.push(Array<LifeCellStates>(LIFE_COLS).fill(LifeCellStates.Dead))
        }
    } else if (rowDiff < 0) {
        // remove rows
        board.splice(board.length + rowDiff, rowDiff * -1);
        // for (let i = 0; i < rowDiff * -1; i++) {
        //     if (board.length > 0) {
        //         delete board[board.length - 1];
        //         board.splice()
        //     }
        // }
    }

    return board;
}