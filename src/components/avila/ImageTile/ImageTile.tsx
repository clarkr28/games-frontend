import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AvilaPlayerColor, IAvilaTile, IPlaceableMeepleLocations } from "../../../assets/avila/Resources";
import { IconTile } from "../IconTile/IconTile";
import styles from "./ImageTile.module.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { PlaceMeepleData } from "../../../features/avilaSlice";
import { AvilaMeeples } from "../AvilaMeeples/AvilaMeeples";

export interface IImageTileProps {
  tile: IAvilaTile;
  placeMeepleColor?: AvilaPlayerColor;
  placeMeepleCallback?: (data: PlaceMeepleData) => void;
  placeableMeepleLocations?: IPlaceableMeepleLocations;
  dance?: boolean;
}

export const ImageTile: React.FC<IImageTileProps> = (props) => {
  const { tile, placeMeepleColor, placeMeepleCallback, placeableMeepleLocations, dance } = props;

  if (!tile.imageFile) {
    return <IconTile tile={tile} placeMeepleColor={placeMeepleColor} />;
  }

  return (
    <div className={`${styles.wrapper} ${dance ? styles.dance : ""}`}>
      <img
        className={styles.imageTile}
        style={{ transform: `rotate(${tile.rotation}deg)` }}
        src={tile.imageFile}
        alt="avila game tile"
      />
      <AvilaMeeples meeples={tile.meeples} />
      {placeableMeepleLocations?.topEdge && (
        <div
          className={`${styles.placeMeeple} ${styles.placeTop}`}
          onClick={() => placeMeepleCallback?.({ edgeIndex: 0 })}
        >
          <FontAwesomeIcon icon={solid("plus")} />
        </div>
      )}
      {placeableMeepleLocations?.rightEdge && (
        <div
          className={`${styles.placeMeeple} ${styles.placeRight}`}
          onClick={() => placeMeepleCallback?.({ edgeIndex: 1 })}
        >
          <FontAwesomeIcon icon={solid("plus")} />
        </div>
      )}
      {placeableMeepleLocations?.bottomEdge && (
        <div
          className={`${styles.placeMeeple} ${styles.placeBottom}`}
          onClick={() => placeMeepleCallback?.({ edgeIndex: 2 })}
        >
          <FontAwesomeIcon icon={solid("plus")} />
        </div>
      )}
      {placeableMeepleLocations?.leftEdge && (
        <div
          className={`${styles.placeMeeple} ${styles.placeLeft}`}
          onClick={() => placeMeepleCallback?.({ edgeIndex: 3 })}
        >
          <FontAwesomeIcon icon={solid("plus")} />
        </div>
      )}
      {placeableMeepleLocations?.monestary && (
        <div
          className={`${styles.placeMeeple} ${styles.placeMonestary}`}
          onClick={() => placeMeepleCallback?.({ onMonestary: true })}
        >
          <FontAwesomeIcon icon={solid("plus")} />
        </div>
      )}
    </div>
  );
};
