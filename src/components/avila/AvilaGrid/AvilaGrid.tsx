import React from "react";
import styles from "./AvilaGrid.module.scss";
import { EmptyTile } from "../EmptyTile/EmptyTile";
import {
    AvilaBoard,
    AvilaPlayerColor,
    IPlaceableMeepleLocations,
} from "../../../assets/avila/Resources";
import { Point } from "../../../assets/ConnectFourResources";
import { ImageTile } from "../ImageTile/ImageTile";
import { PlaceMeepleData } from "../../../features/avilaSlice";

export interface IAvilaGridProps {
    gridData: AvilaBoard;
    placingTile?: boolean;
    placingMeeple?: boolean;
    lastTilePlaced?: Point;
    playerTurnColor?: AvilaPlayerColor;
    placeMeepleCallback?: (data: PlaceMeepleData) => void;
    placeableMeepleLocations?: IPlaceableMeepleLocations;
}

export const AvilaGrid: React.FC<IAvilaGridProps> = (props) => {
    const {
        gridData,
        placingTile,
        placingMeeple,
        lastTilePlaced,
        playerTurnColor,
        placeMeepleCallback,
        placeableMeepleLocations,
    } = props;

    const width_px = (gridData[0]?.length || 0) * 77;

    return (
        <div className={styles.grid} style={{ width: `${width_px}px` }}>
            {gridData.map((gridRow, row) => (
                <div key={row}>
                    {gridRow.map((cell, col) =>
                        cell ? (
                            <ImageTile
                                key={col}
                                tile={cell}
                                placeMeepleColor={
                                    lastTilePlaced?.X === col &&
                                    lastTilePlaced?.Y === row &&
                                    placingMeeple
                                        ? playerTurnColor
                                        : undefined
                                }
                                placeMeepleCallback={placeMeepleCallback}
                                placeableMeepleLocations={
                                    lastTilePlaced?.X === col &&
                                    lastTilePlaced?.Y === row &&
                                    placingMeeple
                                        ? placeableMeepleLocations
                                        : undefined
                                }
                            />
                        ) : (
                            <EmptyTile
                                key={col}
                                row={row}
                                col={col}
                                canPlaceTile={placingTile || false}
                            />
                        )
                    )}
                </div>
            ))}
        </div>
    );
};
