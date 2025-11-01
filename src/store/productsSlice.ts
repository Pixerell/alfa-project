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
    setProduct(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );
    },
    toggleLike(state, action: PayloadAction<number>) {
      state.items = state.items.map((p) =>
        p.id === action.payload ? { ...p, liked: !p.liked } : p
      );
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

export const { toggleLike, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
