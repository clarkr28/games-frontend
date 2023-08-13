import React from "react";
import { AvilaGrid } from "../AvilaGrid/AvilaGrid";
import styles from "./AvilaGame.module.scss";
import { AvilaPlayerCards } from "../AvilaPlayerCards/AvilaPlayerCards";
import { useAppSelector } from "../../../app/hooks";
import {
    selectAvilaBoard,
    selectAvilaStatus,
} from "../../../features/avilaSlice";
import { AvilaSettings } from "../AvilaSettings/AvilaSettings";
import { AvilaGameStatus } from "../../../assets/avila/Resources";

export const AvilaGame: React.FC<{}> = () => {
    const gridData = useAppSelector(selectAvilaBoard);
    const gameStatus = useAppSelector(selectAvilaStatus);

    return (
        <div className={styles.game}>
            {gameStatus === AvilaGameStatus.Pregame ? (
                <AvilaSettings />
            ) : (
                <AvilaGrid gridData={gridData} />
            )}
            <AvilaPlayerCards />
        </div>
    );
};
