import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../features/productsSlice";
import { Favorite } from "@mui/icons-material";

interface ProductCardProps {
  product: Product;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onLike,
  onDelete,
  onClick,
}) => {
  return (
    <Card
      sx={{ maxWidth: 345, cursor: "pointer", m: 1 }}
      onClick={() => onClick(product.id)}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ width: "100%", objectFit: "contain" }}
      />
      <CardContent>
        <Box sx={{ height: 140, overflow: "hidden" }}>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: 60,
            }}
          >
            {product.title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </Typography>
        </Box>

        <Typography variant="body1" color="text.primary" mt={1}>
          {product.price} CAD
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        <IconButton
          disableRipple
          onClick={(e) => {
            e.stopPropagation();
            onLike(product.id);
          }}
          color={product.liked ? "warning" : "default"}
        >
          <Favorite sx={{ fontSize: "2rem" }} />
        </IconButton>

        <IconButton
          disableRipple
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product.id);
          }}
          color="primary"
        >
          <DeleteIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
