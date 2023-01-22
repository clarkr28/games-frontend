import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Deck, PlayingCard, createRandomDeck, drawCard, scoreBlackjackHand } from "../assets/CardResources";
import { RootState } from "../app/store";

export enum BlackjackStatus {
    Betting,
    Hitting,
    DealerPlaying,
    FinalScoring,
}

interface BlackjackState {
    gameStatus: BlackjackStatus;
    deck: Deck;
    playerHand: PlayingCard[];
    playerHandValue: number;
    dealerHand: PlayingCard[];
    dealerHandValue: number;
    playerBank: number;
    betPool: number; // the bet amount sitting in the middle of the table
}

const initialState: BlackjackState = {
    gameStatus: BlackjackStatus.Betting,
    deck: createRandomDeck(),
    playerHand: [],
    playerHandValue: 0,
    dealerHand: [],
    dealerHandValue: 0,
    playerBank: 500,
    betPool: 0,
}

export const blackjackSlice = createSlice({
    name: 'blackjack',
    initialState,
    reducers: {
        hitPlayer: (state) => {
            if (state.gameStatus !== BlackjackStatus.Hitting) { return; }
            state.playerHand.push(drawCard(state.deck));
            state.playerHandValue = scoreBlackjackHand(state.playerHand);
            if (state.playerHandValue >= 21) {
                state.gameStatus = BlackjackStatus.DealerPlaying;
            }
        },
        standPlayer: (state) => {
            if (state.gameStatus === BlackjackStatus.Hitting) {
                state.gameStatus = BlackjackStatus.DealerPlaying;
            }
        },
        hitDealer: (state) => {
            if (state.gameStatus !== BlackjackStatus.DealerPlaying) {return;}
            state.dealerHand.push(drawCard(state.deck));
            state.dealerHandValue = scoreBlackjackHand(state.dealerHand);
            if (state.dealerHandValue >= 17) {
                state.gameStatus = BlackjackStatus.FinalScoring;
            }
        },
        standDealer: (state) => {
            if (state.gameStatus === BlackjackStatus.DealerPlaying) {
                state.gameStatus = BlackjackStatus.FinalScoring;
            }
        },
        finalizeBet: (state, action: PayloadAction<number>) => {
            if (state.gameStatus === BlackjackStatus.Betting && action.payload > 0 && action.payload <= state.playerBank) {
                state.playerBank -= action.payload;
                state.betPool = action.payload;

                // give the dealer two cards
                state.dealerHand.push(drawCard(state.deck));
                state.dealerHand.push(drawCard(state.deck));
                state.dealerHandValue = scoreBlackjackHand(state.dealerHand);
                
                // give the player two cards
                state.playerHand.push(drawCard(state.deck));
                state.playerHand.push(drawCard(state.deck));
                state.playerHandValue = scoreBlackjackHand(state.playerHand);

                state.gameStatus = BlackjackStatus.Hitting;
            }
        },
        finalScoringAndReset: (state) => {
            if (state.playerHandValue === 21 && state.playerHand.length === 2) {
                // Blackjack!
                state.playerBank += Math.ceil(state.betPool * 2.5);
            }
            else if (state.dealerHandValue > 21 && state.playerHandValue <= 21) {
                // dealer busted and player didn't
                state.playerBank += state.betPool + state.betPool;
            }
            else if (state.playerHandValue > state.dealerHandValue && state.playerHandValue <= 21) {
                // player bet the dealer without busting
                state.playerBank += state.betPool + state.betPool;
            }
            else if (state.playerHandValue === state.dealerHandValue && state.playerHandValue <= 21) {
                // player and dealer tied without busting
                state.playerBank += state.betPool;
            }

            // reset state for the next round
            state.betPool = 0;
            state.dealerHand = [];
            state.dealerHandValue = 0;
            state.playerHand = [];
            state.playerHandValue = 0;
            state.gameStatus = BlackjackStatus.Betting;
        }
    }
});

export const {hitPlayer, standPlayer, hitDealer, standDealer, finalizeBet, finalScoringAndReset} = blackjackSlice.actions;

export const selectBlackjackStatus = (state: RootState) => state.blackjack.gameStatus;
export const selectBlackjackDealerHand = (state: RootState) => state.blackjack.dealerHand;
export const selectBlackjackDealerHandValue = (state: RootState) => state.blackjack.dealerHandValue;
export const selectBlackjackPlayerHand = (state: RootState) => state.blackjack.playerHand;
export const selectBlackjackPlayerHandValue = (state: RootState) => state.blackjack.playerHandValue;
export const selectBlackjackPlayerBank = (state: RootState) => state.blackjack.playerBank;
export const selectBlackjackBetPool = (state: RootState) => state.blackjack.betPool;

export default blackjackSlice.reducer;