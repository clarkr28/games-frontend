import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    finishMove,
    rotateCurrentTile,
    selectAvilaCurrentTile,
    selectAvilaCurrentTurn,
    selectAvilaPlayerData,
} from "../../../features/avilaSlice";
import { AvilaPlayerCard } from "../AvilaPlayerCard/AvilaPlayerCard";
import { AvilaGameStatus } from "../../../assets/avila/Resources";

export interface IAvilaPlayerCardsProps {
    gameStatus: AvilaGameStatus;
}

export const AvilaPlayerCards: React.FC<IAvilaPlayerCardsProps> = (props) => {
    const { gameStatus } = props;

    const players = useAppSelector(selectAvilaPlayerData);
    const turnIndex = useAppSelector(selectAvilaCurrentTurn);
    const currentTile = useAppSelector(selectAvilaCurrentTile);
    const dispatch = useAppDispatch();

    return (
        <div>
            {players.map((player, index) => (
                <AvilaPlayerCard
                    key={index}
                    playerData={player}
                    playerName={`Player ${index + 1}`}
                    tile={
                        turnIndex === index &&
                        gameStatus === AvilaGameStatus.PlacingTile
                            ? currentTile
                            : undefined
                    }
                    rotateCallback={() => dispatch(rotateCurrentTile())}
                    placingMeeple={
                        turnIndex === index &&
                        gameStatus === AvilaGameStatus.PlacingMeeple
                    }
                    skipMeepleCallback={() => dispatch(finishMove())}
                />
            ))}
        </div>
    );
};
