import { IAssignIdResponse, ICreateRoomRequest, ICreateRoomResponse, IEndTurnRequest, IEndTurnResponse, IJoinRoomHostResponse, IJoinRoomPlayerResponse, IJoinRoomRequest, IPlacedTileRequest, IPlacedTileResponse, IStartGameRequest, IStartGameResponse, MessagesFromServer } from "./CommMessages";
import { AvilaBoard, IAvilaPlayer, IAvilaTile } from "./Resources";


function parseMessage(rawData: string): MessagesFromServer | undefined {
    try {
        const dataObj = JSON.parse(rawData);
        if (dataObj['type'] === 'AssignIdMessage') {
            return dataObj as IAssignIdResponse;
        }
        if (dataObj['type'] === 'CreateRoomResponse') {
            return dataObj as ICreateRoomResponse;
        }
        if (dataObj['type'] === 'JoinRoomHostResponse') {
            return dataObj as IJoinRoomHostResponse;
        }
        if (dataObj['type'] === 'JoinRoomPlayerResponse') {
            return dataObj as IJoinRoomPlayerResponse;
        }
        if (dataObj['type'] === 'StartGameResponse') {
            return dataObj as IStartGameResponse;
        }
        if (dataObj['type'] === 'PlacedTileResponse') {
            return dataObj as IPlacedTileResponse;
        }
        if (dataObj['type'] === 'EndTurnResponse') {
            return dataObj as IEndTurnResponse;
        }
        console.warn(`Unknown message received: ${dataObj}`);
        
    } catch (e) {
        console.log(`error parsing message from server: ${e}`);
    }
    return undefined;
}

export interface IStartGameData {
    currentTile: IAvilaTile;
    remainingTiles: IAvilaTile[];
    playerData: IAvilaPlayer[];
}

export interface IPlacedTileData {
    board: AvilaBoard; 
}

export interface IEndTurnData {
    board: AvilaBoard;
    playerData: IAvilaPlayer[]; // scores and meeple counts change
}


export class CommWrapper {
    private static socket: WebSocket | null = null;
    private static playerId: string = '';
    private static roomId: string = '';
    public static roomCreationCallback?: (room: string) => void = undefined;
    public static joinedRoomHostCallback?: (name: string) => void = undefined;
    public static joinedRoomPlayerCallback?: (index: number) => void = undefined;
    public static startGameCallback?: (data: IStartGameData) => void = undefined;
    public static opponentPlacedTileCallback?: (data: IPlacedTileData) => void = undefined;
    public static opponentEndTurnCallback?: (data: IEndTurnData) => void = undefined;

    public static Connect() {
        if (CommWrapper.socket === null) {
            CommWrapper.socket = new WebSocket(`ws://${process.env.REACT_APP_AVILA_BACKEND}`);

            CommWrapper.socket.addEventListener("open", () => {
                console.log("Connected to server");
            });

            CommWrapper.socket.addEventListener("message", (event: MessageEvent<any>) => {
                console.log(`Received message from server: ${event.data}`);
                const message = parseMessage(event.data);
                if (message) {
                    switch (message.type) {
                        case "AssignIdMessage": 
                            CommWrapper.playerId = message.playerId;
                            break;
                        case "CreateRoomResponse": 
                            CommWrapper.roomId = message.room;
                            CommWrapper.roomCreationCallback?.(message.room);
                            break;
                        case "JoinRoomHostResponse":
                            CommWrapper.joinedRoomHostCallback?.(message.name);
                            break;
                        case "JoinRoomPlayerResponse":
                            CommWrapper.joinedRoomPlayerCallback?.(message.index);
                            break;
                        case "StartGameResponse":
                            const startGameData: IStartGameData = JSON.parse(message.data) as IStartGameData;
                            CommWrapper.startGameCallback?.(startGameData);
                            break;
                        case "PlacedTileResponse":
                            const placedTileData: IPlacedTileData = JSON.parse(message.data);
                            CommWrapper.opponentPlacedTileCallback?.(placedTileData);
                            break;
                        case "EndTurnResponse":
                            const endTurnData: IEndTurnData = JSON.parse(message.data);
                            CommWrapper.opponentEndTurnCallback?.(endTurnData);
                            break;
                    }
                }
            });
        }
    }

    public static CreateRoom(name: string) {
        if (CommWrapper.socket && CommWrapper.playerId) {
            const msg: ICreateRoomRequest = {
                type: "CreateRoomRequest",
                playerId: CommWrapper.playerId,
            };
            CommWrapper.socket.send(JSON.stringify(msg));
        }
    }

    public static JoinRoom(room: string, name: string) {
        if (CommWrapper.socket && CommWrapper.playerId && room && name) {
            const msg: IJoinRoomRequest = {
                type: 'JoinRoomRequest',
                playerId: CommWrapper.playerId,
                roomId: room,
                name: name,
            };
            CommWrapper.socket.send(JSON.stringify(msg));
        }
    }

    public static StartGame(data: IStartGameData) {
        if (CommWrapper.socket && CommWrapper.playerId) {
            const msg: IStartGameRequest = {
                type: "StartGameRequest",
                playerId: CommWrapper.playerId,
                data: JSON.stringify(data),
            }
            CommWrapper.socket.send(JSON.stringify(msg));
        }
    }

    public static PlaceTile(data: IPlacedTileData) {
        if (CommWrapper.socket && CommWrapper.playerId) {
            const msg: IPlacedTileRequest = {
                type: "PlacedTileRequest",
                playerId: CommWrapper.playerId,
                data: JSON.stringify(data),
            }
            CommWrapper.socket.send(JSON.stringify(msg));
        }
    }

    public static EndTurn(data: IEndTurnData) {
        if (CommWrapper.socket && CommWrapper.playerId) {
            const msg: IEndTurnRequest = {
                type: "EndTurnRequest",
                playerId: CommWrapper.playerId,
                data: JSON.stringify(data),
            }
            CommWrapper.socket.send(JSON.stringify(msg));
        }
    }

    public static Close() {
        CommWrapper.socket?.close();
    }
}