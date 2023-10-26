import React, { useEffect } from "react";
import { AvilaGrid } from "../AvilaGrid/AvilaGrid";
import styles from "./AvilaGame.module.scss";
import { AvilaPlayerCards } from "../AvilaPlayerCards/AvilaPlayerCards";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    applyOpponentEndTurn,
    applyOpponentPlacedTile,
    finishMove,
    hostStartedGame,
    selectAvilaBoard,
    selectAvilaCurrentTurn,
    selectAvilaLastTilePlaced,
    selectAvilaPlayerData,
    selectAvilaStatus,
    setIsServerConnected,
    setMyPlayerIndex,
} from "../../../features/avilaSlice";
import { AvilaSettings } from "../AvilaSettings/AvilaSettings";
import { AvilaGameStatus } from "../../../assets/avila/Resources";
import {
    CommWrapper,
    IEndTurnData,
    IPlacedTileData,
    IStartGameData,
} from "../../../assets/avila/CommWrapper";

export const AvilaGame: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const gridData = useAppSelector(selectAvilaBoard);
    const gameStatus = useAppSelector(selectAvilaStatus);
    const lastTilePlaced = useAppSelector(selectAvilaLastTilePlaced);
    const playerData = useAppSelector(selectAvilaPlayerData);
    const playerTurn = useAppSelector(selectAvilaCurrentTurn);

    // trigger the end of a move
    useEffect(() => {
        if (gameStatus === AvilaGameStatus.TriggerFinishMove) {
            dispatch(finishMove());
        }
    }, [gameStatus, dispatch]);

    useEffect(() => {
        // connect to the server
        CommWrapper.Connect();
        // this return only works because strict mode was removed
        return () => CommWrapper.Close();
    }, []);

    // link callbacks from the server communication handler to action dispatches
    useEffect(() => {
        CommWrapper.startGameCallback = (data: IStartGameData) =>
            dispatch(hostStartedGame(data));
        CommWrapper.joinedRoomPlayerCallback = (index: number) =>
            dispatch(setMyPlayerIndex(index));
        CommWrapper.opponentPlacedTileCallback = (data: IPlacedTileData) =>
            dispatch(applyOpponentPlacedTile(data));
        CommWrapper.opponentEndTurnCallback = (data: IEndTurnData) =>
            dispatch(applyOpponentEndTurn(data));
        CommWrapper.serverConnectedCallback = (isConnected: boolean) =>
            dispatch(setIsServerConnected(isConnected));
    }, [dispatch]);

    return (
        <div className={styles.game}>
            <div className={styles.boardContainer}>
                {gameStatus === AvilaGameStatus.Pregame ? (
                    <AvilaSettings />
                ) : (
                    <AvilaGrid
                        gridData={gridData}
                        placingTile={gameStatus === AvilaGameStatus.PlacingTile}
                        lastTilePlaced={lastTilePlaced}
                        placingMeeple={
                            gameStatus === AvilaGameStatus.PlacingMeeple
                        }
                        playerTurnColor={playerData[playerTurn].color}
                    />
                )}
            </div>
            <AvilaPlayerCards gameStatus={gameStatus} />
        </div>
    );
};
