import React from "react";
import { IAvilaPlayer, IAvilaTile } from "../../../assets/avila/Resources";
import { IconTile } from "../IconTile/IconTile";
import styles from "./AvilaPlayerCard.module.scss";
import { IconButton } from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface IAvilaPlayerCardProps {
    playerData: IAvilaPlayer;
    tile?: IAvilaTile;
    playerName: string;
    rotateCallback: () => void;
    showRotateButton?: boolean;
    placingMeeple: boolean;
    skipMeepleCallback: () => void;
    numRemainingTiles: number;
}

export const AvilaPlayerCard: React.FC<IAvilaPlayerCardProps> = (props) => {
    const {
        playerData,
        tile,
        playerName,
        rotateCallback,
        showRotateButton,
        placingMeeple,
        skipMeepleCallback,
        numRemainingTiles,
    } = props;

    return (
        <div className={styles.playerCard}>
            <p
                className={`${styles.playerName} ${
                    styles[playerData.color.toString()]
                }`}
            >
                <strong>{playerName}</strong>
            </p>
            {tile && <p>{`${numRemainingTiles} tiles left`}</p>}
            <div className={tile ? styles.tileWrapper : ""}>
                {tile && <IconTile tile={tile} />}
            </div>
            {showRotateButton && (
                <IconButton
                    displayText="Rotate"
                    icon={solid("rotate")}
                    clickCallback={rotateCallback}
                />
            )}
            {placingMeeple && (
                <IconButton
                    displayText="Skip Meeple"
                    icon={solid("ban")}
                    clickCallback={skipMeepleCallback}
                />
            )}
            <p>{`Meeple: ${playerData.availableMeeple}`}</p>
            <p>{`Score: ${playerData.score}`}</p>
        </div>
    );
};
