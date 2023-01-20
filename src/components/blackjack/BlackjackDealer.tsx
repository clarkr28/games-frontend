import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    BlackjackStatus,
    hitDealer,
    selectBlackjackDealerHand,
    selectBlackjackDealerHandValue,
    selectBlackjackStatus,
    standDealer,
} from "../../features/blackjackSlice";
import { CardHand } from "../playing-card/CardHand";
import { IPlayingCardProps } from "../playing-card/PlayingCardFC";

export const BlackjackDealer: React.FC<{}> = (props) => {
    const gameStatus = useAppSelector(selectBlackjackStatus);
    const dealerHand = useAppSelector(selectBlackjackDealerHand);
    const dealerHandValue = useAppSelector(selectBlackjackDealerHandValue);
    const dispatch = useAppDispatch();

    const cardProps: IPlayingCardProps[] = [];
    dealerHand.forEach((card) => cardProps.push({ card: card, hidden: false }));

    useEffect(() => {
        if (gameStatus === BlackjackStatus.DealerPlaying) {
            if (dealerHandValue < 17) {
                setTimeout(() => {
                    dispatch(hitDealer());
                }, 750);
            } else {
                setTimeout(() => {
                    dispatch(standDealer());
                }, 750);
            }
        }
    }, [gameStatus, dealerHand.length]);

    return (
        <>
            <CardHand cards={cardProps} stacked />
            {dealerHand.length > 0 && (
                <div>{`Dealer hand: ${dealerHandValue}`}</div>
            )}
        </>
    );
};
