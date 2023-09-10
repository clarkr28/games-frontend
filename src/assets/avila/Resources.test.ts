import { Point } from "../ConnectFourResources";
import { AvilaBoard, AvilaPlayerColor, IAvilaPlayer, completedFeatureSearch, createPlayer } from "./Resources";
import { tileGenerator } from "./TileResources";


it("poc", () => {
    expect(true).toBe(true);
});

it("Score Feature - cyclical where last piece is split", () => {
    const board: AvilaBoard = [];
    board.push([undefined, undefined, undefined, undefined]);
    board.push([undefined, tileGenerator("F_RR_F"), tileGenerator("F_F_RR"), undefined]);
    board.push([undefined, tileGenerator("RR_F_F"), tileGenerator("R_F_F_R"), undefined]);
    board.push([undefined, undefined, undefined, undefined]);

    // place a meeple
    board[1][1]!.meeple = {playerIndex: 0, playerColor: AvilaPlayerColor.Green, edgeIndex: 1};

    const playerData: IAvilaPlayer[] = [
        createPlayer(AvilaPlayerColor.Green),
        createPlayer(AvilaPlayerColor.Orange)
    ];

    // tile that was placed last
    const lastPlacedTile: Point = {Y: 2, X: 2};
    const results = completedFeatureSearch(board, lastPlacedTile, playerData);

    expect(board[1][1]!.meeple).toBe(undefined);
    expect(results?.newPlayerData[0].score).toBe(4);
})