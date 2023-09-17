import React, { useEffect } from "react";
import { AvilaGrid } from "../AvilaGrid/AvilaGrid";
import styles from "./AvilaGame.module.scss";
import { AvilaPlayerCards } from "../AvilaPlayerCards/AvilaPlayerCards";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    finishMove,
    selectAvilaBoard,
    selectAvilaCurrentTurn,
    selectAvilaLastTilePlaced,
    selectAvilaPlayerData,
    selectAvilaStatus,
} from "../../../features/avilaSlice";
import { AvilaSettings } from "../AvilaSettings/AvilaSettings";
import { AvilaGameStatus } from "../../../assets/avila/Resources";

export const AvilaGame: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const gridData = useAppSelector(selectAvilaBoard);
    const gameStatus = useAppSelector(selectAvilaStatus);
    const lastTilePlaced = useAppSelector(selectAvilaLastTilePlaced);
    const playerData = useAppSelector(selectAvilaPlayerData);
    const playerTurn = useAppSelector(selectAvilaCurrentTurn);

    useEffect(() => {
        // trigger the end of a move
        if (gameStatus === AvilaGameStatus.TriggerFinishMove) {
            dispatch(finishMove());
        }
    }, [gameStatus]);

    return (
        <div className={styles.game}>
            {gameStatus === AvilaGameStatus.Pregame ? (
                <AvilaSettings />
            ) : (
                <AvilaGrid
                    gridData={gridData}
                    placingTile={gameStatus === AvilaGameStatus.PlacingTile}
                    lastTilePlaced={lastTilePlaced}
                    placingMeeple={gameStatus === AvilaGameStatus.PlacingMeeple}
                    playerTurnColor={playerData[playerTurn].color}
                />
            )}
            <AvilaPlayerCards gameStatus={gameStatus} />
        </div>
    );
};
