import { CartState, ICart } from "@/src/types/components/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

// total quantity and price
const calculateTotals = (cartItems: ICart[]) => {
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + ((item.quantity || 0) * (item.price || 0)), 0);
    return { totalQuantity, totalPrice };
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState() as RootState;
        const userId = state.user.id;
        if (!userId) return rejectWithValue("user not logged in");

        const saved = await AsyncStorage.getItem(`cart_${userId}`);
        if (saved) return JSON.parse(saved) as ICart[];

        const products = state.products.products;
        if (products.length === 0) return rejectWithValue("Products must be loaded before cart");

        const res = await axios.get(`${baseUrl}carts`);
        const cartData = res.data.find((c: any) => c.userId === userId);
        if (!cartData) return rejectWithValue("No cart found for this user");

        const mappedCart: ICart[] = cartData.products.map((p: { productId: number; quantity: number }) => {
            const product = products.find(prod => prod.id === p.productId);
            if (!product) return null;
            return { ...product, quantity: p.quantity } as ICart;
        }).filter(Boolean) as ICart[];

        return mappedCart;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

export const saveCart = createAsyncThunk<void, void, { state: RootState }>(
  'cart/saveCart',
  async (_, { getState }) => {
    const state = getState();
    const userId = state.user.id;
    if (!userId) return;
    try {
      await AsyncStorage.setItem(`cart_${userId}`, JSON.stringify(state.cart.cartItems));
    } catch (err) {
      console.error("Failed to save cart", err);
    }
  }
);


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart(state) {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        },
        addToCart(state, action: PayloadAction<ICart>) {
            const existingItem = state.cartItems.find(i => i.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 0) + (action.payload.quantity || 1);
            } else {
                state.cartItems.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
            }

            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },
        updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
            const item = state.cartItems.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                const totals = calculateTotals(state.cartItems);
                state.totalQuantity = totals.totalQuantity;
                state.totalPrice = totals.totalPrice;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchCart.fulfilled, (state, action: PayloadAction<ICart[]>) => {
            state.loading = false;
            state.cartItems = action.payload;
            const totals = calculateTotals(action.payload);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        }).addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }

});

export const { clearCart, addToCart, removeFromCart , updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;