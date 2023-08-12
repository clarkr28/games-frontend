import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AvilaBoard, AvilaPlayerColor, IAvilaPlayer, IAvilaTile, SAMPLE_TILES, SAMPLE_TILE_1, createEmptyBoard, createPlayer } from "../assets/avila/AvilaResources";
import { Point } from "../assets/ConnectFourResources";
import { RootState } from "../app/store";

export interface AvilaState {
    board: AvilaBoard;      // board[y][x]
    currentTurn: number;        // index of player's turn
    currentTile?: IAvilaTile;    // tile the current player has to play
    // status: creating party, playing, done
    playerData: IAvilaPlayer[]; // player data
}

const initialState: AvilaState = {
    board: createEmptyBoard(5, 5),
    currentTurn: 0,
    currentTile: SAMPLE_TILE_1,
    playerData: [createPlayer(AvilaPlayerColor.Green), createPlayer(AvilaPlayerColor.Blue)],
};

export const avilaSlice = createSlice({
    name: 'avila',
    initialState,
    reducers: {
        recordMove: (state, action: PayloadAction<Point>) => {
            const x = action.payload.X;
            const y = action.payload.Y;
            if (state.board[y][x] === undefined) {
                // place the tile on the board
                state.board[y][x] = state.currentTile;
                // randomly pick the next tile for the next player
                state.currentTile = SAMPLE_TILES[Math.floor(Math.random() * SAMPLE_TILES.length)];
                // advance turn to the next player
                state.currentTurn = (state.currentTurn + 1) % state.playerData.length;
            }    
        }
    }
});

export const { recordMove } = avilaSlice.actions;

export const selectAvilaBoard = (state: RootState) => state.avila.board;
export const selectAvilaCurrentTurn = (state: RootState) => state.avila.currentTurn;
export const selectAvilaCurrentTile = (state: RootState) => state.avila.currentTile;
export const selectAvilaPlayerData = (state: RootState) => state.avila.playerData;

export default avilaSlice.reducer;