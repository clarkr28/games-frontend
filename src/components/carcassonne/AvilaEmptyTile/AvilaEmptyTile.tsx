import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { recordMove } from "../../../features/avilaSlice";
import styles from "./AvilaEmptyTile.module.scss";

export interface IAvilaEmptyTileProps {
    row: number;
    col: number;
    canPlaceTile: boolean;
}

export const AvilaEmptyTile: React.FC<IAvilaEmptyTileProps> = (props) => {
    const { row, col, canPlaceTile } = props;
    const dispatch = useAppDispatch();

    return (
        <div
            className={`${styles.tile} ${canPlaceTile ? styles.hoverable : ""}`}
            onClick={() => dispatch(recordMove({ X: col, Y: row }))}
        ></div>
    );
};