import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRect, LifeCellStates, createInitialBoard, makeNextGeneration, processBoardResize, toggleBoardCell } from "../assets/LifeResources";
import { RootState } from "../app/store";
import { Point } from "../assets/ConnectFourResources";

export interface LifeState {
    board: LifeCellStates[][];
    measurePerformance: boolean;
    /** these cells are probably alive, but could be dead and could be out of bounds */
    liveCellKeys: string[];
}

const initialState: LifeState = {
    board: createInitialBoard(),
    measurePerformance: true,
    liveCellKeys: [],
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
            [state.board, state.liveCellKeys] = toggleBoardCell(state.board, state.liveCellKeys, action.payload);
        },
        boardResize: (state, action: PayloadAction<IRect>) => {
            state.board = processBoardResize(state.board, action.payload);
        }
    }
});

export const {advanceGeneration, toggleCell, boardResize}= lifeSlice.actions;

export const selectLifeBoard = (state: RootState) => state.life.board;

export default lifeSlice.reducer;