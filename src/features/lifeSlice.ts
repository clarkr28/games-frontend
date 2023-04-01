import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRect, LifeCellStates, createInitialBoard, makeNextGeneration, processBoardResize, toggleBoardCell } from "../assets/LifeResources";
import { RootState } from "../app/store";
import { Point } from "../assets/ConnectFourResources";

export interface LifeState {
    board: LifeCellStates[][];
}

const initialState: LifeState = {
    board: createInitialBoard(),
};

export const lifeSlice = createSlice({
    name: 'life',
    initialState,
    reducers: {
        advanceGeneration: (state) => {
            state.board = makeNextGeneration(state.board);
        },
        toggleCell: (state, action: PayloadAction<Point>) => {
            state.board = toggleBoardCell(state.board, action.payload);
        },
        boardResize: (state, action: PayloadAction<IRect>) => {
            state.board = processBoardResize(state.board, action.payload);
        }
    }
});

export const {advanceGeneration, toggleCell, boardResize}= lifeSlice.actions;

export const selectLifeBoard = (state: RootState) => state.life.board;

export default lifeSlice.reducer;