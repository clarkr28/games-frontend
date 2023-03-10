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
import styles from "./Blackjack.module.css";

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
            }, 2000);
        }
    });

    const hitStandUI = (
        <div>
            <button onClick={() => dispatch(hitPlayer())}>Hit</button>
            <button onClick={() => dispatch(standPlayer())}>Stand</button>
            <div>{`Bank: ${playerBank}`}</div>
        </div>
    );

    return (
        <div className={styles.gameContainer}>
            <div>{`On the table: ${betPool}`}</div>
            <div className={styles.cardsContainer}>
                <BlackjackDealer />
            </div>
            {gameStatus === BlackjackStatus.Betting ? (
                <BlackjackBetting
                    betAmount={betAmount}
                    setBetAmount={setBetAmount}
                />
            ) : (
                hitStandUI
            )}
            <div className={styles.cardsContainer}>
                <div>
                    <CardHand cards={playerHandDisplay} stacked />
                    {playerHandValue > 0 && (
                        <div>{`Your hand: ${playerHandValue}`}</div>
                    )}
                </div>
            </div>
        </div>
    );
};
