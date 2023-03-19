import { createSlice } from "@reduxjs/toolkit";
import { LifeCellStates, createInitialBoard, makeNextGeneration } from "../assets/LifeResources";
import { RootState } from "../app/store";

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
        }
    }
});

export const {advanceGeneration} = lifeSlice.actions;

export const selectLifeBoard = (state: RootState) => state.life.board;

export default lifeSlice.reducer;