import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import theme from "../styles/Theme";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${import.meta.env.BASE_URL}/image.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: isImageLoaded ? "none" : "blur(10px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transition: "filter 1s ease-in-out",
        }}
      />
      <Header />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Welcome to my Shop
        </Typography>

        <Typography
          variant="h1"
          sx={{ mb: 4, color: theme.palette.secondary.main }}
        >
          Discover our exclusive products
        </Typography>

        <Button
          disableRipple
          variant="contained"
          color="primary"
          onClick={() => navigate("/products")}
          sx={{ fontSize: "1.4rem" }}
        >
          View products
        </Button>
      </Container>
      <img
        src={`${import.meta.env.BASE_URL}/image.jpg`}
        alt="Shop Background"
        loading="lazy"
        onLoad={handleImageLoad}
        style={{
          display: "none",
        }}
      />
    </Box>
  );
};

export default Home;
