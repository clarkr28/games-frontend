
export const LIFE_ROWS = 5;
export const LIFE_COLS = 9;

export enum LifeCellStates {
    Alive,
    Dead
}

export function createEmptyBoard(): LifeCellStates[][] {
    const board: LifeCellStates[][] = [];
    for (let i = 0; i < LIFE_COLS; i++) {
        board.push(Array<LifeCellStates>(LIFE_ROWS).fill(LifeCellStates.Dead));
    }
    return board;
}

export function createInitialBoard(): LifeCellStates[][] {
    const board = createEmptyBoard();
    board[0][0] = LifeCellStates.Alive;
    return board;
}

export function makeNextGeneration(board: LifeCellStates[][]): LifeCellStates[][] {
    let foundX = -1;
    let foundY = -1;
    // find a cell that's alive 
    for (let i = 0; i < LIFE_COLS; i++) {
        for (let j = 0; j < LIFE_ROWS; j++) {
            if (board[i][j] == LifeCellStates.Alive) {
                foundX = i;
                foundY = j;
                break;
            }
        }
        
        if (foundX !== -1) {
            break;
        }
    }

    if (foundX !== -1) {
        // make the found cell dead and the next cell alive
        board[foundX][foundY] = LifeCellStates.Dead;
        if (foundY < board[0].length - 1) {
            board[foundX][foundY + 1] = LifeCellStates.Alive;
        } else {
            // advance to the next row
            const nextRow = (foundX + 1) % LIFE_COLS;
            board[nextRow][0] = LifeCellStates.Alive;
        }
    }

    return board;
}