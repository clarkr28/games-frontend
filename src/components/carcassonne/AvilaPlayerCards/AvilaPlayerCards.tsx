import React from "react";
import { useAppSelector } from "../../../app/hooks";
import {
    selectAvilaCurrentTile,
    selectAvilaCurrentTurn,
    selectAvilaPlayerData,
} from "../../../features/avilaSlice";
import { AvilaPlayerCard } from "../AvilaPlayerCard/AvilaPlayerCard";

export const AvilaPlayerCards: React.FC<{}> = () => {
    const players = useAppSelector(selectAvilaPlayerData);
    const turnIndex = useAppSelector(selectAvilaCurrentTurn);
    const currentTile = useAppSelector(selectAvilaCurrentTile);

    return (
        <div>
            {players.map((player, index) => (
                <AvilaPlayerCard
                    key={index}
                    playerData={player}
                    playerName={`Player ${index + 1}`}
                    tile={turnIndex === index ? currentTile : undefined}
                />
            ))}
        </div>
    );
};
