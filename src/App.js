import { Route, Routes, BrowserRouter } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import React, { useState } from "react";


export const api = {
  endpoint: `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`
};
export const config = {
  endpoint: "http://localhost:3000",
};

function App() {
  const [fetchedCartItems, setFetchedCartItems] = useState([]);
  const totalItemsInCart = fetchedCartItems.reduce(
    (total, item) => total + item.qty,
    0
  );
  return (
    <div className="App">
    
      <BrowserRouter>
        <Routes>
        
          <Route exact path="/" element={<Products fetchedCartItems={fetchedCartItems} setFetchedCartItems={setFetchedCartItems}  totalItemsInCart={totalItemsInCart}/>} />
          <Route exact path="/cart" element={<Cart fetchedCartItems={fetchedCartItems} setFetchedCartItems={setFetchedCartItems}  totalItemsInCart={totalItemsInCart}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


