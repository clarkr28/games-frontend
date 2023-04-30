import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRect, applyPresetToBoard, createInitialBoard, makeNextGeneration, processBoardResize, toggleBoardCell } from "../assets/LifeResources";
import { RootState } from "../app/store";
import { Point } from "../assets/ConnectFourResources";
import { LifeCellState, LifePresets } from "../assets/LifePatternResources";

export interface LifeState {
    board: LifeCellState[][];
    measurePerformance: boolean;
    /** these cells are probably alive, but could be dead and could be out of bounds */
    liveCellKeys: string[];
    presetSelection: LifePresets | null;
    hoverPoint: Point | null;
    boardWithHover: LifeCellState[][] | null;
}

const initialState: LifeState = {
    board: createInitialBoard(),
    measurePerformance: false,
    liveCellKeys: [],
    presetSelection: null,
    hoverPoint: null,
    boardWithHover: null,
};

export const lifeSlice = createSlice({
    name: 'life',
    initialState,
    reducers: {
        advanceGeneration: (state) => {
            const startTime = new Date();
            [state.board, state.liveCellKeys] = makeNextGeneration(state.board, state.liveCellKeys);
            if (state.presetSelection !== null && state.hoverPoint) {
                // now that the board has been updated, reapply the preset hovering if necessary
                let unused: string[] = [];
                [state.boardWithHover, unused] = applyPresetToBoard(state.board, state.hoverPoint, state.presetSelection, true);
            }
            if (state.measurePerformance) {
                const diff = new Date().getTime() - startTime.getTime();
                console.log(diff);
            }
        },
        toggleCell: (state, action: PayloadAction<Point>) => {
            if (state.presetSelection !== null) {
                // a preset is selected, so apply the preset to the board
                let newEncodedCells: string[] = [];
                [state.board, newEncodedCells] = applyPresetToBoard(state.board, action.payload, state.presetSelection, false);
                state.liveCellKeys = [...state.liveCellKeys, ...newEncodedCells];
                state.boardWithHover = null;
                state.presetSelection = null;
            } else {
                // no preset is selected, just toggle the clicked cell
                [state.board, state.liveCellKeys] = toggleBoardCell(state.board, state.liveCellKeys, action.payload);
            }
        },
        boardResize: (state, action: PayloadAction<IRect>) => {
            state.board = processBoardResize(state.board, action.payload);
        },
        pickPreset: (state, action: PayloadAction<LifePresets>) => {
            state.presetSelection = action.payload;
        },
        presetHoverCell: (state, action: PayloadAction<Point>) => {
            if (state.presetSelection !== null) {
                state.hoverPoint = action.payload;
                let unused: string[] = [];
                [state.boardWithHover, unused] = applyPresetToBoard(state.board, action.payload, state.presetSelection, true);
            }
        }
    }
});

export const {advanceGeneration, toggleCell, boardResize, pickPreset, presetHoverCell}= lifeSlice.actions;

export const selectLifeBoard = (state: RootState) => state.life.boardWithHover || state.life.board;
export const selectPreset = (state: RootState) => state.life.presetSelection;

export default lifeSlice.reducer;