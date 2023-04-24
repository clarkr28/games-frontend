import { Point } from "./ConnectFourResources";
import { LifePresets, getPresetData } from "./LifePatternResources";

export const LIFE_ROWS = 30;
export const LIFE_COLS = 30;
export const CELL_HEIGHT = 15; // pixel height (and width) of a game square

export interface IRect {
    width: number;
    height: number;
}

export enum LifeCellStates {
    Alive,
    Dead,
    HoverPreset,
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
 * create a deep copy of the passed board 
 * @param board the board to copy
 * @returns a deep copy of the passed board
 */
export function copyBoard(board: LifeCellStates[][]): LifeCellStates[][] {
    const newBoard: LifeCellStates[][] = [];
    board.forEach((row) => newBoard.push(new Array<LifeCellStates>(...row)));
    return newBoard;
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

/**
 * determine the number of live neighbors that a point has on the board
 * @param board the game board to compute with
 * @param y the y coordinate on the board to compute
 * @param x the x coordinate on the board to compute
 * @returns the number of live neighbors that the point has on the board
 */
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

/**
 * compute the next generation 
 * @param board the board to base the next generation off of
 * @param liveCells encoded keys of the cells that are alive (to improve performance)
 * @returns [newBoard, newLiveCellKeys]
 */
export function makeNextGeneration(board: LifeCellStates[][], liveCells: string[]): [LifeCellStates[][], string[]] {
    // treat cells after the walls as dead cells?

    const newBoard = createEmptyBoard(board.length, board[0].length);
    const newLiveCells: string[] = [];
    const processedKeys = new Map<string, boolean>(); // value doesn't matter, having a key means it's processed

    liveCells.forEach(key => {
        processCellAndNeighbors(board, newBoard, key, processedKeys, newLiveCells);
    })

    return [newBoard, newLiveCells];
}

/**
 * for a given point on the board, process the next generation for that point and all its neighbors
 * @param oldBoard the previous generation 
 * @param newBoard the new generation 
 * @param key the encoded key of the cell to process 
 * @param processedKeys a map of keys that have already been processed
 * @param newLiveKeys a list of the new keys that are alive
 */
function processCellAndNeighbors(
    oldBoard: LifeCellStates[][], 
    newBoard: LifeCellStates[][], 
    key: string,
    processedKeys: Map<string, boolean>,
    newLiveKeys: string[]
): void {
    const point = decode(key, oldBoard[0].length);
    // make sure the point is actually on the board
    if (point.X < 0 || point.X >= newBoard[0].length || point.Y >= newBoard.length) {
        return;
    }

    // if the cell isn't alive on the old board, I don't think we need to process it
    if (oldBoard[point.Y][point.X] !== LifeCellStates.Alive) {
        return;
    }

    // process the point and all its neighbors
    // offset[n] = [Y,X]
    const offsets: number[][] = [[0,0], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1]];
    offsets.forEach(offset => processCell({X: point.X + offset[1], Y: point.Y + offset[0]}, oldBoard, newBoard, processedKeys, newLiveKeys));
}

/**
 * compute the state of the passed cell for the next generation
 * @param cell the point to process on the board
 * @param oldBoard the previous generation
 * @param newBoard the generation currently being computed
 * @param processedKeys a map of keys that have already been processed
 * @param newLiveKeys list of live encoded keys in the new generation
 */
function processCell(
    cell: Point,
    oldBoard: LifeCellStates[][],
    newBoard: LifeCellStates[][],
    processedKeys: Map<string, boolean>,
    newLiveKeys: string[]
): void {
    // make sure the point is on the board
    if (cell.X < 0 || cell.X >= oldBoard[0].length || cell.Y < 0 || cell.Y >= oldBoard.length) { 
        return; 
    }

    // see if the point has already been processed
    const key = encode(cell, oldBoard[0].length);
    if (processedKeys.has(key)) { 
        return; 
    }
    processedKeys.set(key, true); // mark cell as processed

    const liveNeighbors = cellLiveNeighbors(oldBoard, cell.Y, cell.X);
    if (oldBoard[cell.Y][cell.X] === LifeCellStates.Alive && (liveNeighbors === 2 || liveNeighbors === 3)) {
        // any live cell with 2 or 3 live neighbors lives
        newBoard[cell.Y][cell.X] = LifeCellStates.Alive;
        newLiveKeys.push(key);
    } 
    else if (oldBoard[cell.Y][cell.X] === LifeCellStates.Dead && liveNeighbors === 3) {
        // any dead cell with 3 live neighbors comes to life
        newBoard[cell.Y][cell.X] = LifeCellStates.Alive;
        newLiveKeys.push(key);
    }
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

/**
 * apply a preset to the board
 * @param board the board without any hover state applied
 * @param startPoint the point where the preset should be applied to the board
 * @param presetType the preset that should be applied
 * @param isHover true if the cell states should be set to hover display
 */
export function applyPresetToBoard(board: LifeCellStates[][], startPoint: Point, presetType: LifePresets, isHover: boolean): LifeCellStates[][] {
    const newBoard = copyBoard(board);
    const stateToSet = isHover ? LifeCellStates.HoverPreset : LifeCellStates.Alive;
    const presetData = getPresetData(presetType);
    newBoard[startPoint.Y][startPoint.X] = stateToSet;
    // TODO: actually apply the preset data
    return newBoard;
}