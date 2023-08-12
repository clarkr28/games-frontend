import { configureStore } from "@reduxjs/toolkit";
import connectFourSlice from "../features/connectFourSlice";
import blackjackSlice from "../features/blackjackSlice";
import lifeSlice from "../features/lifeSlice";
import avilaSlice from "../features/avilaSlice";


export const store = configureStore({
    reducer: {
        connectFour: connectFourSlice, // this is the reducer, not the slice
        blackjack: blackjackSlice,
        life: lifeSlice,
        avila: avilaSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;