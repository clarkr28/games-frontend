import React, { useEffect, useState } from "react";
import { AvilaPlayerColor, IAvilaTile } from "../../../assets/avila/Resources";
import { createTiles } from "../../../assets/avila/TileResources";
import { AvilaGrid } from "../AvilaGrid/AvilaGrid";

export const TileTester: React.FC<{}> = () => {
    const [grid, setGrid] = useState<IAvilaTile[][]>([]);

    // get the tiles and turn them into a grid
    useEffect(() => {
        const tiles = createTiles(false);
        customizeTiles(tiles);
        let row: IAvilaTile[] = [];
        const tempGrid: IAvilaTile[][] = [];
        tiles.forEach((tile, index) => {
            row.push(tile);
            if (index % 8 === 0 && index > 0) {
                tempGrid.push(row);
                row = [];
            }
        });

        if (row.length) {
            tempGrid.push(row);
        }

        setGrid(tempGrid);
    }, []);

    return (
        <div>
            <AvilaGrid gridData={grid} />
        </div>
    );
};

function customizeTiles(tiles: IAvilaTile[]): void {
    tiles[40].meeple = {
        playerColor: AvilaPlayerColor.Blue,
        playerIndex: 0, // doesn't matter for this test
        edgeIndex: 3,
    };
    tiles[16].meeple = {
        playerColor: AvilaPlayerColor.Green,
        playerIndex: 0, // doesn't matter for this test
        edgeIndex: 0,
    };
    tiles[17].meeple = {
        playerColor: AvilaPlayerColor.Orange,
        playerIndex: 0, // doesn't matter for this test
        edgeIndex: 1,
    };
    tiles[41].meeple = {
        playerColor: AvilaPlayerColor.Purple,
        playerIndex: 0, // doesn't matter for this test
        edgeIndex: 2,
    };
    tiles[45].meeple = {
        playerColor: AvilaPlayerColor.Red,
        playerIndex: 0, // doesn't matter for this test
        onMonestary: true,
    };
}
