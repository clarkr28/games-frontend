
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
}

export const SAMPLE_TILE_1: IAvilaTile = {
    edges: [
        {
            type: AvilaFeature.City,
        },
        {
            type: AvilaFeature.Road,
            connectedEdges: [2],
        },
        {
            type: AvilaFeature.Road,
            connectedEdges: [1],
        },
        {
            type: AvilaFeature.Field,
        },
    ]
};

export const SAMPLE_TILE_2: IAvilaTile = {
    edges: [
        {
            type: AvilaFeature.City,
            connectedEdges: [1],
        },
        {
            type: AvilaFeature.City,
            connectedEdges: [0],
        },
        {
            type: AvilaFeature.Field,
        },
        {
            type: AvilaFeature.Road,
        },
    ]
};

export const SAMPLE_TILE_3: IAvilaTile = {
    edges: [
        {
            type: AvilaFeature.Road,
            connectedEdges: [2],
        },
        {
            type: AvilaFeature.City,
        },
        {
            type: AvilaFeature.Road,
            connectedEdges: [0],
        },
        {
            type: AvilaFeature.Field,
        },
    ]
};

export const SAMPLE_TILE_4: IAvilaTile = {
    edges: [
        {
            type: AvilaFeature.City,
            connectedEdges: [1,2],
        },
        {
            type: AvilaFeature.City,
            connectedEdges: [0,2],
        },
        {
            type: AvilaFeature.City,
            connectedEdges: [0,1],
        },
        {
            type: AvilaFeature.Field,
        },
    ]
};

export const SAMPLE_TILE_5: IAvilaTile = {
    edges: [
        {
            type: AvilaFeature.City,
            connectedEdges: [1,2,3],
        },
        {
            type: AvilaFeature.City,
            connectedEdges: [0,2,3],
        },
        {
            type: AvilaFeature.City,
            connectedEdges: [0,1,3],
        },
        {
            type: AvilaFeature.City,
            connectedEdges: [0,1,2],
        },
    ]
};

export const SAMPLE_TILES = [
    SAMPLE_TILE_1,
    SAMPLE_TILE_2,
    SAMPLE_TILE_3,
    SAMPLE_TILE_4,
    SAMPLE_TILE_5,
];

export function getEdgeType(tile: IAvilaTile, edge: number): AvilaFeature {
    return tile.edges[edge].type;
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
