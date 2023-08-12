import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AvilaBoard, IAvilaTile, SAMPLE_TILES, SAMPLE_TILE_1, createEmptyBoard } from "../assets/avila/AvilaResources";
import { Point } from "../assets/ConnectFourResources";
import { RootState } from "../app/store";

export interface AvilaState {
    board: AvilaBoard;      // board[y][x]
    currentTurn: number;        // index of player's turn
    currentTile?: IAvilaTile;    // tile the current player has to play
    // status: creating party, playing, done
    playerPoints: number[];     // current score for all players
}

const initialState: AvilaState = {
    board: createEmptyBoard(5, 5),
    currentTurn: 0,
    playerPoints: [],
    currentTile: SAMPLE_TILE_1,
};

export const avilaSlice = createSlice({
    name: 'avila',
    initialState,
    reducers: {
        recordMove: (state, action: PayloadAction<Point>) => {
            const x = action.payload.X;
            const y = action.payload.Y;
            if (state.board[y][x] === undefined) {
                state.board[y][x] = state.currentTile;
                state.currentTile = SAMPLE_TILES[Math.floor(Math.random() * SAMPLE_TILES.length)];
            }    
        }
    }
});

export const { recordMove } = avilaSlice.actions;

export const selectAvilaBoard = (state: RootState) => state.avila.board;
export const selectAvilaCurrentTurn = (state: RootState) => state.avila.currentTurn;
export const selectAvilaCurrentTile = (state: RootState) => state.avila.currentTile;
export const selectAvilaScores = (state: RootState) => state.avila.playerPoints;

export default avilaSlice.reducer;