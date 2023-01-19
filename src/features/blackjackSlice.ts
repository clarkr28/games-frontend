import { createSlice } from "@reduxjs/toolkit";
import { Deck, PlayingCard, createOrderedDeck, drawCard } from "../assets/CardResources";
import { RootState } from "../app/store";

interface BlackjackState {
    deck: Deck;
    playerHand: PlayingCard[];
    dealerHand: PlayingCard[];
    playerBank: number;
    betAmount: number;
}

const initialState: BlackjackState = {
    deck: createOrderedDeck(),
    playerHand: [],
    dealerHand: [],
    playerBank: 500,
    betAmount: 0,
}

export const blackjackSlice = createSlice({
    name: 'blackjack',
    initialState,
    reducers: {
        hitPlayer: (state) => {
            const card = drawCard(state.deck);
            if (card) {
                state.playerHand.push(card);
            }
        }
    }
});

export const {hitPlayer} = blackjackSlice.actions;

export const selectBlackjackPlayerHand = (state: RootState) => state.blackjack.playerHand;

export default blackjackSlice.reducer;