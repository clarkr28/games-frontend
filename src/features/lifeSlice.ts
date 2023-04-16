import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRect, LifeCellStates, makeNextGeneration, processBoardResize, toggleBoardCell, transformBoardToData } from "../assets/LifeResources";
import { RootState } from "../app/store";
import { Point } from "../assets/ConnectFourResources";

export interface LifeState {
    boardData: Map<string, LifeCellStates>;
    boardWidth: number;
    boardHeight: number;
}

const initialState: LifeState = {
    boardData: new Map<string, LifeCellStates>(),
    boardWidth: 10,
    boardHeight: 10,
};

export const lifeSlice = createSlice({
    name: 'life',
    initialState,
    reducers: {
        advanceGeneration: (state) => {
            state.boardData = makeNextGeneration(state.boardData, state.boardWidth, state.boardHeight);
        },
        toggleCell: (state, action: PayloadAction<Point>) => {
            const boardPoint = transformBoardToData(action.payload, state.boardWidth);
            state.boardData = toggleBoardCell(state.boardData, boardPoint);
        },
        boardResize: (state, action: PayloadAction<IRect>) => {
            // separate functions will be needed for resizing width and height
            //state.board = processBoardResize(state.board, action.payload);
        }
    }
});

export const {advanceGeneration, toggleCell, boardResize}= lifeSlice.actions;

export const selectLifeBoard = (state: RootState) => state.life.boardData;
export const selectBoardHeight = (state: RootState) => state.life.boardHeight;
export const selectBoardWidth = (state: RootState) => state.life.boardWidth;

export default lifeSlice.reducer;