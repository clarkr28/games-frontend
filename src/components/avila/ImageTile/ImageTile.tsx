import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AvilaPlayerColor, IAvilaTile } from "../../../assets/avila/Resources";
import { IconTile } from "../IconTile/IconTile";
import styles from "./ImageTile.module.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface IImageTileProps {
    tile: IAvilaTile;
    placeMeepleColor?: AvilaPlayerColor;
}

export const ImageTile: React.FC<IImageTileProps> = (props) => {
    const { tile, placeMeepleColor } = props;
    if (!tile.imageFile) {
        return <IconTile tile={tile} placeMeepleColor={placeMeepleColor} />;
    }

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
                alt="image tile"
            />
            {tile.meeple && Meeple}
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
