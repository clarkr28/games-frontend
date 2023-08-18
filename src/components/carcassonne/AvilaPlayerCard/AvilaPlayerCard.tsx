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
    rotateCallback?: () => void;
}

export const AvilaPlayerCard: React.FC<IAvilaPlayerCardProps> = (props) => {
    const { playerData, tile, playerName, rotateCallback } = props;

    return (
        <div className={styles.playerCard}>
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
                    color={IconButtonColor.Grey}
                    clickCallback={rotateCallback}
                />
            )}
            <p>{`Meeple: ${playerData.availableMeeple}`}</p>
            <p>{`Score: ${playerData.score}`}</p>
        </div>
    );
};
