import React, { useCallback, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
    finalizeBet,
    selectBlackjackPlayerBank,
} from "../../features/blackjackSlice";
import { useDispatch } from "react-redux";

export const BlackjackBetting: React.FC<{}> = (props) => {
    const playerBank = useAppSelector(selectBlackjackPlayerBank);
    const [betAmount, setBetAmount] = useState(25);
    const dispatch = useDispatch();

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
        <div>
            <div>{`Bet Amount: ${betAmount}`}</div>
            <button onClick={() => dispatch(finalizeBet(betAmount))}>
                Place Bet
            </button>
            <button onClick={() => trySetBet(1)}>+1</button>
            <button onClick={() => trySetBet(-1)}>-1</button>
            <button onClick={() => trySetBet(10)}>+10</button>
            <button onClick={() => trySetBet(-10)}>-10</button>
            <div>{`Bank: ${playerBank}`}</div>
        </div>
    );
};
