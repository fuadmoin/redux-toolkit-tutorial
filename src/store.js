import { configureStore } from "@reduxjs/toolkit";
import cartRducer from './features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartRducer,
    },
});