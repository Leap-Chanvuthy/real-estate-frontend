import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice"; // Adjust import name if necessary

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;
