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
import { useNavigate, useParams, useSearchParams } from "react-router";
import Header from "../components/Header";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract query parameters for state restoration
  const page = searchParams.get("page") || "1";
  const scroll = searchParams.get("scroll") || "0";
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "all";

  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === Number(id))
  );

  // Navigate back while preserving query parameters
  const handleBack = () => {
    navigate(
      `/products?search=${encodeURIComponent(
        search
      )}&filter=${filter}&page=${page}&scroll=${scroll}`
    );
  };

  if (!product) {
    return <Typography>Product Not Found.</Typography>;
  }

  return (
    <Container sx={{ mt: 12 }}>
      <Header />

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
          {/* Section image */}
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
