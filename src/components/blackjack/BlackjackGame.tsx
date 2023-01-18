import React from "react";
import {
    IPlayingCardProps,
    PlayingCardFC,
} from "../playing-card/PlayingCardFC";
import { CardValue, MakePlayingCard, Suit } from "../../assets/CardResources";
import { CardHand } from "../playing-card/CardHand";

export const BlackjackGame: React.FC<{}> = (props) => {
    const cardsA: IPlayingCardProps[] = [
        { card: MakePlayingCard(Suit.Club, CardValue.Eight) },
        { card: MakePlayingCard(Suit.Heart, CardValue.Eight) },
        { card: MakePlayingCard(Suit.Spade, CardValue.Jack) },
    ];

    const cardsB: IPlayingCardProps[] = [
        { card: MakePlayingCard(Suit.Club, CardValue.Ace) },
        { card: MakePlayingCard(Suit.Heart, CardValue.Two) },
        { card: MakePlayingCard(Suit.Spade, CardValue.Three) },
        { card: MakePlayingCard(Suit.Spade, CardValue.Four) },
        { card: MakePlayingCard(Suit.Spade, CardValue.Five) },
    ];

    return (
        <>
            <div>
                <PlayingCardFC
                    card={{ suit: Suit.Club, value: CardValue.Ace }}
                />
                <PlayingCardFC
                    card={{ suit: Suit.Spade, value: CardValue.Ace }}
                />
                <PlayingCardFC
                    card={{ suit: Suit.Heart, value: CardValue.Ace }}
                />
                <PlayingCardFC
                    card={{ suit: Suit.Diamond, value: CardValue.Ace }}
                />
            </div>
            <CardHand cards={cardsA} stacked />
            <CardHand cards={cardsB} stacked />
        </>
    );
};
