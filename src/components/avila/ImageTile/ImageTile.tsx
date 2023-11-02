import { AvilaPlayerColor, IAvilaTile } from "../../../assets/avila/Resources";
import { IconTile } from "../IconTile/IconTile";
import styles from "./ImageTile.module.scss";

export interface IImageTileProps {
    tile: IAvilaTile;
    placeMeepleColor?: AvilaPlayerColor;
}

export const ImageTile: React.FC<IImageTileProps> = (props) => {
    const { tile, placeMeepleColor } = props;
    if (!tile.imageFile) {
        return <IconTile tile={tile} placeMeepleColor={placeMeepleColor} />;
    }

    return (
        <img
            className={styles.imageTile}
            style={{ transform: `rotate(${tile.rotation}deg)` }}
            src={tile.imageFile}
            alt="image tile"
        />
    );
};
