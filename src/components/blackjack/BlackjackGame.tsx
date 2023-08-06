import React, { useEffect, useState } from "react";
import { IPlayingCardProps } from "../playing-card/PlayingCardFC";
import { CardHand } from "../playing-card/CardHand";
import { useDispatch, useSelector } from "react-redux";
import {
    BlackjackStatus,
    nextRound,
    selectBlackjackPlayerBank,
    selectBlackjackPlayerHand,
    selectBlackjackPlayerHandValue,
    selectBlackjackStatus,
} from "../../features/blackjackSlice";
import { BlackjackDealer } from "./BlackjackDealer";
import { BlackjackBetting } from "./BlackjackBetting";
import styles from "./Blackjack.module.css";
import { BlackjackChips } from "./BlackjackChips/BlackjackChips";
import { HitStand } from "./HitStand/HitStand";

export const BlackjackGame: React.FC<{}> = (props) => {
    const playerHand = useSelector(selectBlackjackPlayerHand);
    const playerBank = useSelector(selectBlackjackPlayerBank);
    const playerHandValue = useSelector(selectBlackjackPlayerHandValue);
    const gameStatus = useSelector(selectBlackjackStatus);
    const dispatch = useDispatch();
    const [betAmount, setBetAmount] = useState(25);

    const playerHandDisplay: IPlayingCardProps[] = [];
    playerHand.forEach((card) =>
        playerHandDisplay.push({ card: card, hidden: false })
    );

    useEffect(() => {
        if (gameStatus === BlackjackStatus.AwaitNextRound) {
            setTimeout(() => {
                dispatch(nextRound());
            }, 2000);
        }
    });

    return (
        <div className={styles.gameContainer}>
            <BlackjackChips betAmount={betAmount} gameStatus={gameStatus} />
            <div className={styles.cardsContainer}>
                <BlackjackDealer />
            </div>
            {gameStatus === BlackjackStatus.Betting ? (
                <BlackjackBetting
                    betAmount={betAmount}
                    setBetAmount={setBetAmount}
                />
            ) : (
                <HitStand
                    bank={playerBank}
                    enableButtons={gameStatus === BlackjackStatus.Hitting}
                />
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
