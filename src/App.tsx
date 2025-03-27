import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import PageNotFound from "./pages/PageNotFound";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { fetchProducts } from "./features/productsSlice";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/Theme";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  // Dispatch fetchProducts on app load, so the store is populated even on Home page.
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/create-product" element={<CreateProduct />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
