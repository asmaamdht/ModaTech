import { CartState, ICart } from "@/src/types/components/cart";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const baseUrl = "https://fakestoreapi.com/";

const initialState: CartState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
}

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState() as RootState;
        // const userId = state.user.id;
        // if (!userId) return rejectWithValue("user not logged in");
        const products = state.products.products;
        if (products.length === 0) return rejectWithValue("Products must be loaded before cart");

        const res = await axios.get(`${baseUrl}carts/1`);
        const cartData = res.data; 

        // const cartData = res.data.find((c: any) => c.userId === userId);
        // if (!cartData) return rejectWithValue("No cart found for this user");

        const mappedCart: ICart[] = cartData.products.map((p: { productId: number; quantity: number }) => {
            const product = products.find(prod => prod.id === p.productId);
            if (!product) return null;
            return { ...product, quantity: p.quantity, type: "order" } as ICart;
        }).filter(Boolean) as ICart[];

        return mappedCart;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart(state) {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchCart.fulfilled, (state, action: PayloadAction<ICart[]>) => {
            state.loading = false;
            state.cartItems = action.payload;
            // const totals = calculateTotals(action.payload);
            // state.totalQuantity = totals.totalQuantity;
            // state.totalPrice = totals.totalPrice;
        }).addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }

});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;