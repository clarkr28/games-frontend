import React from "react";
import {
    AvilaFeature,
    AvilaPlayerColor,
    IAvilaTile,
    getAdjacencyType,
    getEdgeType,
} from "../../../assets/avila/Resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./IconTile.module.scss";
import { useAppDispatch } from "../../../app/hooks";
import { placeMeeple } from "../../../features/avilaSlice";

const Monestary = <FontAwesomeIcon icon={solid("place-of-worship")} />;

export interface IIconTileProps {
    tile: IAvilaTile;
    placeMeepleColor?: AvilaPlayerColor; // the color of the player placing meeples
}

export const IconTile: React.FC<IIconTileProps> = (props) => {
    const { tile, placeMeepleColor } = props;
    const dispatch = useAppDispatch();

    const canPlaceMeepleTop = placeMeepleColor !== undefined;
    const canPlaceMeepleRight = placeMeepleColor !== undefined;
    const canPlaceMeepleBottom = placeMeepleColor !== undefined;
    const canPlaceMeepleLeft = placeMeepleColor !== undefined;
    const canPlaceMeepleMonestary =
        placeMeepleColor !== undefined && tile.monestary;

    const possibleMiddleCells = [
        getAdjacencyType(tile, 0, 2),
        getAdjacencyType(tile, 1, 3),
    ];
    const middleCell = possibleMiddleCells.filter(
        (val) => val !== AvilaFeature.Field
    );

    const placeMeepleClasses = placeMeepleColor
        ? `${styles.canPlace} ${styles[placeMeepleColor.toString() + "Hover"]} `
        : "";

    return (
        <div
            className={`${styles.tileContainer} ${
                tile.shield ? styles.hasShield : ""
            }`}
        >
            <div
                className={`${placeMeepleClasses} ${
                    tile.meeple?.edgeIndex === 0
                        ? styles[tile.meeple.playerColor.toString()]
                        : ""
                }`}
                onClick={() =>
                    canPlaceMeepleTop && dispatch(placeMeeple({ edgeIndex: 0 }))
                }
            >
                {getEdgeDisplayIcon(getEdgeType(tile, 0))}
            </div>
            <div className={styles.adjacencyRow}>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 3, 0))}</div>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 0, 1))}</div>
            </div>
            <div className={styles.middleRow}>
                <div
                    className={`${placeMeepleClasses} ${
                        tile.meeple?.edgeIndex === 3
                            ? styles[tile.meeple.playerColor.toString()]
                            : ""
                    }`}
                    onClick={() =>
                        canPlaceMeepleLeft &&
                        dispatch(placeMeeple({ edgeIndex: 3 }))
                    }
                >
                    {getEdgeDisplayIcon(getEdgeType(tile, 3))}
                </div>
                <div
                    className={`${tile.monestary ? placeMeepleClasses : ""} ${
                        tile.meeple?.onMonestary
                            ? styles[tile.meeple.playerColor.toString()]
                            : ""
                    }`}
                    onClick={() =>
                        canPlaceMeepleMonestary &&
                        dispatch(placeMeeple({ onMonestary: true }))
                    }
                >
                    {tile.monestary
                        ? Monestary
                        : middleCell.length
                        ? getEdgeDisplayIcon(middleCell[0])
                        : null}
                </div>
                <div
                    className={`${placeMeepleClasses} ${
                        tile.meeple?.edgeIndex === 1
                            ? styles[tile.meeple.playerColor.toString()]
                            : ""
                    }`}
                    onClick={() =>
                        canPlaceMeepleRight &&
                        dispatch(placeMeeple({ edgeIndex: 1 }))
                    }
                >
                    {getEdgeDisplayIcon(getEdgeType(tile, 1))}
                </div>
            </div>
            <div className={styles.adjacencyRow}>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 2, 3))}</div>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 1, 2))}</div>
            </div>
            <div
                className={`${placeMeepleClasses} ${
                    tile.meeple?.edgeIndex === 2
                        ? styles[tile.meeple.playerColor.toString()]
                        : ""
                }`}
                onClick={() =>
                    canPlaceMeepleBottom &&
                    dispatch(placeMeeple({ edgeIndex: 2 }))
                }
            >
                {getEdgeDisplayIcon(getEdgeType(tile, 2))}
            </div>
        </div>
    );
};

function getEdgeDisplayIcon(edge: AvilaFeature): JSX.Element | null {
    switch (edge) {
        case AvilaFeature.City:
            return <FontAwesomeIcon icon={solid("city")} />;
        case AvilaFeature.Road:
            return <FontAwesomeIcon icon={solid("road")} />;
        case AvilaFeature.Field:
            //return <FontAwesomeIcon icon={solid("wheat-awn")} />;
            return null;
    }
}
