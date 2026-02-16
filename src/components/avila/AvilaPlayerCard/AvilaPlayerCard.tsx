import React from "react";
import { IAvilaPlayer, IAvilaTile } from "../../../assets/avila/Resources";
import styles from "./AvilaPlayerCard.module.scss";
import { IconButton } from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ImageTile } from "../ImageTile/ImageTile";
import { LabeledValue } from "../../common/LabeledValue/LabeledValue";
import { AvilaFlierButton } from "../AvilaFlierButton/AvilaFlierButton";

export interface IAvilaPlayerCardProps {
  playerData: IAvilaPlayer;
  tile?: IAvilaTile;
  playerName: string;
  rotateCallback: () => void;
  showRotateButton?: boolean;
  showEndTurn: boolean;
  skipMeepleCallback: () => void;
  numRemainingTiles: number;
  showFlierButton: boolean;
}

export const AvilaPlayerCard: React.FC<IAvilaPlayerCardProps> = (props) => {
  const {
    playerData,
    tile,
    playerName,
    rotateCallback,
    showRotateButton,
    showEndTurn,
    skipMeepleCallback,
    numRemainingTiles,
    showFlierButton,
  } = props;

  return (
    <div className={styles.playerCard}>
      <p className={`${styles.playerName} ${styles[playerData.color.toString()]}`}>
        <strong>{playerName}</strong>
      </p>
      {tile && <p>{`${numRemainingTiles} tiles left`}</p>}
      <div className={tile ? styles.tileWrapper : ""}>{tile && <ImageTile tile={tile} />}</div>
      {showRotateButton && <IconButton displayText="Rotate" icon={solid("rotate")} clickCallback={rotateCallback} />}
      {showEndTurn && <IconButton displayText="End Turn" icon={solid("ban")} clickCallback={skipMeepleCallback} />}
      {showFlierButton && <AvilaFlierButton />}
      <p>
        Meeple: <strong>{playerData.availableMeeple}</strong>
      </p>
      <LabeledValue label="Score" value={playerData.score} animateChanges />
    </div>
  );
};

/**
 * Click Use Flier
 * - randomly select 1 to 3
 * - see if any incomplete features exist on that tile (update getPlaceableMeepleLocations)
 * - EITHER:
 *    > enter placing meeple state (does it need a flier version?)
 *    > end turn
 */
