import React from "react";
import { IAvilaPlayer, IAvilaTile } from "../../../assets/avila/Resources";
import { AvilaTile } from "../AvilaTile/AvilaTile";
import styles from "./AvilaPlayerCard.module.scss";

export interface IAvilaPlayerCardProps {
    playerData: IAvilaPlayer;
    tile?: IAvilaTile;
    playerName: string;
}

export const AvilaPlayerCard: React.FC<IAvilaPlayerCardProps> = (props) => {
    const { playerData, tile, playerName } = props;

    return (
        <div className={styles.playerCard}>
            <p>
                <strong>{playerName}</strong>
            </p>
            <div>{tile && <AvilaTile tile={tile} />}</div>
            <p>{`Meeple: ${playerData.availableMeeple}`}</p>
            <p>{`Score: ${playerData.score}`}</p>
        </div>
    );
};
