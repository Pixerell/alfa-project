import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product, APIProduct } from "./types";
import axios from "axios";

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<APIProduct[]>(
        "https://fakestoreapi.com/products"
      );
      return res.data.map((p) => ({ ...p, liked: false }));
    } catch (err) {
      let message = "Failed to fetch products";
      if (axios.isAxiosError(err) && err.message) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);
