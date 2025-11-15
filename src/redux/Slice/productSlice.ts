import { Product, ProductsState } from "@/src/types/components/home";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchProducts = createAsyncThunk (
  "products/fetchProducts" , async (_,{rejectWithValue}) => {
    try {
      const response =await fetch ("https://fakestoreapi.com/products");
      if(!response.ok) throw new Error("failed to fetch data");
      const data : Product[] = await response.json()
      return data;
    } catch (error :any) {
       return rejectWithValue(error.message)
    }
  }
)

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice ({
  name: "products",
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder.addCase(fetchProducts.pending,(state) =>{
      state.loading = true
      state.error = null
    })
    .addCase(fetchProducts.rejected,(state,action) => {
      state.loading=false
      state.error = action.payload as string
    })
    .addCase(fetchProducts.fulfilled,(state,action)=>{
      state.loading=false
      state.products=action.payload
    })
  } 
})

export default productsSlice.reducer;