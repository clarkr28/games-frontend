import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Deck, PlayingCard, createRandomDeck, drawCard, getBlackjackWinnings, scoreBlackjackHand } from "../assets/CardResources";
import { RootState } from "../app/store";

export enum BlackjackStatus {
    Betting,
    Hitting,
    DealerPlaying,
    AwaitNextRound,
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
                state.betPool = getBlackjackWinnings(state.playerHandValue, state.playerHand.length, state.dealerHandValue, state.betPool);
                state.gameStatus = BlackjackStatus.AwaitNextRound;
            }
        },
        standDealer: (state) => {
            if (state.gameStatus === BlackjackStatus.DealerPlaying) {
                state.betPool = getBlackjackWinnings(state.playerHandValue, state.playerHand.length, state.dealerHandValue, state.betPool);
                state.gameStatus = BlackjackStatus.AwaitNextRound;
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
        nextRound: (state) => {
            // the bet pool has already been adjusted to show how much money the player should be given
            state.playerBank += state.betPool;

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

export const {hitPlayer, standPlayer, hitDealer, standDealer, finalizeBet, nextRound} = blackjackSlice.actions;

export const selectBlackjackStatus = (state: RootState) => state.blackjack.gameStatus;
export const selectBlackjackDealerHand = (state: RootState) => state.blackjack.dealerHand;
export const selectBlackjackDealerHandValue = (state: RootState) => state.blackjack.dealerHandValue;
export const selectBlackjackPlayerHand = (state: RootState) => state.blackjack.playerHand;
export const selectBlackjackPlayerHandValue = (state: RootState) => state.blackjack.playerHandValue;
export const selectBlackjackPlayerBank = (state: RootState) => state.blackjack.playerBank;
export const selectBlackjackBetPool = (state: RootState) => state.blackjack.betPool;

export default blackjackSlice.reducer;