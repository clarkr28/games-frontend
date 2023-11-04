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

export const TileTester: React.FC<{}> = () => {
    const [grid, setGrid] = useState<AvilaBoard>([]);
    const [tiles, setTiles] = useState<IAvilaTile[]>(createTiles(false));
    const gridWidth = 12;

    // get the tiles and turn them into a grid
    useEffect(() => {
        if (tiles.length) {
            customizeTiles(tiles);
            let row: (IAvilaTile | undefined)[] = [];
            const tempGrid: AvilaBoard = [];
            tiles.forEach((tile) => {
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
    }, [tiles.length]);

    return (
        <div>
            <AvilaGrid
                gridData={grid}
                lastTilePlaced={{ X: 10, Y: 5 }}
                playerTurnColor={AvilaPlayerColor.Blue}
            />
            <div className={styles.putMeepleWrapper}>
                <ImageTile
                    tile={tiles[46]}
                    placeMeepleColor={AvilaPlayerColor.Blue}
                />
                <ImageTile
                    tile={tiles[47]}
                    placeMeepleColor={AvilaPlayerColor.Green}
                />
                <ImageTile
                    tile={tiles[tiles.length - 1]}
                    placeMeepleColor={AvilaPlayerColor.Orange}
                />
                <ImageTile
                    tile={tiles[19]}
                    placeMeepleColor={AvilaPlayerColor.Purple}
                />
                <ImageTile
                    tile={tiles[33]}
                    placeMeepleColor={AvilaPlayerColor.Red}
                />
            </div>
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
