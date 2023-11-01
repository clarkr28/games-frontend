import { Point } from "../ConnectFourResources";

export enum AvilaGameStatus {
    Pregame,
    WaitingForTurn,
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
    rotation: number;
    imageFile?: string;
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
    if (board[tileLocation.Y][tileLocation.X] !== undefined && board[tileLocation.Y][tileLocation.X] !== null) {
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

/**
 * determine if a feature is occupied
 * @param board the board to process
 * @param tileLocation the location of the piece to process
 * @param edgeIndex the edge of the tileLocation to check if the feature is free
 * @returns true if the feature is occupied 
 */
export function isFeatureOccupied(board: AvilaBoard, tileLocation: Point, edgeIndex: number): boolean {
    // when implementing, give careful consideration to cyclical pieces. A cache will have to be kept of visited tiles.
    return searchFeatureForOccupation(board, tileLocation, edgeIndex, new Map<string, boolean>());
}

const encodeLocation = (location: Point) => `${location.X},${location.Y}`

const encodeEdge = (location: Point, edge: number) => `${location.X},${location.Y},${edge}`

/**
 * validate that a point is on the board
 * @param location the location on the board to validate 
 * @param board the board to validate against
 * @returns true if the locaiton is valid on the board (the location can still be undefined though)
 */
function isLocationValid(location: Point, board: AvilaBoard): boolean {
    return location.X >= 0 && location.Y >= 0 && location.Y < board.length && location.X < board[0].length;
}

/**
 * recursively search a feature across the board to see if it is already occupied
 * @param board the board to process
 * @param tileLoc location of the tile to process
 * @param entryEdge edge of the tile that the call was entered from
 * @param pastTiles keeps track of the tiles that have already been processed
 * @returns true if the feature is occupied
 */
function searchFeatureForOccupation(board: AvilaBoard, tileLoc: Point, entryEdge: number, pastTiles: Map<string, boolean>): boolean {
    // make sure the tile location is valid
    if (!isLocationValid(tileLoc, board)) {
        return false;
    }

    // make sure the tile is defined
    const tile = board[tileLoc.Y][tileLoc.X];
    if (tile === undefined || tile === null) {
        return false;
    }

    // make sure the tile hasn't been processed already
    const encodedLocation = encodeLocation(tileLoc);
    if (pastTiles.has(encodedLocation)) {
        return false; 
    }
    const isFirstCall = pastTiles.size === 0;
    // the tile is valid and unprocessed, store it in the map
    pastTiles.set(encodedLocation, true);

    // see if the feature on this tile is occupied
    if (tile.meeple?.edgeIndex !== undefined && tile.meeple?.edgeIndex !== null) {
        if (tile.meeple.edgeIndex === entryEdge || (tile.edges[entryEdge].connectedEdges?.indexOf(tile.meeple.edgeIndex) ?? -1) !== -1) {
            return true;
        }
    }

    if (isFirstCall && searchAdjacentTile(board, entryEdge, tileLoc, pastTiles)) {
        return true;
    }

    // search adjacent tiles that aren't from the edge we got here from
    return tile.edges[entryEdge].connectedEdges?.some(conEdge => 
        searchAdjacentTile(board, conEdge, tileLoc, pastTiles)
    ) || false;
}

/**
 * search the tile adjacent to this edge to see if its feature is already occupied
 * @param board the board to process
 * @param conEdge the edge of a tile to recursively search in that direction
 * @param originalLocation the tile currently being processed
 * @param pastTiles keeps track of tiles that have already been processed
 * @returns true if the feature already has a meeple on it
 */
function searchAdjacentTile(board: AvilaBoard, conEdge: number, originalLocation: Point, pastTiles: Map<string, boolean>): boolean {
    const newLocation: Point = {X: originalLocation.X, Y: originalLocation.Y};
    let newEntryEdge = 0;
    if (conEdge === 0) {
        newLocation.Y--;
        newEntryEdge = 2; // entering from the bottom
    } else if (conEdge === 1) {
        newLocation.X++;
        newEntryEdge = 3; // entering from the left
    } else if (conEdge === 2) {
        newLocation.Y++;
        newEntryEdge = 0; // entering from the top
    } else if (conEdge === 3) {
        newLocation.X--;
        newEntryEdge = 1; // entering from the right
    }
    return searchFeatureForOccupation(board, newLocation, newEntryEdge, pastTiles);
}

export interface ICompletedFeatureResult {
    newBoard: AvilaBoard;
    newPlayerData: IAvilaPlayer[];
}

export interface ICompleteEdgeData {
    meepleMap: Map<number, Point[]>;
    points: number;
}

/**
 * based on the last tile that was placed, score any completed features and return meeples
 * @param board the game board
 * @param tileLoc the location of the tile that was just placed
 * @param playerData the current player data
 * @returns a new board with meeples removed from completed features and new player
 *   data to reflect completed features being scored and meeples being returned
 */
export function completedFeatureSearch(board: AvilaBoard, tileLoc: Point, playerData: IAvilaPlayer[]): ICompletedFeatureResult | undefined {
    // validate location and make sure tile is defined
    if (!isLocationValid(tileLoc, board)) {
        return undefined;
    }
    const tile = board[tileLoc.Y][tileLoc.X];
    if (tile === undefined || tile === null) {
        return undefined;
    }

    // evaluate all edges to determine if any features were completed
    const featureResults: ICompleteEdgeData[] = [];
    const edgeCache = new Map<string, number>();
    edgeCache.set('CurrentFeature', 0);
    for (let i = 0; i < 4; i++) {
        if (tile.edges[i].type === AvilaFeature.Field) {
            continue; // fields are worthless
        }

        // edges connected to earlier edges don't need to be processed
        if (tile.edges[i].connectedEdges?.some(ind => ind < i)) {
            continue;
        }

        const meeples = new Map<number, Point[]>();
        const points = recurseCompletedFeature(board, tileLoc, i, meeples, edgeCache, new Map<string, boolean>(), true);
        edgeCache.set('CurrentFeature', (edgeCache.get('CurrentFeature') ?? 0) + 1);
        if (points > -1 && meeples.size) {
            featureResults.push({
                points: points,
                meepleMap: meeples,
            });
        }
    } 

    // evaluate any affected monestaries
    const affectedMonestaries = findAffectedMonestaries(board, tileLoc);
    affectedMonestaries.forEach(monPoint => {
        if (monestaryNeedsScoring(board, monPoint)) {
            const meepleMap: Map<number, Point[]> = new Map();
            meepleMap.set(board[monPoint.Y][monPoint.X]!.meeple!.playerIndex, [monPoint]);
            featureResults.push({
                points: 9,
                meepleMap: meepleMap
            });
        }
    });

    // for any completed features, remove meeples from the board and update point totals
    featureResults.forEach(result => {
        // who should get the points? 
        let playerIndexes: number[] = [];
        let meepleCount = 0;
        for (let [index, points] of Array.from(result.meepleMap.entries())) {
            if (points.length > meepleCount) {
                playerIndexes = [index];
                meepleCount = points.length;
            } else if (points.length === meepleCount) {
                playerIndexes.push(index);
            }
        }
        // assign the points
        playerIndexes.forEach(playerIndex => playerData[playerIndex].score += result.points)
        // remove meeples and give them back to the player
        for (let [playerIndex, meeplePoints] of Array.from(result.meepleMap.entries())) {
            meeplePoints.forEach(meeplePoint => {
                const tile = board[meeplePoint.Y][meeplePoint.X];
                if (tile === undefined || tile === null) {
                    // this shouldn't occur, so log a message for troubleshooting if it does
                    console.log(`error: removing meeple from undefined tile. X: ${meeplePoint.X}, Y: ${meeplePoint.Y}, playerIndex: ${playerIndex}`);
                    return;
                }
                if (tile.meeple) {
                    if (tile.meeple.playerIndex !== playerIndex) {
                        console.log(`error: trying to remove meeple assigned to wrong player. X: ${meeplePoint.X}, Y: ${meeplePoint.Y}`);
                    }
                    tile.meeple = undefined;
                    playerData[playerIndex].availableMeeple++;
                }
            })
        }
    })
   
    return {
        newBoard: [...board],
        newPlayerData: [...playerData],
    };
}

/**
 * score a feature (and check if it's complete)
 * @param board the game board
 * @param tileLoc the tile to score
 * @param entryEdge the edge the tile is being entered from (think graph traversal)
 * @param meeples a map to keep track of the meeples on this feature
 * @param edgeCache a map of the edges that have been visited
 * @param tileCache a map of the tiles that have been visited
 * @param firstCall true if this is a root-level call to the recursive function
 * @returns the point value for the feature (positive means feature is complete)
 */
function recurseCompletedFeature(board: AvilaBoard, tileLoc: Point, entryEdge: number, meeples: Map<number, Point[]>, edgeCache: Map<string, number>, tileCache: Map<string, boolean>, firstCall?: boolean): number {
    // make sure the tile location is valid
    if (!isLocationValid(tileLoc, board)) {
        return -1;
    }

    // make sure the tile is defined
    const tile = board[tileLoc.Y][tileLoc.X];
    if (tile === undefined || tile === null) {
        return -1;
    }

    // make sure the edge hasn't been processed already
    const encodedEdge = encodeEdge(tileLoc, entryEdge);
    const currFeatureIndex = edgeCache.get('FeatureIndex') ?? 0;
    const cachedEdge = edgeCache.get(encodedEdge);
    if (cachedEdge !== undefined && cachedEdge !== null) {
        if (cachedEdge === currFeatureIndex) {
            return 0; // feature has a cycle and this edge has already been visited
        }
        // otherwise, this is a part of a different feature
        return -1; 
    }

    // the edge is valid and unprocessed, store it in the map
    edgeCache.set(encodedEdge, currFeatureIndex);

    // see if the feature on this tile is occupied
    if (tile.meeple?.edgeIndex !== undefined && tile.meeple?.edgeIndex !== null) {
        // make sure the meeple is placed on the feature currently being processed
        if (tile.meeple.edgeIndex === entryEdge || (tile.edges[entryEdge].connectedEdges?.indexOf(tile.meeple.edgeIndex) ?? -1) !== -1) {
            const meeplesForPlayer = meeples.get(tile.meeple.playerIndex);
            if (meeplesForPlayer === undefined) {
                meeples.set(tile.meeple.playerIndex, [tileLoc]);
            } else {
                meeplesForPlayer.push(tileLoc);
            }
        }
    }

    let connectivityTotal = 0;

    // search connected edges and count their points
    for (const conEdge of tile.edges[entryEdge].connectedEdges || []) {
        // make sure this edge hasn't already been visited
        const encodedEdge = encodeEdge(tileLoc, conEdge);
        const cachedEdge = edgeCache.get(encodedEdge);
        if (cachedEdge !== undefined) {
            if (cachedEdge !== currFeatureIndex) {
                // this is a part of a different feature
                return -1; 
            }
        }
        // the edge is valid and unprocessed, store it in the map
        edgeCache.set(encodedEdge, currFeatureIndex);

        const edgeValue = recurseCompletedFeatureHelper(board, conEdge, tileLoc, meeples, edgeCache, tileCache);
        if (edgeValue === -1) {
            return -1;
        }
        connectivityTotal += edgeValue;
    }

    // search edge we came from if it's the first time
    if (firstCall) {
        const firstEdgeValue = recurseCompletedFeatureHelper(board, entryEdge, tileLoc, meeples, edgeCache, tileCache);
        if (firstEdgeValue === -1) {
            return -1;
        }
        connectivityTotal += firstEdgeValue;
    }

    // compute the value of this tile
    let tileValue = 0;
    if (!tileCache.has(encodeLocation(tileLoc))) {
        // tile cache is used to make sure a tile is only scored once per feature
        tileCache.set(encodeLocation(tileLoc), true);
        if (tile.edges[entryEdge].type === AvilaFeature.City) {
            tileValue = tile.shield ? 4 : 2;
        } else if (tile.edges[entryEdge].type === AvilaFeature.Road) {
            tileValue = 1;
        }
    }

    return connectivityTotal + tileValue;
}

/**
 * search the tile adjacent to this edge to see if its feature is complete
 * @param board the board to process
 * @param conEdge the edge of a tile to recursively search in that direction
 * @param originalLocation the tile currently being processed
 * @param meeples the meeples found on this feature
 * @param edgeCache keeps track of the edges that have already been processed
 * @param tileCache keeps track of tiles that have already been processed
 * @returns -1 if feature is not complete, point value if featre is complete
 */
function recurseCompletedFeatureHelper(board: AvilaBoard, conEdge: number, originalLocation: Point, meeples: Map<number, Point[]>, edgeCache: Map<string, number>, tileCache: Map<string, boolean>): number {
    const newLocation: Point = {X: originalLocation.X, Y: originalLocation.Y};
    let newEntryEdge = 0;
    if (conEdge === 0) {
        newLocation.Y--;
        newEntryEdge = 2; // entering from the bottom
    } else if (conEdge === 1) {
        newLocation.X++;
        newEntryEdge = 3; // entering from the left
    } else if (conEdge === 2) {
        newLocation.Y++;
        newEntryEdge = 0; // entering from the top
    } else if (conEdge === 3) {
        newLocation.X--;
        newEntryEdge = 1; // entering from the right
    }
    return recurseCompletedFeature(board, newLocation, newEntryEdge, meeples, edgeCache, tileCache);
}

const MonestaryOffsets: Point[] = [
    {X: -1, Y: -1},
    {X: 0, Y: -1},
    {X: 1, Y: -1},
    {X: -1, Y: 0},
    {X: 0, Y: 0},
    {X: 1, Y: 0},
    {X: -1, Y: 1},
    {X: 0, Y: 1},
    {X: 1, Y: 1},
];

/**
 * find monestaries around a point that have meeples
 * @param board the board to search
 * @param startPoint the point to search around 
 * @returns points around the starting point that are monestaries and have meeples, including the starting point
 */
export function findAffectedMonestaries(board: AvilaBoard, startPoint: Point): Point[] {
    const monestaries: Point[] = [];
    MonestaryOffsets.forEach(offset => {
        const x = startPoint.X + offset.X;
        const y = startPoint.Y + offset.Y;
        const tile = board[y][x];
        if (tile && tile.monestary && tile.meeple?.onMonestary) {
            monestaries.push({Y: y, X: x});
        }
    })
    return monestaries;
}

/**
 * determine if a monestary needs to be scored
 * @param board the board to search
 * @param loc the location of a monestary
 * @returns true if the monestary is complete and still has a meeple on it
 */
export function monestaryNeedsScoring(board: AvilaBoard, loc: Point): boolean {
    const tile = board[loc.Y][loc.X];
    // false if the tile isn't a monestary or the tile isn't occupied
    if (!tile || !tile.monestary || !tile.meeple) {
        return false
    }

    return MonestaryOffsets.every(offset => {
        return board[loc.Y + offset.Y][loc.X + offset.X]; // evaluates to true if it exists
    })
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
    name: string;
}

export enum AvilaPlayerColor {
    Red = 'red',
    Orange = 'orange',
    Blue = 'blue',
    Green = 'green',
    Purple = 'purple'
}

export function createPlayer(name: string, color: AvilaPlayerColor): IAvilaPlayer {
    return {
        score: 0,
        availableMeeple: 6,
        color: color,
        name: name,
    };
}

/**
 * add a player to the existing list of players
 * @param existingPlayers the existing players
 * @param name the new player's name
 * @param color the new player's color (optional)
 * @returns a new array of players containing the new player. Returns the same
 * array if all colors have been used (meaning the player wasn't added).
 */
export function addPlayer(existingPlayers: IAvilaPlayer[], name: string, color?: AvilaPlayerColor): IAvilaPlayer[] {
    let colorToUse: AvilaPlayerColor | undefined;
    if (color !== undefined && existingPlayers.every(player => player.color !== color)) {
        colorToUse = color;
    }

    if (color === undefined) {
        const usableColors: AvilaPlayerColor[] = [];
        Object.values(AvilaPlayerColor).forEach(c => {
            if (existingPlayers.every(player => player.color !== c)) {
                usableColors.push(c);
            }
        });
        if (usableColors.length > 0) {
            colorToUse = usableColors[0];
        }
    }

    if (colorToUse !== undefined) {
        return [...existingPlayers, createPlayer(name, colorToUse)];
    }

    return existingPlayers;
}

