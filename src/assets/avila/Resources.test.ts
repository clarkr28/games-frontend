import { Point } from "../ConnectFourResources";
import { AvilaBoard, AvilaPlayerColor, IAvilaPlayer, completedFeatureSearch, createPlayer, findAffectedMonestaries} from "./Resources";
import { tileGenerator } from "./TileResources";


it("Score Feature - cyclical where last piece is split", () => {
    const board: AvilaBoard = [];
    board.push([undefined, undefined, undefined, undefined]);
    board.push([undefined, tileGenerator("F_RR_F"), tileGenerator("F_F_RR"), undefined]);
    board.push([undefined, tileGenerator("RR_F_F"), tileGenerator("R_F_F_R"), undefined]);
    board.push([undefined, undefined, undefined, undefined]);

    const playerData: IAvilaPlayer[] = [
        createPlayer(AvilaPlayerColor.Green),
        createPlayer(AvilaPlayerColor.Orange)
    ];
    const startingMeepleCount = playerData[0].availableMeeple;

    // place a meeple
    board[1][1]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, edgeIndex: 1};
    playerData[0].availableMeeple--;

    // tile that was placed last
    const lastPlacedTile: Point = {Y: 2, X: 2};
    const results = completedFeatureSearch(board, lastPlacedTile, playerData);

    expect(board[1][1]!.meeple).toBe(undefined);
    expect(results?.newPlayerData[1].score).toBe(0);
    expect(results?.newPlayerData[0].availableMeeple).toBe(startingMeepleCount);
    expect(results?.newPlayerData[0].score).toBe(4);
});

it("Find monestaries around last move", () => {
    // create a 3x3 board of all monestaries
    const board: AvilaBoard = [];
    board.push(new Array(5).fill(undefined));
    board.push([undefined, tileGenerator("F_F_F_F", false, true), tileGenerator("F_F_F_F", false, true), tileGenerator("F_F_F_F", false, true), undefined]);
    board.push([undefined, tileGenerator("F_F_F_F", false, true), tileGenerator("F_F_F_F", false, true), tileGenerator("F_F_F_F", false, true), undefined]);
    board.push([undefined, tileGenerator("F_F_F_F", false, true), tileGenerator("F_F_F_F", false, true), tileGenerator("F_F_F_F", false, true), undefined]);
    board.push(new Array(5).fill(undefined));

    // place meeple on all tiles
    board[1][1]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};
    board[1][2]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};
    board[1][3]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};
    board[2][1]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};
    board[2][2]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};
    board[2][3]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};
    board[3][1]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};
    board[3][2]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};
    board[3][3]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};

    const matches = findAffectedMonestaries(board, {X: 2, Y: 2})
    expect(matches.length).toBe(9);
    expect(matches.filter(match => match.X === 1 && match.Y === 1).length).toBe(1);
    expect(matches.filter(match => match.X === 2 && match.Y === 1).length).toBe(1);
    expect(matches.filter(match => match.X === 3 && match.Y === 1).length).toBe(1);
    expect(matches.filter(match => match.X === 1 && match.Y === 2).length).toBe(1);
    expect(matches.filter(match => match.X === 2 && match.Y === 2).length).toBe(1);
    expect(matches.filter(match => match.X === 3 && match.Y === 2).length).toBe(1);
    expect(matches.filter(match => match.X === 1 && match.Y === 3).length).toBe(1);
    expect(matches.filter(match => match.X === 2 && match.Y === 3).length).toBe(1);
    expect(matches.filter(match => match.X === 3 && match.Y === 3).length).toBe(1);
});

it("Score Feature - complete monestary", () => {
    const board: AvilaBoard = [];
    board.push(new Array(5).fill(undefined));
    board.push([undefined, tileGenerator("C_F_F_F"), tileGenerator("C_F_F_F"), tileGenerator("C_F_F_F"), undefined]);
    board.push([undefined, tileGenerator("F_F_F_C"), tileGenerator("F_F_F_F", false, true), tileGenerator("F_C_F_F"), undefined]);
    board.push([undefined, tileGenerator("F_F_C_F"), tileGenerator("F_F_C_F"), tileGenerator("F_F_C_F"), undefined]);
    board.push(new Array(5).fill(undefined));

    const playerData: IAvilaPlayer[] = [
        createPlayer(AvilaPlayerColor.Green),
        createPlayer(AvilaPlayerColor.Orange)
    ];
    const startingMeepleCount = playerData[0].availableMeeple;

    // place a meeple
    board[2][2]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, onMonestary: true};
    playerData[0].availableMeeple--;

    // tile that was placed last
    const lastPlacedTile: Point = {Y: 3, X: 3};
    const results = completedFeatureSearch(board, lastPlacedTile, playerData);

    expect(board[2][2]!.meeple).toBe(undefined);
    expect(results?.newPlayerData[0].availableMeeple).toBe(startingMeepleCount);
    expect(results?.newPlayerData[1].availableMeeple).toBe(startingMeepleCount);
    expect(results?.newPlayerData[0].score).toBe(9);
    expect(results?.newPlayerData[1].score).toBe(0);
});