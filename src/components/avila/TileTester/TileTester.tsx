import React, { useEffect, useState } from "react";
import {
    AvilaBoard,
    AvilaPlayerColor,
    IAvilaTile,
} from "../../../assets/avila/Resources";
import { createTiles } from "../../../assets/avila/TileResources";
import { AvilaGrid } from "../AvilaGrid/AvilaGrid";
import { ImageTile } from "../ImageTile/ImageTile";
import styles from "./TileTester.module.scss";

const USE_RIVER = true;
const TILES = createTiles(false, USE_RIVER);

export const TileTester: React.FC<{}> = () => {
    const [grid, setGrid] = useState<AvilaBoard>([]);
    const gridWidth = 12;

    // get the tiles and turn them into a grid
    useEffect(() => {
        if (TILES.length) {
            customizeTiles(TILES);
            let row: (IAvilaTile | undefined)[] = [];
            const tempGrid: AvilaBoard = [];
            TILES.forEach((tile) => {
                row.push(tile);
                if (row.length === gridWidth) {
                    tempGrid.push(row);
                    row = [];
                }
            });

            if (row.length) {
                while (row.length < gridWidth) {
                    row.push(undefined);
                }
                tempGrid.push(row);
            }

            setGrid(tempGrid);
        }
    }, []);

    return (
        <div>
            <AvilaGrid
                gridData={grid}
                lastTilePlaced={{ X: 10, Y: 5 }}
                playerTurnColor={AvilaPlayerColor.Blue}
                danceLastPlaced
            />
            <div className={styles.putMeepleWrapper}>
                <ImageTile
                    tile={TILES[46]}
                    placeMeepleColor={AvilaPlayerColor.Blue}
                    placeableMeepleLocations={{ monestary: true }}
                />
                <ImageTile
                    tile={TILES[47]}
                    placeMeepleColor={AvilaPlayerColor.Green}
                    placeableMeepleLocations={{
                        monestary: true,
                        bottomEdge: true,
                    }}
                />
                <ImageTile
                    tile={TILES[TILES.length - 1]}
                    placeMeepleColor={AvilaPlayerColor.Orange}
                    placeableMeepleLocations={{
                        topEdge: true,
                        rightEdge: true,
                        bottomEdge: true,
                        leftEdge: true,
                    }}
                />
                <ImageTile
                    tile={TILES[19]}
                    placeMeepleColor={AvilaPlayerColor.Purple}
                    placeableMeepleLocations={{
                        topEdge: true,
                        bottomEdge: true,
                    }}
                />
                <ImageTile
                    tile={TILES[33]}
                    placeMeepleColor={AvilaPlayerColor.Red}
                    placeableMeepleLocations={{
                        topEdge: true,
                        bottomEdge: true,
                    }}
                />
            </div>
        </div>
    );
};

function indexPicker(baseIndex: number, useRiver: boolean): number {
    const riverOffset = useRiver ? 12 : 0;
    return baseIndex + riverOffset;
}

function customizeTiles(tiles: IAvilaTile[]): void {
    tiles[indexPicker(40, USE_RIVER)].meeple = {
        playerColor: AvilaPlayerColor.Blue,
        playerIndex: 0, // doesn't matter for this test
        edgeIndex: 3,
    };
    tiles[indexPicker(16, USE_RIVER)].meeple = {
        playerColor: AvilaPlayerColor.Green,
        playerIndex: 0, // doesn't matter for this test
        edgeIndex: 0,
    };
    tiles[indexPicker(17, USE_RIVER)].meeple = {
        playerColor: AvilaPlayerColor.Orange,
        playerIndex: 0, // doesn't matter for this test
        edgeIndex: 1,
    };
    tiles[indexPicker(41, USE_RIVER)].meeple = {
        playerColor: AvilaPlayerColor.Purple,
        playerIndex: 0, // doesn't matter for this test
        edgeIndex: 2,
    };
    tiles[indexPicker(45, USE_RIVER)].meeple = {
        playerColor: AvilaPlayerColor.Red,
        playerIndex: 0, // doesn't matter for this test
        onMonestary: true,
    };
}
