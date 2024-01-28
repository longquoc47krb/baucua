/* eslint-disable @typescript-eslint/no-explicit-any */
// yourReducer.js
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { formatNumberWithCommas } from '../../utils';
import { IBetMoneyItem } from '../../common/interface';
const gameHistoryString = localStorage.getItem('gameHistory');
const gameHistory = gameHistoryString ? JSON.parse(gameHistoryString) : []
export const betMoney = [ // mang luu so tien nguoi dat
    { name: 'bau', coin: 0, betLevel: 10000 },
    { name: 'cua', coin: 0, betLevel: 10000 },
    { name: 'tom', coin: 0, betLevel: 10000 },
    { name: 'ca', coin: 0, betLevel: 10000 },
    { name: 'ga', coin: 0, betLevel: 10000 },
    { name: 'nai', coin: 0, betLevel: 10000 },
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
        // Add diffAmount or result properties as needed
        diffAmount: 0,
        diffAmountCalculateCompleted: false,
        totalAmountReceived: 0,
        result: [{ name: "", status: "" }],
        resultMsg: 'No win yet',
        totalBetMoney: 0,
        gameHistory,
        wonStreak: {
            streak: 0,
            coin: 0
        }
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
        updateBetLevel: (state, { payload }) => {
            const { name, betLevel } = payload;
            const betIndex = state.betMoney.findIndex(item => item.name === name);
            if (betIndex !== -1) {
                state.betMoney[betIndex].betLevel = betLevel;
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
            const updatedBetMoney = state.betMoney.map((item: IBetMoneyItem) => ({
                ...item,
                coin: 0
            }))
            state.betMoney = updatedBetMoney;
            state.rolled = false;
            state.afterRollDices = afterRollDices;
            state.endGame = false;
            state.diffAmountCalculateCompleted = false;
            state.result = [{ name: "", status: "" }]
        },
        // Action to compare and calculate diffAmount
        compareAndCalculateDiffAmount: (state) => {
            const { betMoney, afterRollDices } = state;
            const totalBetMoney = betMoney.reduce((sum, bet) => sum + bet.coin, 0);
            // Logic to compare results and calculate diffAmount
            let totalBonus = 0;
            let totalPenalty = 0;
            for (let i = 0; i < betMoney.length; i++) {
                const bet = betMoney[i];
                const result = afterRollDices[i];

                if (result.quantity > 0 && bet.coin > 0) {
                    // Adjust your diffAmount calculation logic based on your requirements
                    const diffAmount = result.quantity * bet.coin;
                    totalBonus += diffAmount;
                }
                if (result.quantity == 0 && bet.coin > 0) {
                    const penalty = bet.coin;
                    totalPenalty += penalty;
                }
            }
            const diffAmount = totalBonus - totalPenalty;
            const totalAmoutReceived = totalBetMoney + diffAmount;
            // Update state with the calculated diffAmount and result
            state.diffAmount = diffAmount;
            state.totalAmountReceived = totalAmoutReceived
            if (diffAmount > 0) {
                state.resultMsg = `Chúc mừng! Bạn thắng +${formatNumberWithCommas(diffAmount)} coins!`;
            } else if (diffAmount < 0) {
                state.resultMsg = `Uiii! Bạn thua <strong>${formatNumberWithCommas(totalAmoutReceived - totalBetMoney)}</strong> coins!`;
            } else if (diffAmount === 0) {
                state.resultMsg = `Bạn hoà!`;
            }
            state.diffAmountCalculateCompleted = true;

        },
        calculateTotalBetMoney: (state) => {
            const { betMoney } = state;
            const totalBetMoney = betMoney.reduce((sum, bet) => sum + bet.coin, 0);
            state.totalBetMoney = totalBetMoney;
        },
        saveGameHistory: (state, { payload }) => {
            state.gameHistory = payload;
            localStorage.setItem('gameHistory', JSON.stringify(payload));
        },
        updateWonStreak: (state, { payload }) => {
            state.wonStreak = payload;
        }

    },
});

export const { updateBetMoney, updateAfterRollDices, setRolled, setBetted, resetAll, updateSpecificBetMoneyCoin, increaseBetMoneyCoin, decreaseBetMoneyCoin, compareAndCalculateDiffAmount, setOpen, calculateTotalBetMoney, setEndGame, saveGameHistory, updateBetLevel, updateWonStreak } = gameSlice.actions;
export const gameSelector = (state: any) => state.game;

export const betMoneySelector = createSelector(
    gameSelector,
    (game) => game.betMoney
);

export const rolledSelector = createSelector(
    gameSelector,
    (game) => game.rolled
);
export const wonStreakSelector = createSelector(
    gameSelector,
    (game) => game.wonStreak
);
export const gameHistorySelector = createSelector(
    gameSelector,
    (game) => game.gameHistory
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

export const diffAmountSelector = createSelector(
    gameSelector,
    (game) => game.diffAmount
);
export const totalAmountReceivedSelector = createSelector(
    gameSelector,
    (game) => game.totalAmountReceived
);

export const diffAmountCalculateCompletedSelector = createSelector(
    gameSelector,
    (game) => game.diffAmountCalculateCompleted
);

export const resultSelector = createSelector(
    gameSelector,
    (game) => game.result
);
export const resultMsgSelector = createSelector(
    gameSelector,
    (game) => game.resultMsg
);

export const totalBetMoneySelector = createSelector(
    gameSelector,
    (game) => game.totalBetMoney
);
export default gameSlice.reducer;
