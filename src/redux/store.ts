
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cheatReducer from "./reducers/cheat";
import gameReducer from "./reducers/game";
import playerReducer from "./reducers/player";

const rootReducer = combineReducers({
    player: playerReducer,
    game: gameReducer,
    cheat: cheatReducer,
    // other reducers...
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;