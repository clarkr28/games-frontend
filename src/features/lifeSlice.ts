import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRect, LifeCellStates, createInitialBoard, makeNextGeneration, processBoardResize, toggleBoardCell } from "../assets/LifeResources";
import { RootState } from "../app/store";
import { Point } from "../assets/ConnectFourResources";
import { LifePresets } from "../assets/LifePatternResources";

export interface LifeState {
    board: LifeCellStates[][];
    measurePerformance: boolean;
    /** these cells are probably alive, but could be dead and could be out of bounds */
    liveCellKeys: string[];
    presetSelection: LifePresets | null;
}

const initialState: LifeState = {
    board: createInitialBoard(),
    measurePerformance: false,
    liveCellKeys: [],
    presetSelection: null,
};

export const lifeSlice = createSlice({
    name: 'life',
    initialState,
    reducers: {
        advanceGeneration: (state) => {
            const startTime = new Date();
            [state.board, state.liveCellKeys] = makeNextGeneration(state.board, state.liveCellKeys);
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
        },
        pickPreset: (state, action: PayloadAction<LifePresets>) => {
            state.presetSelection = action.payload;
        }
    }
});

export const {advanceGeneration, toggleCell, boardResize, pickPreset}= lifeSlice.actions;

export const selectLifeBoard = (state: RootState) => state.life.board;
export const selectPreset = (state: RootState) => state.life.presetSelection;

export default lifeSlice.reducer;