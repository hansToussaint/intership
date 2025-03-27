import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Pagination,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Grid2,
  styled,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { RootState, AppDispatch } from "../store";
import {
  toggleLikeProduct,
  deleteProduct,
  Product,
} from "../features/productsSlice";

const PRODUCTS_PER_PAGE = 8;

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,

    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialFilter = (searchParams.get("filter") as "liked" | null) || "all";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const products = useSelector((state: RootState) => state.products.products);

  // local states
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filter, setFilter] = useState<"all" | "liked">(initialFilter);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setSearchTerm(initialSearch);
    setFilter(initialFilter);
  }, [initialSearch, initialFilter]);

  // Filter & search
  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (filter === "liked") {
      filtered = filtered.filter((p: Product) => p.liked);
    }
    if (searchTerm) {
      filtered = filtered.filter((p: Product) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [products, filter, searchTerm]);

  const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  // actions
  const handleLike = (id: number) => {
    dispatch(toggleLikeProduct(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleCardClick = (id: number) => {
    // navigate(`/products/${id}`);
    // navigate(`/products/${id}?page=${page}&scroll=${window.scrollY}`);

    // keep the search results also
    navigate(
      `/products/${id}?page=${page}&scroll=${
        window.scrollY
      }&search=${encodeURIComponent(searchTerm)}&filter=${filter}`
    );
  };

  const handleFilterChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: "all" | "liked" | null
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      setPage(1);
      navigate(
        `/products?search=${encodeURIComponent(searchTerm)}&filter=${newFilter}`
      );
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    // Append the page query parameter along with search and filter
    navigate(
      `/products?search=${encodeURIComponent(
        searchTerm
      )}&filter=${filter}&page=${value}`
    );
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="filter products"
        >
          <CustomToggleButton
            disableRipple
            value="all"
            aria-label="all products"
          >
            All
          </CustomToggleButton>
          <CustomToggleButton
            disableRipple
            value="liked"
            aria-label="liked products"
          >
            Liked
          </CustomToggleButton>
        </ToggleButtonGroup>
      </Box>

      {filteredProducts.length === 0 ? (
        <Typography variant="body1">
          No product found. Try another query
        </Typography>
      ) : (
        <>
          <Grid2 container spacing={2}>
            {paginatedProducts.map((product: Product) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <ProductCard
                  product={product}
                  onLike={handleLike}
                  onDelete={handleDelete}
                  onClick={handleCardClick}
                />
              </Grid2>
            ))}
          </Grid2>
          {pageCount > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                fontSize: "1.2rem",
              }}
            >
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: "1.2rem",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductList;
