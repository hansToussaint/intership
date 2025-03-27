import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid2,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate, useParams, useLocation } from "react-router";
import Header from "../components/Header";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Attempt to retrieve navigation state passed from the previous page (page, search, filter, scroll)
  const navState = location.state as {
    page?: number;
    search?: string;
    filter?: string;
    scroll?: number;
  } | null;

  // Find the product in the Redux store by its ID
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  // Back button function: if navState is available, reconstruct the URL with query parameters to return to the previous state
  const handleBack = () => {
    if (navState && Object.keys(navState).length > 0) {
      const queryParams = new URLSearchParams();
      if (navState.search) queryParams.set("search", navState.search);
      if (navState.filter) queryParams.set("filter", navState.filter);
      if (navState.page) queryParams.set("page", navState.page.toString());
      if (navState.scroll)
        queryParams.set("scroll", navState.scroll.toString());
      navigate(`/products?${queryParams.toString()}`);
    } else {
      // If no state data is passed (direct access), simply go back in history
      navigate(-1);
    }
  };

  if (!product) {
    return <Typography>Product Not Found.</Typography>;
  }

  return (
    <Container sx={{ mt: 12 }}>
      <Header />

      {/* Back button to return to the products list */}
      <Button
        disableRipple
        onClick={handleBack}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid2 container spacing={4}>
          {/* Product image section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: "100%",
                height: { xs: 250, md: 400 },
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Grid2>

          {/* Product details section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h1" gutterBottom>
              {product.title}
            </Typography>

            <Typography variant="h3" color="primary" gutterBottom>
              {product.price} CAD
            </Typography>

            <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
              {product.description}
            </Typography>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
