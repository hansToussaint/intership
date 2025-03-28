import React, { ChangeEvent, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createProduct, Product } from "../features/productsSlice";
import { useNavigate } from "react-router";
import Header from "../components/Header";

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string>("");

  // preview the selected image
  const [imagePreview, setImagePreview] = useState<string>("");

  // Handle file input change for image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !price || !description || !image) {
      alert("Please fill the required fieldss");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      description,
      category,
      image,
      rating: { rate: 0, count: 0 },
      liked: false,
    };

    dispatch(createProduct(newProduct));

    navigate("/products?page=1");
  };

  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <Header />

      <Typography variant="h1" mb={5}>
        Create New Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required={false}
        />

        {/* File input for image */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            disableRipple
            variant="contained"
            component="label"
            sx={{
              fontSize: "1.3rem",
            }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{ width: "100%", maxWidth: 300, mt: 1 }}
            />
          )}
        </Paper>

        <Button
          disableRipple
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            fontSize: "1.3rem",
            width: "fit-content",
          }}
        >
          Create Product
        </Button>
      </Box>
    </Container>
  );
};

export default CreateProduct;
