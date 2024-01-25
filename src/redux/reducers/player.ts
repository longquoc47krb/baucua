/* eslint-disable @typescript-eslint/no-explicit-any */
// yourReducer.js
import { createSelector, createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('currentUser')) ?? {
    name: "Anonymous",
    coin: 1000000
}
const playerSlicer = createSlice({
    name: 'player',
    initialState: {
        user
    },
    reducers: {
        // Action to set the player's name
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserName: (state, action) => {
            state.user.name = action.payload;
        },

        // Action to add coins to the player's balance
        addCoins: (state, action) => {
            state.user.coin += action.payload;
        },

        // Action to subtract coins from the player's balance
        subtractCoins: (state, action) => {
            state.user.coin -= action.payload;
        },
        updateCoinAfterRoll: (state, { payload }) => {
            const { bonus } = payload;
            state.user.coin += bonus
        }
    },
});
export const playerSelector = (state: any) => state.player;
export const coinSelector = createSelector(
    playerSelector,
    (player) => player.user.coin
);
export const { setUserName, addCoins, subtractCoins, updateCoinAfterRoll } = playerSlicer.actions;
export default playerSlicer.reducer;
