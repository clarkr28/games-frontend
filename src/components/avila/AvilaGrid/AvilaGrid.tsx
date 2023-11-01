import React from "react";
import styles from "./AvilaGrid.module.scss";
import { IconTile } from "../IconTile/IconTile";
import { EmptyTile } from "../EmptyTile/EmptyTile";
import { AvilaBoard, AvilaPlayerColor } from "../../../assets/avila/Resources";
import { Point } from "../../../assets/ConnectFourResources";

export interface IAvilaGridProps {
    gridData: AvilaBoard;
    placingTile?: boolean;
    placingMeeple?: boolean;
    lastTilePlaced?: Point;
    playerTurnColor?: AvilaPlayerColor;
}

export const AvilaGrid: React.FC<IAvilaGridProps> = (props) => {
    const {
        gridData,
        placingTile,
        placingMeeple,
        lastTilePlaced,
        playerTurnColor,
    } = props;

    const width_px = (gridData[0]?.length || 0) * 77;

    return (
        <div className={styles.grid} style={{ width: `${width_px}px` }}>
            {gridData.map((gridRow, row) => (
                <div key={row}>
                    {gridRow.map((cell, col) =>
                        cell ? (
                            <IconTile
                                key={col}
                                tile={cell}
                                placeMeepleColor={
                                    lastTilePlaced?.X === col &&
                                    lastTilePlaced?.Y === row &&
                                    placingMeeple
                                        ? playerTurnColor
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
