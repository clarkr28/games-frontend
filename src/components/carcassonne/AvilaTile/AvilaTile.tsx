import React from "react";
import {
    AvilaFeature,
    IAvilaTile,
    getAdjacencyType,
    getEdgeType,
} from "../../../assets/avila/Resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./AvilaTile.module.scss";

const Monestary = <FontAwesomeIcon icon={solid("place-of-worship")} />;

export interface IAvilaTileProps {
    tile: IAvilaTile;
}

export const AvilaTile: React.FC<IAvilaTileProps> = (props) => {
    const { tile } = props;

    const possibleMiddleCells = [
        getAdjacencyType(tile, 0, 2),
        getAdjacencyType(tile, 1, 3),
    ];
    const middleCell = possibleMiddleCells.filter(
        (val) => val !== AvilaFeature.Field
    );

    return (
        <div
            className={`${styles.tileContainer} ${
                tile.shield ? styles.hasShield : ""
            }`}
        >
            <div>{getEdgeDisplayIcon(getEdgeType(tile, 0))}</div>
            <div className={styles.adjacencyRow}>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 3, 0))}</div>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 0, 1))}</div>
            </div>
            <div className={styles.middleRow}>
                <div>{getEdgeDisplayIcon(getEdgeType(tile, 3))}</div>
                <div>
                    {tile.monestary
                        ? Monestary
                        : middleCell.length
                        ? getEdgeDisplayIcon(middleCell[0])
                        : null}
                </div>
                <div>{getEdgeDisplayIcon(getEdgeType(tile, 1))}</div>
            </div>
            <div className={styles.adjacencyRow}>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 2, 3))}</div>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 1, 2))}</div>
            </div>
            <div>{getEdgeDisplayIcon(getEdgeType(tile, 2))}</div>
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
