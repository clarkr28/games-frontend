import React from "react";
import {
    CarcassonneEdgeType,
    ICarcassonneTile,
    getAdjacencyType,
    getEdgeType,
} from "../../../assets/CarcassonneResources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./CarcassonneTile.module.scss";

export interface ICarcassonneTileProps {
    tile: ICarcassonneTile;
}

export const CarcassonneTile: React.FC<ICarcassonneTileProps> = (props) => {
    const { tile } = props;

    const possibleMiddleCells = [
        getAdjacencyType(tile, 0, 2),
        getAdjacencyType(tile, 1, 3),
    ];
    const middleCell = possibleMiddleCells.filter(
        (val) => val !== CarcassonneEdgeType.Field
    );

    return (
        <div className={styles.tileContainer}>
            <div>{getEdgeDisplayIcon(getEdgeType(tile, 0))}</div>
            <div className={styles.adjacencyRow}>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 3, 0))}</div>
                <div>{getEdgeDisplayIcon(getAdjacencyType(tile, 0, 1))}</div>
            </div>
            <div className={styles.middleRow}>
                <div>{getEdgeDisplayIcon(getEdgeType(tile, 3))}</div>
                <div>
                    {middleCell.length
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

function getEdgeDisplayIcon(edge: CarcassonneEdgeType): JSX.Element | null {
    switch (edge) {
        case CarcassonneEdgeType.City:
            return <FontAwesomeIcon icon={solid("city")} />;
        case CarcassonneEdgeType.Road:
            return <FontAwesomeIcon icon={solid("road")} />;
        case CarcassonneEdgeType.Field:
            //return <FontAwesomeIcon icon={solid("wheat-awn")} />;
            return null;
    }
}
