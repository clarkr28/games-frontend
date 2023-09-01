import { Point } from "../ConnectFourResources";

export enum AvilaGameStatus {
    Pregame,
    PlacingTile,
    PlacingMeeple,
    TriggerFinishMove,
    Done,
}

/* Have field be the assumed default value. Instead of discretely keeping track
 * of what every edge type is, and if two adjacent city edges or road edges
 * are connected to each other or not, just keep track of what other edges 
 * a given edge is connected to.  That way, traversing the board is similar 
 * to traversing a graph.  
 */

export enum AvilaFeature {
    Field = "1",
    City = "2",
    Road = "3"
}

export interface IAvilaEdge {
    type: AvilaFeature;
    connectedEdges?: number[];
}

export interface IMeeplePlacement {
    playerIndex: number;
    playerColor: AvilaPlayerColor;
    // optional when placed on monestary
    edgeIndex?: number;
    // monestaries don't be belong to an edge
    onMonestary?: boolean; 
}


/**
 * representation of an Avila tile:
 *             edges[0] 
 *          |----------|
 * edges[3] |          | edges[1]
 *          |__________|
 *             edges[2]
 */
export interface IAvilaTile {
    edges: IAvilaEdge[];
    shield?: boolean;
    monestary?: boolean;
    meeple?: IMeeplePlacement;
}

/**
 * rotate a tile clockwise 
 * @param tile the tile to rotate
 * @returns a new tile object that has been rotated clockwise
 */
export function rotateTile(tile: IAvilaTile): IAvilaTile {
    const newTile: IAvilaTile = { 
        ...tile, 
        edges: [
            tile.edges[3],
            tile.edges[0],
            tile.edges[1],
            tile.edges[2],
        ]
    };

    // rotate the edge connections
    for (let edgeIndex = 0; edgeIndex < 4; edgeIndex++) {
        newTile.edges[edgeIndex].connectedEdges = newTile.edges[edgeIndex].connectedEdges?.map(connection => (connection + 1) % 4);
    }

    return newTile;
}

export function getEdgeType(tile: IAvilaTile, edge: number): AvilaFeature {
    return tile.edges[edge].type;
}

export function getTopEdge(tile: IAvilaTile): AvilaFeature {
    return getEdgeType(tile, 0);
}

export function getRightEdge(tile: IAvilaTile): AvilaFeature {
    return getEdgeType(tile, 1);
}

export function getBottomEdge(tile: IAvilaTile): AvilaFeature {
    return getEdgeType(tile, 2);
}

export function getLeftEdge(tile: IAvilaTile): AvilaFeature {
    return getEdgeType(tile, 3);
}

/**
 * determine the type of connection between two edges of a tile
 * @param tile the tile to determine the adjacency type for
 * @param firstEdge the first edge of the tile to compare against
 * @param secondEdge the second edge of the tile to compare against
 * @returns the type of connection between the two edges
 */
export function getAdjacencyType(tile: IAvilaTile, firstEdge: number, secondEdge: number): AvilaFeature {
    if (tile.edges[firstEdge].type === AvilaFeature.Field) {
        return AvilaFeature.Field; // field doesn't have any adjacencies
    }

    return tile.edges[firstEdge].connectedEdges?.some(edge => edge === secondEdge) 
    ? tile.edges[firstEdge].type 
    : AvilaFeature.Field;
}

export type AvilaBoard = (IAvilaTile | undefined)[][];

export function createEmptyBoard(width: number, height: number): AvilaBoard {
    const board: AvilaBoard = [];
    for (let i = 0; i < height; i++) {
        board.push(new Array<IAvilaTile | undefined>(width).fill(undefined));
    }

    return board;
}

/**
 * expand the edges of the board if a tile was placed on the edge
 * @param board a board that just had a tile placed
 * @param placedTileLocation the point where the last tile was placed
 * @returns the board with its edges potentially expanded
 */
export function expandBoard(board: AvilaBoard, placedTileLocation: Point): AvilaBoard {
    // reminder: board[Y][X]
    if (placedTileLocation.X + 1 === board[0].length) {
        // expand board to the right 
        for (let i = 0; i < board.length; i++) {
            board[i].push(undefined);
        }
    }
    if (placedTileLocation.Y + 1 === board.length) {
        // expand board down
        board.push(new Array<IAvilaTile | undefined>(board[0].length).fill(undefined));
    }
    if (placedTileLocation.X === 0) {
        // expand board to the left
        for (let i = 0; i < board.length; i++) {
            board[i].unshift(undefined);
        }
    }
    if (placedTileLocation.Y === 0) {
        // expand board up
        board.unshift(new Array<IAvilaTile | undefined>(board[0].length).fill(undefined));
    }

    return board;
}

export function canPlaceTile(board: AvilaBoard, tileLocation: Point, newTile: IAvilaTile): boolean {
    // don't place a tile if there's already a tile there
    if (board[tileLocation.Y][tileLocation.X] !== undefined) {
        return false;
    }

    // special case when the board is a 1x1 grid
    if (board.length === 1 && board[0].length === 1) {
        return true;
    }

    let hasAdjacentTile = false;

    // check up
    const adjacentUp = board[tileLocation.Y - 1] && board[tileLocation.Y - 1][tileLocation.X];
    if (tileLocation.Y > 0 && adjacentUp) {
        hasAdjacentTile = true;
        // check edge compatibility
        if (getTopEdge(newTile) !== getBottomEdge(adjacentUp)) {
            return false;
        }
    }

    // check down
    const adjacentDown = board[tileLocation.Y + 1] && board[tileLocation.Y + 1][tileLocation.X];
    if (tileLocation.Y < board.length - 1 && adjacentDown) {
        hasAdjacentTile = true;
        if (getBottomEdge(newTile) !== getTopEdge(adjacentDown)) {
            return false;
        }
    }

    // check left
    const adjacentLeft = board[tileLocation.Y][tileLocation.X - 1];
    if (tileLocation.X > 0 && adjacentLeft) {
        hasAdjacentTile = true;
        if (getLeftEdge(newTile) !== getRightEdge(adjacentLeft)) {
            return false;
        }
    }

    // check right
    const adjacentRight = board[tileLocation.Y][tileLocation.X + 1];
    if (tileLocation.X < board[0].length - 1 && adjacentRight) {
        hasAdjacentTile = true;
        if (getRightEdge(newTile) !== getLeftEdge(adjacentRight)) {
            return false;
        }
    }

    return hasAdjacentTile;
}

export function awardPoints(board: AvilaBoard, tileLocation: Point): number {
    return 0;
}


/**
 * 
 * Player Resources 
 * 
 */

export interface IAvilaPlayer {
    score: number;
    availableMeeple: number;
    color: AvilaPlayerColor;
}

export enum AvilaPlayerColor {
    Red = 'red',
    Yellow = 'yellow',
    Blue = 'blue',
    Green = 'green',
    Purple = 'purple'
}

export function createPlayer(color: AvilaPlayerColor): IAvilaPlayer {
    return {
        score: 0,
        availableMeeple: 2,
        color: color,
    };
}

