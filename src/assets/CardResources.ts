export enum Suit {
    Spade,
    Club,
    Diamond,
    Heart
}

export enum CardValue {
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
}

export interface PlayingCard {
    suit: Suit;
    value: CardValue;
}

export function suitToUnicode(suit: Suit, solid = true): string {
    switch (suit) {
        case Suit.Spade:
            return solid ? "\u2660" : "\u2664";
        case Suit.Club:
            return solid ? "\u2663" : "\u2667";
        case Suit.Heart:
            return solid ? "\u2665" : "\u2661";
        case Suit.Diamond:
            return solid ? "\u2666" : "\u2662";
    }
    return "";
}

export function cardValueToString(value: CardValue): string {
    switch (value) {
        case CardValue.Two:
            return "2";
        case CardValue.Three:
            return "3";
        case CardValue.Four:
            return "4";
        case CardValue.Five:
            return "5";
        case CardValue.Six:
            return "6";
        case CardValue.Seven:
            return "7";
        case CardValue.Eight:
            return "8";
        case CardValue.Nine:
            return "9";
        case CardValue.Ten:
            return "10";
        case CardValue.Jack:
            return "J";
        case CardValue.Queen:
            return "Q";
        case CardValue.King:
            return "K";
        case CardValue.Ace:
            return "A";
    }
    return "";
}
