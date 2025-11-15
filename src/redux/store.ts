import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice/cartSlice";
import productsReducer from './Slice/productSlice';
import userreducer from './Slice/userslice';

export const store = configureStore({
    reducer: {
        user: userreducer,
        products:productsReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;