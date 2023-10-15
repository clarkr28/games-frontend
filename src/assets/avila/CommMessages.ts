
/**
 * Messages To Client
 */

 export interface IAssignIdResponse {
    type: "AssignIdMessage";
    playerId: string;
}

export interface ICreateRoomResponse {
    type: "CreateRoomResponse";
    room: string;
}

export interface IJoinRoomHostResponse {
    type: "JoinRoomHostResponse";
    name: string;
}

export interface IJoinRoomPlayerResponse {
    type: "JoinRoomPlayerResponse";
    index: number;
}

export interface IStartGameResponse {
    type: "StartGameResponse";
    data: string;
}

export interface IPlacedTileResponse {
    type: "PlacedTileResponse";
    data: string;
}

export interface IEndTurnResponse {
    type: "EndTurnResponse";
    data: string;
}

export type MessagesFromServer = IAssignIdResponse | ICreateRoomResponse | 
    IJoinRoomHostResponse | IJoinRoomPlayerResponse | IStartGameResponse | 
    IPlacedTileResponse | IEndTurnResponse;

/**
 * Messages To Server
 */

export interface ICreateRoomRequest {
    type: "CreateRoomRequest";
    playerId: string;
}

export interface IJoinRoomRequest {
    type: "JoinRoomRequest";
    playerId: string;
    roomId: string;
    name: string;
}

export interface IStartGameRequest {
    type: "StartGameRequest";
    playerId: string;
    // server doesn't need to process anything, so data can just be a string
    data: string;
}

export interface IPlacedTileRequest {
    type: "PlacedTileRequest";
    playerId: string;
    // server doesn't need to process anything, so data can just be a string
    data: string;
}

export interface IEndTurnRequest {
    type: "EndTurnRequest";
    playerId: string;
    // server doesn't need to process anything, so data can just be a string
    data: string;
}

export interface IReconnectRequest {
    type: "ReconnectRequest";
    playerId: string;
}

export type MessagesFromClient = ICreateRoomRequest | IJoinRoomRequest | IStartGameRequest |
    IPlacedTileRequest | IEndTurnRequest | IReconnectRequest;
