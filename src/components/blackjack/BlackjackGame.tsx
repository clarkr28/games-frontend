import React from "react";
import { PlayingCardFC } from "../playing-card/PlayingCardFC";
import { CardValue, Suit } from "../../assets/CardResources";

export const BlackjackGame: React.FC<{}> = (props) => {
    return (
        <div>
            <PlayingCardFC card={{ suit: Suit.Club, value: CardValue.Ace }} />
            <PlayingCardFC card={{ suit: Suit.Spade, value: CardValue.Ace }} />
            <PlayingCardFC card={{ suit: Suit.Heart, value: CardValue.Ace }} />
            <PlayingCardFC
                card={{ suit: Suit.Diamond, value: CardValue.Ace }}
            />
        </div>
    );
};
