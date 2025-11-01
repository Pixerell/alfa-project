import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product, APIProduct } from "./types";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchAll",
  async () => {
    const res = await axios.get<APIProduct[]>(
      "https://fakestoreapi.com/products"
    );
    return res.data.map((p) => ({ ...p, liked: false }));
  }
);
