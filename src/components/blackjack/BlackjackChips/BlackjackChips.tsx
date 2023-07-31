import React, { useEffect, useState } from "react";
import { ChipStack } from "../../common/ChipStack/ChipStack";
import { useSelector } from "react-redux";
import {
    BlackjackStatus,
    selectBlackjackBetPool,
} from "../../../features/blackjackSlice";
import { ChipValue, numToChips } from "../../../assets/ChipResources";
import styles from "./BlackjackChips.module.scss";

export interface IBlackjackChipsProps {
    betAmount: number;
    gameStatus: BlackjackStatus;
}

export const BlackjackChips: React.FC<IBlackjackChipsProps> = (props) => {
    const { betAmount, gameStatus } = props;

    const isBetting = gameStatus === BlackjackStatus.Betting;

    /* betAmount = value used when player is setting their bet
     * betPool = amount that was actually bet */
    const betPool = useSelector(selectBlackjackBetPool);
    const [chips, setChips] = useState<ChipValue[]>([]);

    useEffect(() => {
        setChips(numToChips(isBetting ? betAmount : betPool));
    }, [isBetting, betAmount, betPool]);

    return (
        <div
            className={`${styles.container} ${isBetting ? styles.betting : ""}`}
        >
            <div
                className={`${styles.spaceFiller} ${
                    isBetting ? styles.fill : ""
                }`}
            />
            <div className={styles.content}>
                <div>{`$${isBetting ? betAmount : betPool}`}</div>
                <ChipStack chips={chips} />
            </div>
        </div>
    );
};
