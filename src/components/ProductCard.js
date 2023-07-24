
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,Grid
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';

const ProductCard = ({product, handleAddToCart,items,products}) => {
  const addToCart = () => {
    
    handleAddToCart(product.id,1,items,products,product); // Assuming the quantity is fixed at 1 for now
  };
  return (
    
    <Card className="card" sx={{maxWidth:330}}>
     <CardMedia
      aria-label="stars"
        component="img"
        image={product.imageURL}
        alt={product.name}
        id={product.id}
       
      />
      <CardContent className="cardContent">
        <Typography gutterBottom>{product.name}</Typography>
        <Typography gutterBottom variant="p" component="p" sx={{fontWeight:"600",fontSize:"5"}}>
          ${product.price}
        </Typography>
       
        </CardContent>
        <CardActions>
        <Button  fullWidth size="small" variant="contained" onClick={addToCart} ><AddShoppingCartSharpIcon/>ADD TO CART</Button>
        </CardActions>
    </Card>
    
  );
};

export default ProductCard;
