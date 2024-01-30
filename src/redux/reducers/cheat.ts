/* eslint-disable @typescript-eslint/no-explicit-any */
// yourReducer.js
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { formatNumberWithCommas } from '../../utils';
import { IBetMoneyItem } from '../../common/interface';

const cheatSlice = createSlice({
    name: 'cheat',
    initialState: {
        bowlTapCount: 0,
        isCheated: false,
    },
    reducers: {
        setIsCheated: (state, { payload }) => {
            state.isCheated = payload;
        }
    }
});

export const { setIsCheated } = cheatSlice.actions;
export const cheatSelector = (state: any) => state.cheat;

export const betMoneySelector = createSelector(
    cheatSelector,
    (cheat) => cheat.bowlTapCount
);

export const rolledSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.rolled
);
export const wonStreakSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.wonStreak
);

export const afterRollDicesSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.afterRollDices
);

export const bettedSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.betted
);

export const openSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.open
);

export const endcheatSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.endcheat
);

export const diffAmountSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.diffAmount
);
export const totalAmountReceivedSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.totalAmountReceived
);

export const diffAmountCalculateCompletedSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.diffAmountCalculateCompleted
);

export const resultSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.result
);
export const resultMsgSelector = createSelector(
    cheatSelector,
    (cheat) => cheat.resultMsg
);

export const totalBetMoneySelector = createSelector(
    cheatSelector,
    (cheat) => cheat.totalBetMoney
);
export default cheatSlice.reducer;
