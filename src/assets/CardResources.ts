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

export function createPlayingCard(suit: Suit, value: CardValue): PlayingCard {
    return {suit: suit, value: value};
}

export interface Deck {
    cards: PlayingCard[];
}

/** returns a deck of cards in suit and value order */
export function createOrderedDeck(): Deck {
    const cards: PlayingCard[] = [];
    const allSuits = [Suit.Spade, Suit.Club, Suit.Diamond, Suit.Heart];
    const allCardVals = [CardValue.Two, CardValue.Three, CardValue.Four, CardValue.Five, CardValue.Six, CardValue.Seven, CardValue.Eight, CardValue.Nine, CardValue.Ten, CardValue.Jack, CardValue.Queen, CardValue.King, CardValue.Ace];
    allSuits.forEach(suit => 
        allCardVals.forEach(val => cards.push(createPlayingCard(suit, val)))
    );

    return {cards: cards};
}

/** shuffles the passed deck of cards */
export function randomizeDeck(deck: Deck): void {
    for (let i = deck.cards.length; i >= 0; i--) {
        const randIndex = Math.floor(Math.random() * i);
        const temp = deck.cards[randIndex];
        deck.cards[randIndex] = deck.cards[i];
        deck.cards[i] = temp;
    }
}

/** returns a single deck that has been shuffled */
export function createRandomDeck(): Deck {
    const deck = createOrderedDeck();
    randomizeDeck(deck);
    return deck;
}

/** returns a card from the deck. Refills the deck if it's empty */
export function drawCard(deck: Deck): PlayingCard {
    const card = deck.cards.pop();
    if (card) {
        return card;
    }
    // deck is empty. Refill it and return a card
    const newDeck = createRandomDeck();
    deck.cards = newDeck.cards;
    return deck.cards.pop()!;
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

export function cardValueToInt(value: CardValue): number {
    switch (value) {
        case CardValue.Two:
            return 2;
        case CardValue.Three:
            return 3;
        case CardValue.Four:
            return 4;
        case CardValue.Five:
            return 5;
        case CardValue.Six:
            return 6;
        case CardValue.Seven:
            return 7;
        case CardValue.Eight:
            return 8;
        case CardValue.Nine:
            return 9;
        case CardValue.Ten:
        case CardValue.Jack:
        case CardValue.Queen:
        case CardValue.King:
            return 10;
        case CardValue.Ace:
            return 11; // remember that aces can be either 11 or 1 in blackjack
    }
    return 0;
}

export function scoreBlackjackHand(cards: PlayingCard[]): number {
    let highAces = 0, total = 0;

    cards.forEach(card => {
        total += cardValueToInt(card.value);
        if (card.value === CardValue.Ace) {
            highAces++;
        }
        while (total > 21 && highAces > 0) {
            total -= 10;
            highAces--;
        }
    });

    return total;
}
