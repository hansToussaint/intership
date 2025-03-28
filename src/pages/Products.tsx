import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Container, Fab, Tooltip, Typography } from "@mui/material";
import { fetchProducts } from "../features/productsSlice";
import ProductList from "../components/ProductList";
import { useNavigate, useSearchParams } from "react-router";
import { Add } from "@mui/icons-material";
import Header from "../components/Header";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const scroll = searchParams.get("scroll");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Restore the scroll position
  useEffect(() => {
    if (scroll) {
      window.scrollTo(0, parseInt(scroll, 10));
    }
  }, [scroll]);

  return (
    <Container sx={{ mt: 12, mb: 4 }}>
      <Header />
      <Typography variant="h1" gutterBottom>
        Our Products
      </Typography>

      <ProductList />

      <Tooltip title="Create Product" arrow>
        <Fab
          color="primary"
          disableRipple
          sx={{ position: "fixed", bottom: 24, right: 24 }}
          onClick={() => navigate("/create-product")}
        >
          <Add />
        </Fab>
      </Tooltip>
    </Container>
  );
};

export default Products;
