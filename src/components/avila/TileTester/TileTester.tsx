import React, { useEffect, useState } from "react";
import { IAvilaTile } from "../../../assets/avila/Resources";
import { createTiles } from "../../../assets/avila/TileResources";
import { AvilaGrid } from "../AvilaGrid/AvilaGrid";

export const TileTester: React.FC<{}> = () => {
    const [grid, setGrid] = useState<IAvilaTile[][]>([]);

    // get the tiles and turn them into a grid
    useEffect(() => {
        const tiles = createTiles(true, false);
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
