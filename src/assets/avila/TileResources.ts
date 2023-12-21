import { AvilaFeature, IAvilaEdge, IAvilaTile } from "./Resources";

const IMAGE_PATH_BASE = "/images/avila/";

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
STANDARD_TILES.push(tileGenerator("F_F_CC"));
STANDARD_TILES.push(tileGenerator("F_F_CC"));
STANDARD_TILES.push(tileGenerator("F_F_CC"));
STANDARD_TILES.push(tileGenerator("F_F_CC", true));
STANDARD_TILES.push(tileGenerator("F_F_CC", true));
STANDARD_TILES.push(tileGenerator("F_F_C_C"));
STANDARD_TILES.push(tileGenerator("F_F_C_C"));
STANDARD_TILES.push(tileGenerator("RR_CC"));
STANDARD_TILES.push(tileGenerator("RR_CC"));
STANDARD_TILES.push(tileGenerator("RR_CC"));
STANDARD_TILES.push(tileGenerator("RR_CC", true));
STANDARD_TILES.push(tileGenerator("RR_CC", true));
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
    ],
    rotation: 0,
    imageFile: `${IMAGE_PATH_BASE}C*_F_C*_F-0-0.svg`
};
STANDARD_TILES.push({...C_F_C_F});
STANDARD_TILES.push({
    ...C_F_C_F,
    shield: true,
    imageFile: `${IMAGE_PATH_BASE}C*_F_C*_F-1-0.svg`
});
STANDARD_TILES.push({
    ...C_F_C_F,
    shield: true,
    imageFile: `${IMAGE_PATH_BASE}C*_F_C*_F-1-0.svg`
});


STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("C_F_F_F"));
STANDARD_TILES.push(tileGenerator("RR_C_F"));
STANDARD_TILES.push(tileGenerator("RR_C_F"));
STANDARD_TILES.push(tileGenerator("RR_C_F"));


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
    ],
    rotation: 0,
    imageFile: `${IMAGE_PATH_BASE}C_R*_F_R*-0-0.svg`
};
STANDARD_TILES.push(...[C_R_F_R, C_R_F_R, C_R_F_R]);


STANDARD_TILES.push(tileGenerator("RR_F_C"));
STANDARD_TILES.push(tileGenerator("RR_F_C"));
STANDARD_TILES.push(tileGenerator("RR_F_C"));
STANDARD_TILES.push(tileGenerator("C_R_R_R"));
STANDARD_TILES.push(tileGenerator("C_R_R_R"));
STANDARD_TILES.push(tileGenerator("C_R_R_R"));
STANDARD_TILES.push(tileGenerator("F_F_F_F", false, true));
STANDARD_TILES.push(tileGenerator("F_F_F_F", false, true));
STANDARD_TILES.push(tileGenerator("F_F_F_F", false, true));
STANDARD_TILES.push(tileGenerator("F_F_F_F", false, true));
STANDARD_TILES.push(tileGenerator("F_F_R_F", false, true));
STANDARD_TILES.push(tileGenerator("F_F_R_F", false, true));
STANDARD_TILES.push(tileGenerator("RR_F_F"));
STANDARD_TILES.push(tileGenerator("RR_F_F"));
STANDARD_TILES.push(tileGenerator("RR_F_F"));
STANDARD_TILES.push(tileGenerator("RR_F_F"));
STANDARD_TILES.push(tileGenerator("RR_F_F"));
STANDARD_TILES.push(tileGenerator("RR_F_F"));
STANDARD_TILES.push(tileGenerator("RR_F_F"));
STANDARD_TILES.push(tileGenerator("RR_F_F"));
STANDARD_TILES.push(tileGenerator("RR_F_F"));


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
    ],
    rotation: 0,
    imageFile: `${IMAGE_PATH_BASE}F_R*_F_R*-0-0.svg`
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
 * RIVER TILES
 */

const RIVER_TILES: IAvilaTile[] = [];
RIVER_TILES.push(tileGenerator("F_F_V_F")); // river source (start tile)
RIVER_TILES.push(tileGenerator("V_F_V_F"));
RIVER_TILES.push(tileGenerator("V_F_V_F"));
RIVER_TILES.push(tileGenerator("F_F_V_V"));
RIVER_TILES.push(tileGenerator("F_F_V_V"));
RIVER_TILES.push(tileGenerator("RR_V_V"));
RIVER_TILES.push(tileGenerator("V_V_CC"));
RIVER_TILES.push(tileGenerator("F_V_R_V", false, true));
RIVER_TILES.push(tileGenerator("C_V_R_V"));
RIVER_TILES.push(tileGenerator("C_V_C_V"));
RIVER_TILES.push({
    edges: [
        {
            type: AvilaFeature.Road,
            connectedEdges: [2],
        },
        {
            type: AvilaFeature.River,
        },
        {
            type: AvilaFeature.Road,
            connectedEdges: [0],
        },
        {
            type: AvilaFeature.River,
        },
    ],
    rotation: 0,
    imageFile: `${IMAGE_PATH_BASE}R*_V_R*_V-0-0.svg`
});
RIVER_TILES.push(tileGenerator("V_F_F_F")); // river lake (end tile)


/**
 * Gets an array of all river tiles
 * @param shuffle if true, shuffle the tiles, but keep the source as the first tile and
 * the lake as the last tile
 * @returns an array of river tiles
 */
export function getRiverTiles(shuffle: boolean): IAvilaTile[] {
    let tiles = structuredClone(RIVER_TILES);
    if (shuffle){
        const middle = tiles.slice(1, tiles.length - 1);
        shuffleTiles(middle);
        tiles = [tiles[0], ...middle, tiles[tiles.length - 1]];
    }
    return tiles;
}

/**
 * END OF RIVER TILES
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
 * @param shuffle true if tiles should be shuffled
 * @param addRiver true if river expansion cards should be added
 * @returns the generated tiles
 */
export function createTiles(shuffle: boolean, addRiver?: boolean): IAvilaTile[] {
    let tiles: IAvilaTile[] = [];

    // add river tiles
    if (addRiver) {
        tiles.push(...getRiverTiles(shuffle));
    }

    const regularTiles = structuredClone(STANDARD_TILES);

    // add regular tiles
    if (shuffle) {
        shuffleTiles(regularTiles);
        if (!addRiver) {
            tiles.push({...C_R_F_R}); // insert the standard starting tile
        }
    }
    tiles.push(...regularTiles);
    tiles.reverse();

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
 * @param fileOverride override filename to use (do not include path)
 * @returns the generated tile
 */
export function tileGenerator(descriptor: string, shield?: boolean, monestary?: boolean, fileOverride?: string): IAvilaTile {
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

    const fileName = fileOverride ?? generateImageName(descriptor, shield, monestary);
    const fullFileName = fileName ? `${IMAGE_PATH_BASE}${fileName}` : undefined;

    return {
        edges: edges,
        shield: shield,
        monestary: monestary,
        rotation: 0,
        imageFile: fullFileName,
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
        case 'V':
            return AvilaFeature.River;
    }
    throw new Error(`invlaid edge character: ${char}`);
}


/**
 * compute the image filename for a tile
 * @param descriptor the tile descriptor
 * @param shield true if the tile has a shield
 * @param monestary true if the tile is a monestary
 * @returns the filename for this tile (no path)
 */
function generateImageName(descriptor: string, shield?: boolean, monestary?: boolean): string | undefined {
    return `${descriptor}-${shield ? '1' : '0'}-${monestary ? '1' : '0'}.svg`;
}