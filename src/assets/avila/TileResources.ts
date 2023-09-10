import { AvilaFeature, IAvilaEdge, IAvilaTile } from "./Resources";

/**
 * STANDARD TILES
 */

export const STANDARD_TILES: IAvilaTile[] = [];

STANDARD_TILES.push(tileGenerator("CCCC", true));
STANDARD_TILES.push(tileGenerator("CCC_F"));
STANDARD_TILES.push(tileGenerator("CCC_F"));
STANDARD_TILES.push(tileGenerator("CCC_F"));
STANDARD_TILES.push(tileGenerator("CCC_F", true));
STANDARD_TILES.push(tileGenerator("CCC_R"));
STANDARD_TILES.push(tileGenerator("CCC_R", true));
STANDARD_TILES.push(tileGenerator("CCC_R", true));
STANDARD_TILES.push(tileGenerator("CC_F_F"));
STANDARD_TILES.push(tileGenerator("CC_F_F"));
STANDARD_TILES.push(tileGenerator("CC_F_F"));
STANDARD_TILES.push(tileGenerator("CC_F_F", true));
STANDARD_TILES.push(tileGenerator("CC_F_F", true));
STANDARD_TILES.push(tileGenerator("C_C_F_F"));
STANDARD_TILES.push(tileGenerator("C_C_F_F"));
STANDARD_TILES.push(tileGenerator("CC_RR"));
STANDARD_TILES.push(tileGenerator("CC_RR"));
STANDARD_TILES.push(tileGenerator("CC_RR"));
STANDARD_TILES.push(tileGenerator("CC_RR", true));
STANDARD_TILES.push(tileGenerator("CC_RR", true));
STANDARD_TILES.push(tileGenerator("C_F_C_F"));
STANDARD_TILES.push(tileGenerator("C_F_C_F"));
STANDARD_TILES.push(tileGenerator("C_F_C_F"));
export const C_F_C_F: IAvilaTile = {
    edges: [
        {
            type: AvilaFeature.City,
            connectedEdges: [2],
        },
        {
            type: AvilaFeature.Field,
        },
        {
            type: AvilaFeature.City,
            connectedEdges: [0],
        },
        {
            type: AvilaFeature.Field,
        },
    ]
};
STANDARD_TILES.push(C_F_C_F);
STANDARD_TILES.push({
    ...C_F_C_F,
    shield: true,
});
STANDARD_TILES.push({
    ...C_F_C_F,
    shield: true,
});


STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("C_F_RR"));
STANDARD_TILES.push(tileGenerator("C_F_RR"));
STANDARD_TILES.push(tileGenerator("C_F_RR"));


export const C_R_F_R: IAvilaTile = {
    edges: [
        {
            type: AvilaFeature.City,
        },
        {
            type: AvilaFeature.Road,
            connectedEdges: [3],
        },
        {
            type: AvilaFeature.Field,
        },
        {
            type: AvilaFeature.Road,
            connectedEdges: [1],
        },
    ]
};
STANDARD_TILES.push(...[C_R_F_R, C_R_F_R, C_R_F_R]);


STANDARD_TILES.push(tileGenerator("C_RR_F"));
STANDARD_TILES.push(tileGenerator("C_RR_F"));
STANDARD_TILES.push(tileGenerator("C_RR_F"));
STANDARD_TILES.push(tileGenerator("C_R_R_R"));
STANDARD_TILES.push(tileGenerator("C_R_R_R"));
STANDARD_TILES.push(tileGenerator("C_R_R_R"));
STANDARD_TILES.push(tileGenerator("F_F_F_F", false, true));
STANDARD_TILES.push(tileGenerator("F_F_F_F", false, true));
STANDARD_TILES.push(tileGenerator("F_F_F_F", false, true));
STANDARD_TILES.push(tileGenerator("F_F_F_F", false, true));
STANDARD_TILES.push(tileGenerator("F_F_F_R", false, true));
STANDARD_TILES.push(tileGenerator("F_F_F_R", false, true));
STANDARD_TILES.push(tileGenerator("F_F_RR"));
STANDARD_TILES.push(tileGenerator("F_F_RR"));
STANDARD_TILES.push(tileGenerator("F_F_RR"));
STANDARD_TILES.push(tileGenerator("F_F_RR"));
STANDARD_TILES.push(tileGenerator("F_F_RR"));
STANDARD_TILES.push(tileGenerator("F_F_RR"));
STANDARD_TILES.push(tileGenerator("F_F_RR"));
STANDARD_TILES.push(tileGenerator("F_F_RR"));
STANDARD_TILES.push(tileGenerator("F_F_RR"));


export const F_R_F_R: IAvilaTile = {
    edges: [
        {
            type: AvilaFeature.Field,
        },
        {
            type: AvilaFeature.Road,
            connectedEdges: [3],
        },
        {
            type: AvilaFeature.Field,
        },
        {
            type: AvilaFeature.Road,
            connectedEdges: [1],
        },
    ]
};
STANDARD_TILES.push(...[F_R_F_R, F_R_F_R, F_R_F_R, F_R_F_R, F_R_F_R, F_R_F_R, F_R_F_R, F_R_F_R])


STANDARD_TILES.push(tileGenerator("F_R_R_R"));
STANDARD_TILES.push(tileGenerator("F_R_R_R"));
STANDARD_TILES.push(tileGenerator("F_R_R_R"));
STANDARD_TILES.push(tileGenerator("F_R_R_R"));
STANDARD_TILES.push(tileGenerator("R_R_R_R"));

/**
 * END OF STANDARD TILES
 */



/**
 * shuffles a list of tiles by reference
 * @param tiles the tiles to shuffle
 */
export function shuffleTiles(tiles: IAvilaTile[]): void {
    for (let i = tiles.length - 1; i >= 0; i--) {
        const randIndex = Math.floor(Math.random() * i);
        const temp = tiles[randIndex];
        tiles[randIndex] = tiles[i];
        tiles[i] = temp;
    }
}


/**
 * create a deck of tiles
 * @param standardTiles true to include standard tiles
 * @param shuffle true if tiles should be shuffled
 * @returns the generated tiles
 */
export function createTiles(standardTiles: boolean, shuffle: boolean): IAvilaTile[] {
    const tiles: IAvilaTile[] = [];

    if (standardTiles) {
        tiles.push(...STANDARD_TILES);
    }
    if (shuffle) {
        shuffleTiles(tiles);
    }

    return tiles;
}


/**
 * create a tile based on the description. It is assumed that 
 * the description is valid.  "C_C" describes two city edges
 * that are NOT a part of the same city.  "CC" describes two city
 * edges that ARE a part of the same city. The same pattern
 * works for road edges that are connected. 
 * @param descriptor descriptor of the tile to create
 * @param shield true if the tile has a shield
 * @param monestary true if the tile is a monestary
 * @returns the generated tile
 */
export function tileGenerator(descriptor: string, shield?: boolean, monestary?: boolean): IAvilaTile {
    const edges: IAvilaEdge[] = [];
    const nodes = descriptor.split("_");
    nodes.forEach(node => {
        if (node.length === 0) {
            throw new Error(`tile with descriptor ${descriptor} has an empty node`);
        }
        if (node.length === 1) {
            edges.push({type: charToEdgeType(node)})
        } 
        else {
            const startIndex = edges.length;
            const nodeInds = Array.from({length: node.length}, (_, i) => i + startIndex);
            for (let i = startIndex; i < startIndex + node.length; i++) {
                edges.push({
                    type: charToEdgeType(node[0]),
                    connectedEdges: nodeInds.filter(val => val !== i),
                })
            } 
        }

    });

    if (edges.length !== 4) {
        throw new Error(`tile with descriptor ${descriptor} doesn't have 4 edges. Edges: ${JSON.stringify(edges)}`);
    }

    return {
        edges: edges,
        shield: shield,
        monestary: monestary,
    };
}

/**
 * convert a character to its corresponding AvilaFeature
 * @param char 'C' for City, 'R' for Road, 'F' for Field
 * @returns the corresponding AvilaFeature
 */
function charToEdgeType(char: string): AvilaFeature {
    switch (char) {
        case 'C':
            return AvilaFeature.City;
        case 'R':
            return AvilaFeature.Road;
        case 'F': 
            return AvilaFeature.Field;
    }
    throw new Error(`invlaid edge character: ${char}`);
}