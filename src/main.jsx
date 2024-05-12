import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store , persistor} from './redux/store.js';
import App from './App.jsx'
import "./index.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </BrowserRouter>
)
