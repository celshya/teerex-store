import React from "react";
import Header from "./Header";
import { useSnackbar } from "notistack";
import {Button} from "@mui/material"
import "./Cart.css";
const Cart = ({ fetchedCartItems, setFetchedCartItems, totalItemsInCart}) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const calculateTotalPrice = (cartItem) => {
    
    return cartItem.qty * cartItem.product.price;
  };
  const handleRemoveItem = (productId) => {
    const updatedCartItems = fetchedCartItems.filter(
      (item) => item.product.id !== productId
    );
    setFetchedCartItems(updatedCartItems);
  };
  const handleIncreaseQuantity = (productId) => {
    const productToAdd = fetchedCartItems.find((item) => item.product.id === productId);
    const stockQuantity = productToAdd.product.quantity;
  
    if (productToAdd.qty >= stockQuantity) {
      // Quantity exceeds stock quantity, show an error snackbar
      const message = `Quantity exceeds available stock (${stockQuantity}) for this product.`;
      enqueueSnackbar(message, { variant: "error" });
      return;
    }
  
    const updatedCartItems = fetchedCartItems.map((item) => {
      if (item.product.id === productId) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setFetchedCartItems(updatedCartItems);
  };
  const overallTotal = fetchedCartItems.reduce(
    (total, item) => total + calculateTotalPrice(item),
    0
  );
  
  const handleDecreaseQuantity = (productId) => {
    const updatedCartItems = fetchedCartItems.map((item) => {
      if (item.product.id === productId) {
        const updatedQty = Math.max(item.qty - 1, 0); // Ensure quantity doesn't go below 0
        if (updatedQty === 0) {
          // Quantity becomes 0, show a snackbar and remove the item
          const message = `The item "${item.product.name}" has been removed from the cart.`;
          enqueueSnackbar(message, { variant: "warning" });
          return null; // Return null to remove the item from the cart
        }
        return { ...item, qty: updatedQty };
      }
      return item;
    });
  
    // Remove null values from the updated cart items (i.e., remove the items with quantity 0)
    const updatedCartItemsWithoutNull = updatedCartItems.filter((item) => item !== null);
    setFetchedCartItems(updatedCartItemsWithoutNull);
  };
  
  
  

  return (
    <div>
        <Header  totalItemsInCart={totalItemsInCart}></Header>
    <h1>Cart Page</h1>
    <div className="cart-container">
    {fetchedCartItems.length === 0 ? (
          // If cart is empty, display the message
          <p className="empty-cart-message">Your cart is empty.</p>
        ) :
      (fetchedCartItems.map((item) => (
        <div key={item.product.id} className="cart-item">
          <div className="mini-image">
            <img src={item.product.imageURL} alt={item.product.name} />
          </div>
          <div className="cart-details">
            <h2>{item.product.name}</h2>
            <p>Price: ${item.product.price}</p>
            <div className="quantity">
              <button onClick={() => handleDecreaseQuantity(item.product.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => handleIncreaseQuantity(item.product.id)}>+</button>
            </div>
            <p>Total: ${calculateTotalPrice(item)}</p>
            <Button variant="contained" onClick={() => handleRemoveItem(item.product.id)}>Remove</Button>
          </div>
        </div>
      )))}
     
    </div>
    <div className="overall-total">
        <h2>Overall Total: ${overallTotal}</h2>
      </div>
  </div>
  );
};

export default Cart;
