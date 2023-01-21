import React, { useCallback, useEffect, useState } from "react";
import { IPlayingCardProps } from "../playing-card/PlayingCardFC";
import { CardHand } from "../playing-card/CardHand";
import { useDispatch, useSelector } from "react-redux";
import {
    BlackjackStatus,
    finalScoringAndReset,
    hitPlayer,
    selectBlackjackBetPool,
    selectBlackjackPlayerBank,
    selectBlackjackPlayerHand,
    selectBlackjackPlayerHandValue,
    selectBlackjackStatus,
    standPlayer,
} from "../../features/blackjackSlice";
import { BlackjackDealer } from "./BlackjackDealer";
import { BlackjackBetting } from "./BlackjackBetting";

export const BlackjackGame: React.FC<{}> = (props) => {
    const playerHand = useSelector(selectBlackjackPlayerHand);
    const playerBank = useSelector(selectBlackjackPlayerBank);
    const playerHandValue = useSelector(selectBlackjackPlayerHandValue);
    const betPool = useSelector(selectBlackjackBetPool);
    const gameStatus = useSelector(selectBlackjackStatus);
    const dispatch = useDispatch();

    const playerHandDisplay: IPlayingCardProps[] = [];
    playerHand.forEach((card) =>
        playerHandDisplay.push({ card: card, hidden: false })
    );

    useEffect(() => {
        if (gameStatus === BlackjackStatus.FinalScoring) {
            setTimeout(() => {
                dispatch(finalScoringAndReset());
            }, 750);
        }
    });

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
            <div>{`On the table: ${betPool}`}</div>
            <BlackjackDealer />
            {gameStatus === BlackjackStatus.Hitting && (
                <div>
                    <button onClick={() => dispatch(hitPlayer())}>Hit</button>
                    <button onClick={() => dispatch(standPlayer())}>
                        Stand
                    </button>
                    <div>{`Bank: ${playerBank}`}</div>
                </div>
            )}
            {gameStatus === BlackjackStatus.Betting && <BlackjackBetting />}
            <div>
                <CardHand cards={playerHandDisplay} stacked />
                <div>{`Your hand: ${playerHandValue}`}</div>
            </div>
        </div>
    );
};
