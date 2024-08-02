import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './slice/authSlice'; 
import propertiesReducer from './slice/propertiesSlice';
import propertyTypesReducer from './slice/propertyTypesSlice';
import agentsReducer from './slice/agentsSlice';
import favouritesReducer from './slice/favouritesSlice';
import companiesSliceReducer from './slice/companiesSlice';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'favourites'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  properties: propertiesReducer,
  propertyTypes: propertyTypesReducer,
  agents: agentsReducer,
  favourites: favouritesReducer,
  companies: companiesSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer }); 

export const persistor = persistStore(store);
