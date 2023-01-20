import React, { useCallback, useEffect, useState } from "react";
import { IPlayingCardProps } from "../playing-card/PlayingCardFC";
import { CardHand } from "../playing-card/CardHand";
import { useDispatch, useSelector } from "react-redux";
import {
    BlackjackStatus,
    finalScoringAndReset,
    finalizeBet,
    hitPlayer,
    selectBlackjackBetPool,
    selectBlackjackPlayerBank,
    selectBlackjackPlayerHand,
    selectBlackjackPlayerHandValue,
    selectBlackjackStatus,
    standPlayer,
} from "../../features/blackjackSlice";
import { BlackjackDealer } from "./BlackjackDealer";

export const BlackjackGame: React.FC<{}> = (props) => {
    const playerHand = useSelector(selectBlackjackPlayerHand);
    const playerBank = useSelector(selectBlackjackPlayerBank);
    const playerHandValue = useSelector(selectBlackjackPlayerHandValue);
    const betPool = useSelector(selectBlackjackBetPool);
    const gameStatus = useSelector(selectBlackjackStatus);
    const dispatch = useDispatch();
    const [betAmount, setBetAmount] = useState(25);

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

    const trySetBet = useCallback(
        (delta: number) => {
            const newBetAmount = betAmount + delta;

            // don't let a player bet more than what is in their bank
            if (newBetAmount > playerBank) {
                setBetAmount(playerBank);
                return;
            }

            // don't let a player bet a negative amount
            if (newBetAmount < 0) {
                setBetAmount(0);
                return;
            }

            setBetAmount(newBetAmount);
        },
        [betAmount, playerBank]
    );

    return (
        <>
            <BlackjackDealer />
            <div>{`On the table: ${betPool}`}</div>
            <div>
                <CardHand cards={playerHandDisplay} stacked />
                <div>{`Your hand: ${playerHandValue}`}</div>
            </div>
            {gameStatus === BlackjackStatus.Hitting && (
                <div>
                    <button onClick={() => dispatch(hitPlayer())}>Hit</button>
                    <button onClick={() => dispatch(standPlayer())}>
                        Stand
                    </button>
                </div>
            )}
            <div>{`Bank: ${playerBank}`}</div>
            {gameStatus === BlackjackStatus.Betting && (
                <div>
                    <div>{`Bet Amount: ${betAmount}`}</div>
                    <button onClick={() => dispatch(finalizeBet(betAmount))}>
                        Place Bet
                    </button>
                    <button onClick={() => trySetBet(1)}>+1</button>
                    <button onClick={() => trySetBet(-1)}>-1</button>
                    <button onClick={() => trySetBet(10)}>+10</button>
                    <button onClick={() => trySetBet(-10)}>-10</button>
                </div>
            )}
        </>
    );
};
