/* eslint-disable @typescript-eslint/no-explicit-any */
// yourReducer.js
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { formatNumberWithCommas } from '../../utils';
export const betMoney = [ // mang luu so tien nguoi dat
    { name: 'bau', coin: 0 },
    { name: 'cua', coin: 0 },
    { name: 'tom', coin: 0 },
    { name: 'ca', coin: 0 },
    { name: 'ga', coin: 0 },
    { name: 'nai', coin: 0 },
];
export const afterRollDices = [ // lưu số lượng xúc sắc quay ra
    { name: 'bau', quantity: 0 },
    { name: 'cua', quantity: 0 },
    { name: 'tom', quantity: 0 },
    { name: 'ca', quantity: 0 },
    { name: 'ga', quantity: 0 },
    { name: 'nai', quantity: 0 }
];

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        betMoney,
        rolled: false,
        afterRollDices,
        betted: false,
        open: false,
        endGame: false,
        // Add bonus or result properties as needed
        bonus: 0,
        bonusCalculateCompleted: false,
        totalAmountReceived: 0,
        result: 'No win yet',
        totalBetMoney: 0,
    },
    reducers: {
        // Action to update the bet money for a specific item
        updateBetMoney: (state, { payload }) => {
            const { name, coin } = payload;
            const betIndex = state.betMoney.findIndex(item => item.name === name);

            if (betIndex !== -1) {
                state.betMoney[betIndex].coin = coin;
            }
        },
        updateSpecificBetMoneyCoin: (state, action) => {
            const { name, coin } = action.payload;
            const index = state.betMoney.findIndex((item) => item.name === name);

            if (index !== -1) {
                state.betMoney[index].coin = coin;
            }
        },
        increaseBetMoneyCoin: (state, action) => {
            const { name, amount } = action.payload;
            const index = state.betMoney.findIndex((item) => item.name === name);

            if (index !== -1) {
                state.betMoney[index].coin += amount;
            }
        },

        // Action to decrease coin for a specific item in betMoney
        decreaseBetMoneyCoin: (state, action) => {
            const { name, amount } = action.payload;
            const index = state.betMoney.findIndex((item) => item.name === name);

            if (index !== -1 && state.betMoney[index].coin >= amount) {
                state.betMoney[index].coin -= amount;
            }
        },
        setRolled: (state, { payload }) => {
            state.rolled = payload;
        },
        setBetted: (state, { payload }) => {
            state.betted = payload;
        },
        setOpen: (state, { payload }) => {
            state.open = payload;
        },
        setEndGame: (state, { payload }) => {
            state.endGame = payload;
        },
        // Action to update the results after rolling dices for a specific item
        updateAfterRollDices: (state, action) => {
            const { name, quantity } = action.payload;
            const resultIndex = state.afterRollDices.findIndex(item => item.name === name);

            if (resultIndex !== -1) {
                state.afterRollDices[resultIndex].quantity = quantity;
            }
        },
        resetAll: (state) => {
            state.betMoney = betMoney;
            state.rolled = false;
            state.afterRollDices = afterRollDices;
            state.endGame = false;
            state.bonusCalculateCompleted = false;
        },
        // Action to compare and calculate bonus
        compareAndCalculateBonus: (state) => {
            const { betMoney, afterRollDices } = state;
            const totalBetMoney = betMoney.reduce((sum, bet) => sum + bet.coin, 0);
            // Logic to compare results and calculate bonus
            let totalBonus = 0;
            let totalPenalty = 0;
            for (let i = 0; i < betMoney.length; i++) {
                const bet = betMoney[i];
                const result = afterRollDices[i];

                if (result.quantity > 0 && bet.coin > 0) {
                    // Adjust your bonus calculation logic based on your requirements
                    const bonus = result.quantity * bet.coin;
                    totalBonus += bonus;
                }
                if (result.quantity == 0 && bet.coin > 0) {
                    const penalty = bet.coin;
                    totalPenalty += penalty;
                }
            }
            const bonus = totalBonus - totalPenalty;
            const totalAmoutReceived = totalBetMoney + bonus;
            // Update state with the calculated bonus and result
            state.bonus = bonus;
            state.totalAmountReceived = totalAmoutReceived
            if (bonus > 0) {
                state.result = `Chúc mừng! Bạn thắng +${formatNumberWithCommas(bonus)} coins!`;
            } else if (bonus < 0) {
                state.result = `Uiii! Bạn thua <strong>${formatNumberWithCommas(totalBetMoney)}</strong> coins!`;
            } else if (bonus === 0) {
                state.result = `Bạn hoà!`;
            }
            state.bonusCalculateCompleted = true;

        },
        calculateTotalBetMoney: (state) => {
            const { betMoney } = state;
            const totalBetMoney = betMoney.reduce((sum, bet) => sum + bet.coin, 0);
            state.totalBetMoney = totalBetMoney;
        }

    },
});

export const { updateBetMoney, updateAfterRollDices, setRolled, setBetted, resetAll, updateSpecificBetMoneyCoin, increaseBetMoneyCoin, decreaseBetMoneyCoin, compareAndCalculateBonus, setOpen, calculateTotalBetMoney, setEndGame } = gameSlice.actions;
export const gameSelector = (state: any) => state.game;

export const betMoneySelector = createSelector(
    gameSelector,
    (game) => game.betMoney
);

export const rolledSelector = createSelector(
    gameSelector,
    (game) => game.rolled
);

export const afterRollDicesSelector = createSelector(
    gameSelector,
    (game) => game.afterRollDices
);

export const bettedSelector = createSelector(
    gameSelector,
    (game) => game.betted
);

export const openSelector = createSelector(
    gameSelector,
    (game) => game.open
);

export const endGameSelector = createSelector(
    gameSelector,
    (game) => game.endGame
);

export const bonusSelector = createSelector(
    gameSelector,
    (game) => game.bonus
);
export const totalAmountReceivedSelector = createSelector(
    gameSelector,
    (game) => game.totalAmountReceived
);

export const bonusCalculateCompletedSelector = createSelector(
    gameSelector,
    (game) => game.bonusCalculateCompleted
);

export const resultSelector = createSelector(
    gameSelector,
    (game) => game.result
);

export const totalBetMoneySelector = createSelector(
    gameSelector,
    (game) => game.totalBetMoney
);
export default gameSlice.reducer;
