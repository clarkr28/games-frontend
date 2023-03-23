import { Point } from "./ConnectFourResources";

export const LIFE_ROWS = 30;
export const LIFE_COLS = 30;

export enum LifeCellStates {
    Alive,
    Dead
}

export function createEmptyBoard(): LifeCellStates[][] {
    const board: LifeCellStates[][] = [];
    for (let i = 0; i < LIFE_ROWS; i++) {
        board.push(Array<LifeCellStates>(LIFE_COLS).fill(LifeCellStates.Dead));
    }
    return board;
}

export function createInitialBoard(): LifeCellStates[][] {
    return createEmptyBoard();
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

    const newBoard = createEmptyBoard();

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