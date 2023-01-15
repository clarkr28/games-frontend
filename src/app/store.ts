import { configureStore } from "@reduxjs/toolkit";
import connectFourSlice from "../features/connect-four/connectFourSlice";


export const store = configureStore({
    reducer: {
        connectFour: connectFourSlice, // this is the reducer, not the slice
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;