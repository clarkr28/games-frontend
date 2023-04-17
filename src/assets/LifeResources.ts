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

/**
 * convert a point to its corresponding dictionary key
 * @param point the point to encode 
 * @param boardWidth the width of the board
 * @returns key to use in cell state dictionary
 */
export function encode(point: Point, boardWidth: number): string {
    /* x values have to be converted so 0 is in the middle of the board
     * to ensure values remain accurage as the board changes size */
    const xVal = point.X - Math.floor(boardWidth / 2);
    return `${xVal},${point.Y}`;
}

/** decode a dictionary key into its corresponding coordinate point
 * @param key the dictionary key to decode
 * @param boardWidth the width of the board
 * @return point coordinates for the dictionary key
 */
export function decode(key: string, boardWidth: number): Point {
    const tokens = key.split(",");
    return {X: parseInt(tokens[0]) + boardWidth / 2, Y: parseInt(tokens[1])};
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

/**
 * toggle a cell on the board
 * @param board the board of cells
 * @param liveCellKeys the list of live keys
 * @param point the point that was clicked
 * @returns [newBoard, newLiveCellKeys]
 */
export function toggleBoardCell(board: LifeCellStates[][], liveCellKeys: string[], point: Point): [LifeCellStates[][], string[]] {
    if (point.Y < board.length && point.X < board[0].length) {
        const newCellValue = board[point.Y][point.X] === LifeCellStates.Alive ? LifeCellStates.Dead : LifeCellStates.Alive;
        board[point.Y][point.X] = newCellValue;
        if (newCellValue === LifeCellStates.Alive) {
            liveCellKeys.push(encode(point, board[0].length));
        }
    }
    return [board, liveCellKeys];
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
    //
    // update width of board
    //
    const boardWidth = board[0].length * CELL_HEIGHT + board[0].length + 1; 
    const extraWidth = newSize.width - boardWidth;
    // colDiff is the number of cells that could be added to a row
    const colDiff = Math.floor(extraWidth / (CELL_HEIGHT + 1)); // +1 for cell border
    // we want to add a cell to both ends at a time to keep it symmetrical
    const pairedColDiff = Math.floor(colDiff / 2);
    if (pairedColDiff > 0) {
        // add columns
        for (let i = 0; i < board.length; i++) {
            board[i].push(...Array<LifeCellStates>(pairedColDiff).fill(LifeCellStates.Dead));
            board[i].unshift(...Array<LifeCellStates>(pairedColDiff).fill(LifeCellStates.Dead));
        }
    }
    if (pairedColDiff < 0) {
        // remove columns
        for (let i = 0; i < board.length; i++) {
            board[i].splice(board[i].length + pairedColDiff, pairedColDiff * -1);
            board[i].splice(0, pairedColDiff * -1);
        }
    }

    //
    // update height of board
    //
    const boardHeight = board.length * CELL_HEIGHT + board.length + 1; // board.length + 1 is for cell borders
    const extraHeight = newSize.height - boardHeight - 22; // 22 for the controls at the top
    // rowDiff is the number of rows that should be added or removed
    const rowDiff = Math.floor(extraHeight / (CELL_HEIGHT + 1)); // +1 for cell border
    if (rowDiff > 0) {
        // add rows 
        for (let i = 0; i < rowDiff; i++) {
            board.push(Array<LifeCellStates>(board[0].length).fill(LifeCellStates.Dead))
        }
    } else if (rowDiff < 0 && board.length > rowDiff * -1) {
        // remove rows
        board.splice(board.length + rowDiff, rowDiff * -1);
    }

    return board;
}