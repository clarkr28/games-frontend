import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { recordMove } from "../../../features/avilaSlice";
import styles from "./EmptyTile.module.scss";

export interface IEmptyTileProps {
    row: number;
    col: number;
    canPlaceTile: boolean;
}

export const EmptyTile: React.FC<IEmptyTileProps> = (props) => {
    const { row, col, canPlaceTile } = props;
    const dispatch = useAppDispatch();

    return (
        <div
            className={`${styles.tile} ${canPlaceTile ? styles.hoverable : ""}`}
            onClick={() =>
                canPlaceTile && dispatch(recordMove({ X: col, Y: row }))
            }
        ></div>
    );
};
