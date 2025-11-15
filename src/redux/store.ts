import { configureStore } from "@reduxjs/toolkit";
import userreducer from './Slice/userslice';
import productsReducer from './Slice/productSlice'

export const store = configureStore({
    reducer: {
        user: userreducer,
        products:productsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;