import React, { useCallback, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
    finalizeBet,
    selectBlackjackPlayerBank,
} from "../../features/blackjackSlice";
import { useDispatch } from "react-redux";
import { IncrementChange } from "../common/IncrementChange";

export interface IBlackjackBetting {
    betAmount: number;
    setBetAmount: React.Dispatch<React.SetStateAction<number>>;
}

export const BlackjackBetting: React.FC<IBlackjackBetting> = (props) => {
    const { betAmount, setBetAmount } = props;

    const playerBank = useAppSelector(selectBlackjackPlayerBank);
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
            <div style={{ display: "flex", justifyContent: "center" }}>
                <IncrementChange
                    changeIncrement={1}
                    tryChangeValue={trySetBet}
                />
                <IncrementChange
                    changeIncrement={5}
                    tryChangeValue={trySetBet}
                />
                <IncrementChange
                    changeIncrement={10}
                    tryChangeValue={trySetBet}
                />
            </div>
            <div>{`Bank: ${playerBank}`}</div>
        </div>
    );
};
