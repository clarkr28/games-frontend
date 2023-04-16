import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRect, LifeCellStates, createInitialBoard, makeNextGeneration, processBoardResize, toggleBoardCell } from "../assets/LifeResources";
import { RootState } from "../app/store";
import { Point } from "../assets/ConnectFourResources";

export interface LifeState {
    board: LifeCellStates[][];
    measurePerformance: boolean;
}

const initialState: LifeState = {
    board: createInitialBoard(),
    measurePerformance: false,
};

export const lifeSlice = createSlice({
    name: 'life',
    initialState,
    reducers: {
        advanceGeneration: (state) => {
            const startTime = new Date();
            state.board = makeNextGeneration(state.board);
            if (state.measurePerformance) {
                const diff = new Date().getTime() - startTime.getTime();
                console.log(diff);
            }
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