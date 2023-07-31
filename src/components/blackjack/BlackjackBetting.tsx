import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
    finalizeBet,
    selectBlackjackPlayerBank,
} from "../../features/blackjackSlice";
import { useDispatch } from "react-redux";
import { IncrementChange } from "../common/IncrementChange/IncrementChange";
import { ChipValue, numToChips } from "../../assets/ChipResources";
import { IconButton, IconButtonColor } from "../common/IconButton/IconButton";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { isContinueStatement } from "typescript";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface IBlackjackBetting {
    betAmount: number;
    setBetAmount: React.Dispatch<React.SetStateAction<number>>;
}

export const BlackjackBetting: React.FC<IBlackjackBetting> = (props) => {
    const { betAmount, setBetAmount } = props;

    const playerBank = useAppSelector(selectBlackjackPlayerBank);
    const dispatch = useDispatch();
    const [chips, setChips] = useState<ChipValue[]>([]);

    useEffect(() => {
        setChips(numToChips(betAmount));
    }, [betAmount]);

    const trySetBet = (delta: number) => {
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
    };

    return (
        <div>
            <IconButton
                displayText="Place Bet"
                clickCallback={() => dispatch(finalizeBet(betAmount))}
                color={IconButtonColor.Green}
                icon={solid("coins")}
            />
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
                    changeIncrement={25}
                    tryChangeValue={trySetBet}
                />
                <IncrementChange
                    changeIncrement={50}
                    tryChangeValue={trySetBet}
                />
            </div>
            <div>{`Bank: $${playerBank}`}</div>
        </div>
    );
};
