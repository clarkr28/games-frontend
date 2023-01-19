import React from "react";
import {
    IPlayingCardProps,
    PlayingCardFC,
} from "../playing-card/PlayingCardFC";
import { CardValue, createPlayingCard, Suit } from "../../assets/CardResources";
import { CardHand } from "../playing-card/CardHand";
import { useDispatch, useSelector } from "react-redux";
import {
    hitPlayer,
    selectBlackjackPlayerHand,
} from "../../features/blackjackSlice";

export const BlackjackGame: React.FC<{}> = (props) => {
    const playerHand = useSelector(selectBlackjackPlayerHand);
    const dispatch = useDispatch();

    const playerHandDisplay: IPlayingCardProps[] = [];
    playerHand.forEach((card) =>
        playerHandDisplay.push({ card: card, hidden: false })
    );

    return (
        <>
            <div>
                <CardHand cards={playerHandDisplay} stacked />
            </div>
            <div>
                <button onClick={() => dispatch(hitPlayer())}>Hit</button>
            </div>
        </>
    );
};
