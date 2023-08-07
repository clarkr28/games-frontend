import React from "react";
import {
    CarcassonneEdgeType,
    ICarcassonneTile,
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

    return (
        <div className={styles.tileContainer}>
            <div>{getEdgeDisplayIcon(getEdgeType(tile, 0))}</div>
            <div className={styles.middleRow}>
                <div>{getEdgeDisplayIcon(getEdgeType(tile, 3))}</div>
                <div>{getEdgeDisplayIcon(getEdgeType(tile, 1))}</div>
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
            return <FontAwesomeIcon icon={solid("wheat-awn")} />;
    }
}
