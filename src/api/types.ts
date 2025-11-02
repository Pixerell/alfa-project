// src/types.ts
export type APIProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type Product = APIProduct & {
  liked?: boolean;
};

export type ProductsState = {
  items: Product[];
  loading: boolean;
  error?: string | null;
};

export type SortOption = "off" | "asc" | "desc";
