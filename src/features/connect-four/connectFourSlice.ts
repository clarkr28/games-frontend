import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { C4CellState, C4GameStatus, C4_COLS, C4_ROWS, Point, calculateStatus, createEmptyBoard, findWinningCells } from '../../assets/ConnectFourResources';
import { RootState } from '../../app/store';

export interface ConnectFourState {
    board: C4CellState[][]; // board[x][y]
    nextTurn: C4CellState;
    status: C4GameStatus;
    winningCells: Point[] | null; 
}

const initialState: ConnectFourState = {
    board: createEmptyBoard(),
    nextTurn: C4CellState.Black,
    status: C4GameStatus.New,
    winningCells: null,
};

export const connectFourSlice = createSlice({
    name: 'connectFour',
    initialState,
    reducers: {
        recordMove: (state, action: PayloadAction<number>) => {
            if (action.payload < state.board.length) {
                // add the move to the bottommost empty cell
                for (let i = 0; i < state.board[action.payload].length; i++) {
                    if (state.board[action.payload][i] === C4CellState.Empty) {
                        state.board[action.payload][i] = state.nextTurn;
                        state.nextTurn = state.nextTurn === C4CellState.Black ? C4CellState.Red : C4CellState.Black;
                        state.winningCells = findWinningCells(state.board, action.payload);
                        state.status = calculateStatus(state.board, state.winningCells);
                        break;
                    }
                }
            }
        },
        reset: (state) => {
            state.board = initialState.board;
            state.nextTurn = initialState.nextTurn;
            state.status = initialState.status;
            state.winningCells = initialState.winningCells;
        }
    }
});

export const {recordMove, reset} = connectFourSlice.actions;

export const selectBoard = (state: RootState) => state.connectFour.board;
export const selectStatus = (state: RootState) => state.connectFour.status;
export const selectWinningCells = (state: RootState) => state.connectFour.winningCells;

export default connectFourSlice.reducer;