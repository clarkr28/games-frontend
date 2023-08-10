
/* Have field be the assumed default value. Instead of discretely keeping track
 * of what every edge type is, and if two adjacent city edges or road edges
 * are connected to each other or not, just keep track of what other edges 
 * a given edge is connected to.  That way, traversing the board is similar 
 * to traversing a graph.  
 */

export enum CarcassonneEdgeType {
    Field = "1",
    City = "2",
    Road = "3"
}

export interface ICarcassonneEdge {
    type: CarcassonneEdgeType;
    connectedEdges?: number[];
}


/**
 * representation of a carcassonne tile:
 *             edges[0] 
 *          |----------|
 * edges[3] |          | edges[1]
 *          |__________|
 *             edges[2]
 */
export interface ICarcassonneTile {
    edges: ICarcassonneEdge[];
}

export const SAMPLE_TILE_1: ICarcassonneTile = {
    edges: [
        {
            type: CarcassonneEdgeType.City,
        },
        {
            type: CarcassonneEdgeType.Road,
            connectedEdges: [2],
        },
        {
            type: CarcassonneEdgeType.Road,
            connectedEdges: [1],
        },
        {
            type: CarcassonneEdgeType.Field,
        },
    ]
};

export const SAMPLE_TILE_2: ICarcassonneTile = {
    edges: [
        {
            type: CarcassonneEdgeType.City,
            connectedEdges: [1],
        },
        {
            type: CarcassonneEdgeType.City,
            connectedEdges: [0],
        },
        {
            type: CarcassonneEdgeType.Field,
        },
        {
            type: CarcassonneEdgeType.Road,
        },
    ]
};

export const SAMPLE_TILE_3: ICarcassonneTile = {
    edges: [
        {
            type: CarcassonneEdgeType.Road,
            connectedEdges: [2],
        },
        {
            type: CarcassonneEdgeType.City,
        },
        {
            type: CarcassonneEdgeType.Road,
            connectedEdges: [0],
        },
        {
            type: CarcassonneEdgeType.Field,
        },
    ]
};

export const SAMPLE_TILE_4: ICarcassonneTile = {
    edges: [
        {
            type: CarcassonneEdgeType.City,
            connectedEdges: [1,2],
        },
        {
            type: CarcassonneEdgeType.City,
            connectedEdges: [0,2],
        },
        {
            type: CarcassonneEdgeType.City,
            connectedEdges: [0,1],
        },
        {
            type: CarcassonneEdgeType.Field,
        },
    ]
};

export const SAMPLE_TILE_5: ICarcassonneTile = {
    edges: [
        {
            type: CarcassonneEdgeType.City,
            connectedEdges: [1,2,3],
        },
        {
            type: CarcassonneEdgeType.City,
            connectedEdges: [0,2,3],
        },
        {
            type: CarcassonneEdgeType.City,
            connectedEdges: [0,1,3],
        },
        {
            type: CarcassonneEdgeType.City,
            connectedEdges: [0,1,2],
        },
    ]
};

export function getEdgeType(tile: ICarcassonneTile, edge: number): CarcassonneEdgeType {
    return tile.edges[edge].type;
}

/**
 * determine the type of connection between two edges of a tile
 * @param tile the tile to determine the adjacency type for
 * @param firstEdge the first edge of the tile to compare against
 * @param secondEdge the second edge of the tile to compare against
 * @returns the type of connection between the two edges
 */
export function getAdjacencyType(tile: ICarcassonneTile, firstEdge: number, secondEdge: number): CarcassonneEdgeType {
    if (tile.edges[firstEdge].type === CarcassonneEdgeType.Field) {
        return CarcassonneEdgeType.Field; // field doesn't have any adjacencies
    }

    return tile.edges[firstEdge].connectedEdges?.some(edge => edge === secondEdge) 
    ? tile.edges[firstEdge].type 
    : CarcassonneEdgeType.Field;
}

