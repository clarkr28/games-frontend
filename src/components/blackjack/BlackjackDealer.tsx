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
import { PlayingCard } from "../../assets/CardResources";

export const BlackjackDealer: React.FC<{}> = (props) => {
    const gameStatus = useAppSelector(selectBlackjackStatus);
    const dealerHand = useAppSelector(selectBlackjackDealerHand);
    const dealerHandValue = useAppSelector(selectBlackjackDealerHandValue);
    const dispatch = useAppDispatch();

    const partiallyHidden =
        gameStatus === BlackjackStatus.Betting ||
        gameStatus === BlackjackStatus.Hitting;
    const cardProps: IPlayingCardProps[] = [];
    dealerHand.forEach((card: PlayingCard, index: number) =>
        cardProps.push({ card: card, hidden: partiallyHidden && index > 0 })
    );

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
            {!partiallyHidden && dealerHand.length > 0 && (
                <div>{`Dealer hand: ${dealerHandValue}`}</div>
            )}
        </>
    );
};
