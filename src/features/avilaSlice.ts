import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AvilaBoard, AvilaGameStatus, IAvilaPlayer, IAvilaTile, IPlaceableMeepleLocations, addPlayer, canPlaceTile, completedFeatureSearch, createEmptyBoard, expandBoard, getPlaceableMeepleLocations, isFeatureOccupied, isMeeplePlaceable, rotateTile } from "../assets/avila/Resources";
import { Point } from "../assets/ConnectFourResources";
import { RootState } from "../app/store";
import { createTiles } from "../assets/avila/TileResources";
import { CommWrapper, IEndTurnData, IPlacedTileData, IStartGameData } from "../assets/avila/CommWrapper";

export interface AvilaState {
    board: AvilaBoard;              // board[y][x]
    currentTurn: number;            // index of player's turn
    currentTile?: IAvilaTile;       // tile the current player has to play
    lastTilePlaced?: Point;         // where the last tile was placed
    remainingTiles: IAvilaTile[];   // remaining tiles in the deck
    status: AvilaGameStatus;        // game status
    playerData: IAvilaPlayer[];     // player data
    roomCreated: boolean;           // true if this person created the room
    myPlayerIndex: number;          // the index this player is in the array of players
    isServerConnected: boolean;     // true if the client is successfully connected to the server
    placeableMeepleLocations?: IPlaceableMeepleLocations; // where meeples can be placed on the most recent tile
}

const initialState: AvilaState = {
    board: createEmptyBoard(1, 1),
    currentTurn: 0,
    currentTile: undefined,
    remainingTiles: [],
    status: AvilaGameStatus.Pregame,
    playerData: [],
    roomCreated: false,
    myPlayerIndex: 0,
    isServerConnected: false,
};

export interface PlaceMeepleData {
    edgeIndex?: number;
    onMonestary?: boolean;
}

export interface RoomCreatorData {
    name: string;
}

export interface AddPlayerData {
    name: string;
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

                // set to placing meeple if they have a meeple to place
                let nextGameStatus = state.playerData[state.currentTurn].availableMeeple 
                    ? AvilaGameStatus.PlacingMeeple : AvilaGameStatus.TriggerFinishMove;
                
                // see if it's even possible to place a meeple on the tile that was just placed
                if (nextGameStatus === AvilaGameStatus.PlacingMeeple) {
                    state.placeableMeepleLocations = getPlaceableMeepleLocations(state.board, state.lastTilePlaced);
                    if (!isMeeplePlaceable(state.placeableMeepleLocations)) {
                        // a meeple can't be placed on this tile, so finish the move
                        nextGameStatus = AvilaGameStatus.TriggerFinishMove;
                    }
                }

                // send tile placed message if game is waiting for user to place a meeple
                if (nextGameStatus === AvilaGameStatus.PlacingMeeple) {
                    CommWrapper.PlaceTile({
                        board: state.board,
                        lastTilePlaced: state.lastTilePlaced,
                    });
                }

                state.status = nextGameStatus;
            }    
        },
        placeMeeple: (state, action: PayloadAction<PlaceMeepleData>) => {
            if (state.lastTilePlaced) {
                const { X, Y } = state.lastTilePlaced;
                let meeplePlaced = false;
                if (action.payload.onMonestary) {
                    // the last tile placed was a monestary, we can assume the monestary is unoccupied
                    meeplePlaced = true;
                    state.board[Y][X]!.meeple = { 
                        playerIndex: state.currentTurn, 
                        playerColor: state.playerData[state.currentTurn].color,
                        edgeIndex: action.payload.edgeIndex,
                        onMonestary: action.payload.onMonestary,
                    };
                } else if (action.payload.edgeIndex !== undefined && !isFeatureOccupied(state.board, state.lastTilePlaced, action.payload.edgeIndex)) {
                    meeplePlaced = true;
                    state.board[Y][X]!.meeple = { 
                        playerIndex: state.currentTurn, 
                        playerColor: state.playerData[state.currentTurn].color,
                        edgeIndex: action.payload.edgeIndex,
                        onMonestary: action.payload.onMonestary,
                    };
                }

                if (meeplePlaced) {
                    // decrease meeple count for the player that placed it
                    state.playerData[state.currentTurn].availableMeeple--; 
                    // trigger advance turn to the next player
                    state.status = AvilaGameStatus.TriggerFinishMove;
                }
            }
        },
        finishMove: (state) => {
            if (state.lastTilePlaced) {
                const results = completedFeatureSearch(state.board, state.lastTilePlaced, state.playerData);
                if (results) {
                    state.board = results.newBoard;
                    state.playerData = results.newPlayerData;
                }
            }
            // advance turn to the next player, set the next tile
            state.currentTurn = (state.currentTurn + 1) % state.playerData.length;
            state.currentTile = state.remainingTiles.pop();
            state.remainingTiles = [...state.remainingTiles];
            state.placeableMeepleLocations = undefined;
            state.status = AvilaGameStatus.WaitingForTurn;

            CommWrapper.EndTurn({
                board: state.board,
                playerData: state.playerData,
                lastTilePlaced: state.lastTilePlaced!,
            });
        },
        startGame: (state) => {
            state.status = AvilaGameStatus.PlacingTile;
            // create the shuffled tiles and set the current tiles
            const tiles = createTiles(true);
            state.currentTile = tiles.pop(); 
            state.remainingTiles = tiles;

            CommWrapper.StartGame({
                currentTile: state.currentTile!,
                playerData: state.playerData,
                remainingTiles: state.remainingTiles,
            });
        },
        hostStartedGame: (state, action: PayloadAction<IStartGameData>) => {
            state.status = AvilaGameStatus.WaitingForTurn;
            state.currentTile = action.payload.currentTile;
            state.remainingTiles = action.payload.remainingTiles;
            state.playerData = action.payload.playerData;
        },
        rotateCurrentTile: (state) => {
            if (state.currentTile) {
                state.currentTile = rotateTile(state.currentTile);
            }
        },
        setRoomCreated: (state, action: PayloadAction<RoomCreatorData>) => {
            state.roomCreated = true;
            state.playerData = addPlayer(state.playerData, action.payload.name);
        },
        playerJoinedRoom: (state, action: PayloadAction<AddPlayerData>) => {
            state.playerData = addPlayer(state.playerData, action.payload.name);
        },
        applyOpponentPlacedTile: (state, action: PayloadAction<IPlacedTileData>) => {
            console.log('received message that tile was placed');
            state.board = action.payload.board;
            state.lastTilePlaced = action.payload.lastTilePlaced;
        },
        applyOpponentEndTurn: (state, action: PayloadAction<IEndTurnData>) => {
            console.log('received message that its the end of an opponents turn');
            // process data from server
            state.board = action.payload.board;
            state.playerData = action.payload.playerData;
            state.lastTilePlaced = action.payload.lastTilePlaced;

            // update data for the next turn
            state.currentTurn = (state.currentTurn + 1) % state.playerData.length;
            state.currentTile = state.remainingTiles.pop();
            state.remainingTiles = [...state.remainingTiles];
            if (state.currentTurn === state.myPlayerIndex) {
                state.status = AvilaGameStatus.PlacingTile;
                console.log("It's my turn!")
            }
        },
        setMyPlayerIndex: (state, action: PayloadAction<number>) => {
            state.myPlayerIndex = action.payload.valueOf();
        },
        setIsServerConnected: (state, action: PayloadAction<boolean>) => {
            state.isServerConnected = action.payload.valueOf();
        }
    }
});

export const { 
    recordMove, startGame, rotateCurrentTile, finishMove, placeMeeple, setRoomCreated, 
    playerJoinedRoom, hostStartedGame, applyOpponentPlacedTile, applyOpponentEndTurn, 
    setMyPlayerIndex, setIsServerConnected 
} = avilaSlice.actions;

export const selectAvilaBoard = (state: RootState) => state.avila.board;
export const selectAvilaCurrentTurn = (state: RootState) => state.avila.currentTurn;
export const selectAvilaCurrentTile = (state: RootState) => state.avila.currentTile;
export const selectAvilaPlayerData = (state: RootState) => state.avila.playerData;
export const selectAvilaStatus = (state: RootState) => state.avila.status;
export const selectAvilaLastTilePlaced = (state: RootState) => state.avila.lastTilePlaced;
export const selectAvilaRoomCreated = (state: RootState) => state.avila.roomCreated;
export const selectAvilaRemainingTilesCount = (state: RootState) => state.avila.remainingTiles.length;
export const selectAvilaIsServerConnnected = (state: RootState) => state.avila.isServerConnected;
export const selectAvilaPlaceableMeepleLocations = (state: RootState) => state.avila.placeableMeepleLocations;

export default avilaSlice.reducer;