
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import gameReducer from "./reducers/game";
import playerReducer from "./reducers/player";
import cheatReducer from "./reducers/cheat";

const rootReducer = combineReducers({
    player: playerReducer,
    game: gameReducer,
    cheat: cheatReducer,
    // other reducers...
});

const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;