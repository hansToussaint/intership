import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  liked?: boolean;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Fetch products from 'Fake Store API' or load from localStorage if available
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (): Promise<Product[]> => {
    const localProducts = localStorage.getItem("products");
    if (localProducts) {
      return JSON.parse(localProducts) as Product[];
    }

    //
    const response = await fetch("https://fakestoreapi.com/products");
    const data: Product[] = await response.json();

    localStorage.setItem("products", JSON.stringify(data));
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLikeProduct: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);

      if (product) {
        product.liked = !product.liked;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    createProduct: (state, action: PayloadAction<Product>) => {
      // Add to the beginning
      state.products.unshift(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error loading products";
      });
  },
});

export const { toggleLikeProduct, deleteProduct, createProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
