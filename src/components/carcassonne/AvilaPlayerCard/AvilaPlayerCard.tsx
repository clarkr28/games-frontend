import React from "react";
import { IAvilaPlayer, IAvilaTile } from "../../../assets/avila/Resources";
import { AvilaTile } from "../AvilaTile/AvilaTile";
import styles from "./AvilaPlayerCard.module.scss";
import {
    IconButton,
    IconButtonColor,
} from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface IAvilaPlayerCardProps {
    playerData: IAvilaPlayer;
    tile?: IAvilaTile;
    playerName: string;
    rotateCallback: () => void;
    placingMeeple: boolean;
    skipMeepleCallback: () => void;
}

export const AvilaPlayerCard: React.FC<IAvilaPlayerCardProps> = (props) => {
    const {
        playerData,
        tile,
        playerName,
        rotateCallback,
        placingMeeple,
        skipMeepleCallback,
    } = props;

    return (
        <div
            className={`${styles.playerCard} ${
                styles[playerData.color.toString()]
            }`}
        >
            <p>
                <strong>{playerName}</strong>
            </p>
            <div className={tile ? styles.tileWrapper : ""}>
                {tile && <AvilaTile tile={tile} />}
            </div>
            {tile && (
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
