import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Paper,
  InputBase,
} from "@mui/material";
import { Favorite, Search } from "@mui/icons-material";
import { RootState } from "../store";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import theme from "../styles/Theme";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isHome = location.pathname === "/";

  // Get liked products count from Redux state
  const likedCount = useSelector(
    (state: RootState) =>
      state.products.products.filter((product) => product.liked).length
  );

  // Pre-fill the search bar with the "search" query parameter if available
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Update the URL when the search input changes, preserving other query params
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    searchParams.set("search", term);
    setSearchParams(searchParams);
  };

  // When clicking the liked icon, navigate to /products with the "filter=liked" parameter.
  const handleLikedClick = () => {
    // Set the filter parameter
    searchParams.set("filter", "liked");
    // If not on /products, navigate there.
    if (!location.pathname.startsWith("/products")) {
      navigate(`/products?${searchParams.toString()}`);
    } else {
      setSearchParams(searchParams);
    }
  };

  return (
    <AppBar
      // position="fixed"
      sx={{
        boxShadow: 0,
        zIndex: 1100,
        // background: "none",
        backgroundColor: isHome ? "transparent" : "",
        height: 70,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          maxWidth: "lg",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Typography
          variant="h2"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", mr: 1 }}
        >
          My Shopping List
        </Typography>

        {/* If on /products, display the search bar; otherwise, add a spacer */}
        {location.pathname.startsWith("/products") ? (
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <Paper
              component="form"
              sx={{
                p: "4px 8px",
                display: "flex",
                alignItems: "center",
                borderRadius: "20px",
                backgroundColor: "rgba(255,255,255,0.15)",
                maxWidth: 500,
                margin: "0 auto",
              }}
              elevation={0}
            >
              <Search sx={{ color: "white", mr: 1 }} />
              <InputBase
                placeholder="Search…"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  flex: 1,
                  color: "white",
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </Paper>
          </Box>
        ) : (
          // Add a spacer if no search bar is present
          <Box sx={{ flexGrow: 1 }} />
        )}

        <IconButton disableRipple color="inherit" onClick={handleLikedClick}>
          <Badge
            badgeContent={likedCount}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.common.black,
                fontSize: "1.2rem",
              },
            }}
          >
            <Favorite sx={{ fontSize: "2.2rem" }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
