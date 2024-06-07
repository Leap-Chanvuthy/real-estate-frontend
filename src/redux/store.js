import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './slice/authSlice'; 
import propertiesReducer from './slice/propertiesSlice'; 
import { combineReducers } from 'redux';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  properties: propertiesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer }); 

// Move exports to the end
export const persistor = persistStore(store);
