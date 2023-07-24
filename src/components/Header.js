import { Button,Badge  } from "@mui/material";


import "./Header.css"; 
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";


import {  Link } from "react-router-dom";

const Header = ({ totalItemsInCart }) => {
  const navigate = useNavigate();

  const exploreevent = () => {
    navigate("/");
  };

  return (
    <Box className="header">
      <Box className="header-title">
        
        <div className="header-title-text">
          <span className="header-title-primary">TeeRex Store</span>
          
        </div>
      </Box>
      <Box>
      <Button
        className="explore-button"
        
        variant="text"
        onClick={exploreevent}
      >
       Product
      </Button>
      <Button
          variant="outlined"
          color="primary"
          startIcon={
            <Badge badgeContent={totalItemsInCart} color="error">
              <img
                src="cart1.png"
                alt="Cart"
                className="cart-button-icon"
              />
            </Badge>
          }
          component={Link}
          to="/cart"
        >
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
