import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AvilaBoard, AvilaGameStatus, AvilaPlayerColor, IAvilaPlayer, IAvilaTile, canPlaceTile, createEmptyBoard, createPlayer, expandBoard, rotateTile } from "../assets/avila/Resources";
import { Point } from "../assets/ConnectFourResources";
import { RootState } from "../app/store";
import { createTiles } from "../assets/avila/TileResources";

export interface AvilaState {
    board: AvilaBoard;              // board[y][x]
    currentTurn: number;            // index of player's turn
    currentTile?: IAvilaTile;       // tile the current player has to play
    remainingTiles: IAvilaTile[];   // remaining tiles in the deck
    status: AvilaGameStatus;        // game status
    playerData: IAvilaPlayer[];     // player data
}

const initialState: AvilaState = {
    board: createEmptyBoard(1, 1),
    currentTurn: 0,
    currentTile: undefined,
    remainingTiles: [],
    status: AvilaGameStatus.Pregame,
    playerData: [createPlayer(AvilaPlayerColor.Green), createPlayer(AvilaPlayerColor.Blue)],
};

export const avilaSlice = createSlice({
    name: 'avila',
    initialState,
    reducers: {
        recordMove: (state, action: PayloadAction<Point>) => {
            const x = action.payload.X;
            const y = action.payload.Y;
            if (state.currentTile && canPlaceTile(state.board, action.payload, state.currentTile)) {
                // place the tile on the board
                state.board[y][x] = state.currentTile;
                state.board = expandBoard(state.board, action.payload);
                // set the next tile
                state.currentTile = state.remainingTiles.pop();
                state.remainingTiles = [...state.remainingTiles];
                // advance turn to the next player
                state.currentTurn = (state.currentTurn + 1) % state.playerData.length;
                console.log(`remaining tiles: ${state.remainingTiles.length}`); // trying to debug issue
            }    
        },
        startGame: (state) => {
            state.status = AvilaGameStatus.Playing;
            // create the shuffled tiles and set the current tiles
            const tiles = createTiles(true, true);
            state.currentTile = tiles.pop(); 
            state.remainingTiles = tiles;
        },
        rotateCurrentTile: (state) => {
            if (state.currentTile) {
                state.currentTile = rotateTile(state.currentTile);
            }
        }
    }
});

export const { recordMove, startGame, rotateCurrentTile } = avilaSlice.actions;

export const selectAvilaBoard = (state: RootState) => state.avila.board;
export const selectAvilaCurrentTurn = (state: RootState) => state.avila.currentTurn;
export const selectAvilaCurrentTile = (state: RootState) => state.avila.currentTile;
export const selectAvilaPlayerData = (state: RootState) => state.avila.playerData;
export const selectAvilaStatus = (state: RootState) => state.avila.status;

export default avilaSlice.reducer;