import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AvilaBoard, AvilaGameStatus, AvilaPlayerColor, IAvilaPlayer, IAvilaTile, canPlaceTile, createEmptyBoard, createPlayer, expandBoard, rotateTile } from "../assets/avila/Resources";
import { Point } from "../assets/ConnectFourResources";
import { RootState } from "../app/store";
import { createTiles } from "../assets/avila/TileResources";

export interface AvilaState {
    board: AvilaBoard;              // board[y][x]
    currentTurn: number;            // index of player's turn
    currentTile?: IAvilaTile;       // tile the current player has to play
    lastTilePlaced?: Point;         // where the last tile was placed
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
    playerData: [createPlayer(AvilaPlayerColor.Green), createPlayer(AvilaPlayerColor.Blue), createPlayer(AvilaPlayerColor.Purple), createPlayer(AvilaPlayerColor.Red), createPlayer(AvilaPlayerColor.Yellow)],
};

export interface PlaceMeepleData {
    edgeIndex?: number;
    onMonestary?: boolean;
}

export const avilaSlice = createSlice({
    name: 'avila',
    initialState,
    reducers: {
        recordMove: (state, action: PayloadAction<Point>) => {
            const x = action.payload.X;
            const y = action.payload.Y;
            if (state.currentTile && canPlaceTile(state.board, action.payload, state.currentTile)) {
                // save the board width and height before placing the tile
                const startWidth = state.board[0].length;
                const startHeight = state.board.length;
                // place the tile on the board
                state.board[y][x] = state.currentTile;
                state.lastTilePlaced = action.payload;
                state.board = expandBoard(state.board, action.payload);
                // adjust the X value of the last placed tile if necessary
                if (state.lastTilePlaced.X === 0 && state.board[0].length > startWidth) {
                    state.lastTilePlaced.X++;
                }
                // adjust the Y value of the last placed tile if necessary
                if (state.lastTilePlaced.Y === 0 && state.board.length > startHeight) {
                    state.lastTilePlaced.Y++;
                }

                // set to placing meeple if they have one to place
                state.status = state.playerData[state.currentTurn].availableMeeple 
                    ? AvilaGameStatus.PlacingMeeple : AvilaGameStatus.TriggerFinishMove;
            }    
        },
        placeMeeple: (state, action: PayloadAction<PlaceMeepleData>) => {
            // TODO: make sure the meeple can actually be placed
            if (state.lastTilePlaced) {
                const { X, Y } = state.lastTilePlaced;
                state.board[Y][X]!.meeple = { 
                    playerIndex: state.currentTurn, 
                    playerColor: state.playerData[state.currentTurn].color,
                    edgeIndex: action.payload.edgeIndex,
                    onMonestary: action.payload.onMonestary,
                };

                // decrease meeple count for the player that placed it
                state.playerData[state.currentTurn].availableMeeple--; 

                // trigger advance turn to the next player
                state.status = AvilaGameStatus.TriggerFinishMove;
            }
        },
        finishMove: (state) => {
            // TODO: completed features should be scored
            // advance turn to the next player, set the next tile
            state.currentTurn = (state.currentTurn + 1) % state.playerData.length;
            state.currentTile = state.remainingTiles.pop();
            state.remainingTiles = [...state.remainingTiles];
            state.status = AvilaGameStatus.PlacingTile;
        },
        startGame: (state) => {
            state.status = AvilaGameStatus.PlacingTile;
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

export const { recordMove, startGame, rotateCurrentTile, finishMove, placeMeeple } = avilaSlice.actions;

export const selectAvilaBoard = (state: RootState) => state.avila.board;
export const selectAvilaCurrentTurn = (state: RootState) => state.avila.currentTurn;
export const selectAvilaCurrentTile = (state: RootState) => state.avila.currentTile;
export const selectAvilaPlayerData = (state: RootState) => state.avila.playerData;
export const selectAvilaStatus = (state: RootState) => state.avila.status;
export const selectAvilaLastTilePlaced = (state: RootState) => state.avila.lastTilePlaced;

export default avilaSlice.reducer;