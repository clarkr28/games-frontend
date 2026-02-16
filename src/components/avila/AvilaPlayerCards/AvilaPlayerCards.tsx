import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  finishMove,
  rotateCurrentTile,
  selectAvilaCurrentTile,
  selectAvilaCurrentTurn,
  selectAvilaPlaceableMeepleLocations,
  selectAvilaPlayerData,
  selectAvilaRemainingTilesCount,
} from "../../../features/avilaSlice";
import { AvilaPlayerCard } from "../AvilaPlayerCard/AvilaPlayerCard";
import { AvilaGameStatus, isMeeplePlaceable } from "../../../assets/avila/Resources";

export interface IAvilaPlayerCardsProps {
  gameStatus: AvilaGameStatus;
}

export const AvilaPlayerCards: React.FC<IAvilaPlayerCardsProps> = (props) => {
  const { gameStatus } = props;

  const players = useAppSelector(selectAvilaPlayerData);
  const turnIndex = useAppSelector(selectAvilaCurrentTurn);
  const currentTile = useAppSelector(selectAvilaCurrentTile);
  const numRemainingTiles = useAppSelector(selectAvilaRemainingTilesCount);
  const placeableMeepleLocations = useAppSelector(selectAvilaPlaceableMeepleLocations);
  const dispatch = useAppDispatch();

  return (
    <div>
      {players.map((player, index) => {
        const myTurn = turnIndex === index;
        const myTurnPlacingMeeple = turnIndex === index && gameStatus === AvilaGameStatus.PlacingMeeple;
        const flierCannotPlace =
          gameStatus === AvilaGameStatus.PlacingMeepleFromFlier && !isMeeplePlaceable(placeableMeepleLocations);
        const myTurnPlacingFlier = myTurn && gameStatus === AvilaGameStatus.PlacingMeepleFromFlier;
        return (
          <AvilaPlayerCard
            key={index}
            playerData={player}
            playerName={player.name}
            tile={
              myTurn && (gameStatus === AvilaGameStatus.PlacingTile || gameStatus === AvilaGameStatus.WaitingForTurn)
                ? currentTile
                : undefined
            }
            rotateCallback={() => dispatch(rotateCurrentTile())}
            showEndTurn={myTurnPlacingMeeple || (myTurn && flierCannotPlace)}
            skipMeepleCallback={() => dispatch(finishMove())}
            numRemainingTiles={numRemainingTiles}
            showRotateButton={myTurn && gameStatus === AvilaGameStatus.PlacingTile}
            showFlierButton={(myTurnPlacingMeeple && !!currentTile?.hasFlier) || myTurnPlacingFlier}
          />
        );
      })}
    </div>
  );
};
