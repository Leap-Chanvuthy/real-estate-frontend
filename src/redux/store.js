import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Renamed to persistedReducer

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);
