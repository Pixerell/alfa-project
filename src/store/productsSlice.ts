import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../api/types";

import type { ProductsState } from "../api/types";
import { fetchProducts } from "../api/fetchProducts";

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      const index = state.items.findIndex((p) => p.id === action.payload);
      if (index !== -1) state.items.splice(index, 1);
    },
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) product.liked = !product.liked;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state: ProductsState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state: ProductsState, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state: ProductsState, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { toggleLike, deleteProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
