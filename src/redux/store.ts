import { configureStore } from "@reduxjs/toolkit";
import userreducer from './Slice/userslice';

export const store = configureStore({
    reducer: {
        user: userreducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;