/* eslint-disable @typescript-eslint/no-explicit-any */
// yourReducer.js
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../common/interface';

// const fetchUserById = createAsyncThunk(
//     'users/fetchById',
//     async (userId: number, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
//   )
const userString = localStorage.getItem('currentUser')
const userListString = localStorage.getItem('userList')
const user: IUser | any = userString ? JSON.parse(userString) : null
const userList = userListString ? JSON.parse(userListString) : []
const playerSlicer = createSlice({
    name: 'player',
    initialState: {
        user,
        userList
    },
    reducers: {
        // Action to set the player's name
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserName: (state, action) => {
            state.user.name = action.payload;
        },
        login: (state, { payload }) => {
            const { username, password } = payload;
            const user = state.userList.find((user: IUser) => user.username === username && user.password === password);
            state.user = user;
        },
        logout: (state) => {
            state.user = null;
        },
        addUserToList: (state, action) => {
            const newUser = action.payload;
            state.userList.push(newUser);
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
            const { diffAmount } = payload;
            state.user.coin += diffAmount
            const updatedUser = { ...state.user };
            const updatedList = state.userList.map((user: IUser) => {
                if (user.username === updatedUser.username) {
                    return { ...user, ...updatedUser };
                }
                return user;
            });
            state.userList = updatedList;
        },
    },
});
export const playerSelector = (state: any) => state.player;
export const currentUserSelector = createSelector(
    playerSelector,
    (player) => player.user
);
export const coinSelector = createSelector(
    playerSelector,
    (player) => player.user?.coin
);
export const userListSelector = createSelector(
    playerSelector,
    (player) => player.userList
);
export const { setUser, setUserName, addCoins, subtractCoins, updateCoinAfterRoll, addUserToList, login, logout } = playerSlicer.actions;
export default playerSlicer.reducer;

