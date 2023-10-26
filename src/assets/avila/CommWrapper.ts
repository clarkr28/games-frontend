import { IAssignIdResponse, ICreateRoomRequest, ICreateRoomResponse, IEndTurnRequest, IEndTurnResponse, IJoinRoomHostResponse, IJoinRoomPlayerResponse, IJoinRoomRequest, IPlacedTileRequest, IPlacedTileResponse, IReconnectRequest, IStartGameRequest, IStartGameResponse, MessagesFromServer } from "./CommMessages";
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
    private static playerId = '';
    private static roomId = '';
    private static shouldReconnect = true; // if true, create a new connection when communication disconnects
    private static reconnecting = false; // true if currently trying to reconnect to the server
    private static forceReconnectTimeoutId = 0;
    public static roomCreationCallback?: (room: string) => void = undefined;
    public static joinedRoomHostCallback?: (name: string) => void = undefined;
    public static joinedRoomPlayerCallback?: (index: number) => void = undefined;
    public static startGameCallback?: (data: IStartGameData) => void = undefined;
    public static opponentPlacedTileCallback?: (data: IPlacedTileData) => void = undefined;
    public static opponentEndTurnCallback?: (data: IEndTurnData) => void = undefined;
    public static serverConnectedCallback?: (isConnected: boolean) => void = undefined;

    private static CreateSocket() {
        if (!process.env.REACT_APP_AVILA_BACKEND) {
            throw Error("Can't connect to empty socket hostname");
        }

        CommWrapper.socket = new WebSocket(process.env.REACT_APP_AVILA_BACKEND);
        CommWrapper.AddListeners();

        // used to test socket reconections - not intended for production use
        const timeoutInterval = parseInt(process.env.REACT_APP_AVILA_FORCE_RECONNECT_MS ?? "0");
        if (timeoutInterval) {
            CommWrapper.forceReconnectTimeoutId = window.setTimeout(CommWrapper.ForceReconnect, timeoutInterval);
        }
    }

    public static Connect() {
        CommWrapper.shouldReconnect = true;
        if (CommWrapper.socket === null) {
            CommWrapper.CreateSocket();
        }
    }

    private static AddListeners() {
        if (CommWrapper.socket === null) {
            return;
        }

        CommWrapper.socket.addEventListener("open", () => {
            console.log("Connected to server");
        });

        CommWrapper.socket.onclose = (ev: CloseEvent) => {
            console.log("Disconnected from server");
            CommWrapper.serverConnectedCallback?.(false);
            if (CommWrapper.shouldReconnect) {
                CommWrapper.reconnecting = true;
                CommWrapper.CreateSocket();
            }
        }

        CommWrapper.socket.addEventListener("message", (event: MessageEvent<any>) => {
            console.log(`Received message from server: ${event.data}`);
            const message = parseMessage(event.data);
            if (message) {
                switch (message.type) {
                    case "AssignIdMessage": 
                        CommWrapper.serverConnectedCallback?.(true);
                        if (CommWrapper.reconnecting) {
                            /* If trying to reconnect, the server will initially send a new ID for the 
                            * client to use. But we want to continue using the old ID, so don't save
                            * the new ID that the server sends. Instead, send a message to the 
                            * server telling it to use our old ID
                            */
                            CommWrapper.reconnecting = false; 
                            CommWrapper.Reconnect(); 
                            return;
                        }
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

    /**
     * Send a message to the server to reconnect with the previously used ID
     */
    public static Reconnect() {
        if (CommWrapper.socket && CommWrapper.playerId) {
            const msg: IReconnectRequest = {
                type: "ReconnectRequest",
                playerId: CommWrapper.playerId,
            };
            CommWrapper.socket.send(JSON.stringify(msg));
        }
    }

    /**
     * Stop communication without attempting to reconnect
     */
    public static Close() {
        CommWrapper.shouldReconnect = false;
        CommWrapper.ClearForceReconnectTimer();
        CommWrapper.socket?.close();
        CommWrapper.socket = null;
    }

    /**
     * Force the socket to close. Used to test reconnecting to the server. 
     * Set REACT_APP_AVILA_FORCE_RECONNECT_MS to set the timeout interval (in milliseconds).
     */
    private static ForceReconnect() {
        if (CommWrapper.socket !== null) {
            CommWrapper.socket.close();
        }
    }
    
    private static ClearForceReconnectTimer() {
        if (CommWrapper.forceReconnectTimeoutId) {
            window.clearTimeout(CommWrapper.forceReconnectTimeoutId);
            CommWrapper.forceReconnectTimeoutId = 0;
        }
    }
}