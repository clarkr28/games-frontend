import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    AvilaFeature,
    AvilaPlayerColor,
    IAvilaTile,
    getEdgeType,
} from "../../../assets/avila/Resources";
import { IconTile } from "../IconTile/IconTile";
import styles from "./ImageTile.module.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { PlaceMeepleData } from "../../../features/avilaSlice";

export interface IImageTileProps {
    tile: IAvilaTile;
    placeMeepleColor?: AvilaPlayerColor;
    placeMeepleCallback?: (data: PlaceMeepleData) => void;
}

export const ImageTile: React.FC<IImageTileProps> = (props) => {
    const { tile, placeMeepleColor, placeMeepleCallback } = props;
    if (!tile.imageFile) {
        return <IconTile tile={tile} placeMeepleColor={placeMeepleColor} />;
    }

    const showPlaceMeepleTop =
        placeMeepleColor !== undefined &&
        getEdgeType(tile, 0) !== AvilaFeature.Field;
    const showPlaceMeepleRight =
        placeMeepleColor !== undefined &&
        getEdgeType(tile, 1) !== AvilaFeature.Field;
    const showPlaceMeepleBottom =
        placeMeepleColor !== undefined &&
        getEdgeType(tile, 2) !== AvilaFeature.Field;
    const showPlaceMeepleLeft =
        placeMeepleColor !== undefined &&
        getEdgeType(tile, 3) !== AvilaFeature.Field;
    const showPlaceMeepleMonestary =
        placeMeepleColor !== undefined && tile.monestary;

    const Meeple = (
        <div
            className={`${styles.placedMeeple} ${meeplePlacement(
                tile
            )} ${meepleColor(tile)}`}
        >
            <FontAwesomeIcon icon={solid("person")} />
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <img
                className={styles.imageTile}
                style={{ transform: `rotate(${tile.rotation}deg)` }}
                src={tile.imageFile}
                alt="avila game tile"
            />
            {tile.meeple && Meeple}
            {showPlaceMeepleTop && (
                <div
                    className={`${styles.placeMeeple} ${styles.placeTop}`}
                    onClick={() => placeMeepleCallback?.({ edgeIndex: 0 })}
                ></div>
            )}
            {showPlaceMeepleRight && (
                <div
                    className={`${styles.placeMeeple} ${styles.placeRight}`}
                    onClick={() => placeMeepleCallback?.({ edgeIndex: 1 })}
                ></div>
            )}
            {showPlaceMeepleBottom && (
                <div
                    className={`${styles.placeMeeple} ${styles.placeBottom}`}
                    onClick={() => placeMeepleCallback?.({ edgeIndex: 2 })}
                ></div>
            )}
            {showPlaceMeepleLeft && (
                <div
                    className={`${styles.placeMeeple} ${styles.placeLeft}`}
                    onClick={() => placeMeepleCallback?.({ edgeIndex: 3 })}
                ></div>
            )}
            {showPlaceMeepleMonestary && (
                <div
                    className={`${styles.placeMeeple} ${styles.placeMonestary}`}
                    onClick={() => placeMeepleCallback?.({ onMonestary: true })}
                ></div>
            )}
        </div>
    );
};

function meeplePlacement(tile: IAvilaTile): string {
    if (!tile.meeple) {
        return "";
    }
    if (tile.meeple.onMonestary) {
        return styles.monestaryMeeple;
    }
    switch (tile.meeple.edgeIndex) {
        case 0:
            return styles.topMeeple;
        case 1:
            return styles.rightMeeple;
        case 2:
            return styles.bottomMeeple;
        case 3:
            return styles.leftMeeple;
    }
    return "";
}

function meepleColor(tile: IAvilaTile): string {
    if (!tile.meeple) {
        return "";
    }
    switch (tile.meeple.playerColor) {
        case AvilaPlayerColor.Blue:
            return styles.blue;
        case AvilaPlayerColor.Green:
            return styles.green;
        case AvilaPlayerColor.Orange:
            return styles.orange;
        case AvilaPlayerColor.Purple:
            return styles.purple;
        case AvilaPlayerColor.Red:
            return styles.red;
    }
}
