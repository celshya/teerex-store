
import TShirtFilter from "./Tshirtfilter";
import { useEffect, useState,useCallback } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Header from "./Header";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {api} from "../App"
import ProductCard from "./ProductCard";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./Products.css";
import {
    CircularProgress,
    Grid,
    InputAdornment,
    TextField,
    Button,
    Stack, useMediaQuery
  } from "@mui/material";

const Products =({ fetchedCartItems, setFetchedCartItems, totalItemsInCart }) =>{

    const [isLoading,setIsLoading]=useState(false);
    const [products,setProducts]=useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [timerId,setTimerId]=useState("");
   
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const isMobileScreen = useMediaQuery("(max-width: 767px)");
   

    const performAPICall = async () => {
        setIsLoading(true);
        try{
          let res=await axios.get(`${api.endpoint}`);
          setIsLoading(false);
          setProducts(res.data);
         
          return res.data;
        }catch(err){
          setIsLoading(false);

          enqueueSnackbar(`${err.response.statusText}, Invalid API call`, { variant: "error" });
        }
      };

      useEffect(()=>{
        (async()=>{
          let products=await performAPICall();
          setFilteredProducts(products)
        })();
        
      },[]);
      const addToCart = (productId, qty,items,products,product) => {
        
        const existingItem = fetchedCartItems.find(item => item.product.id === productId);
     
      
        if (existingItem) {
          const totalQty = existingItem.qty + qty;
          if (totalQty <= existingItem.product.quantity) {
            existingItem.qty = totalQty;
            setFetchedCartItems([...fetchedCartItems]);
          }
          else {
            enqueueSnackbar("The selected quantity exceeds the available quantity for this product.", { variant: "error" });
          }
        } else {
     
          const productToAdd = products.find((product) => product.id === productId);
          setFetchedCartItems([...fetchedCartItems, { product: productToAdd, qty }]);
          enqueueSnackbar("Item added to cart!", { variant: "success" });
        }
       
      
  
      };
      useEffect(() => {
        console.log("fetchedCartItems updated:", fetchedCartItems);
      }, [fetchedCartItems]);
    
      const handleFilterToggle = () => {
        setIsFilterVisible((prev) => !prev);
      };

  
  

  
 
      const debounceSearch = (value, debounceTimeout) => {
        clearTimeout(timerId);
        setTimerId(
          setTimeout(() => {
            performSearch(value);
          }, debounceTimeout)
        );
      };
      
      const performSearch = async (searchText) => {
        if (!searchText) {
          setFilteredProducts(products);
          return;
        }
    
        const searchResults = products.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        );
    
        setFilteredProducts(searchResults);
      };
 
 

      
      const handleFilterChange = useCallback((filterOptions) => {
   
        // Filter the products based on the selected filter options
        const filtered = products.filter((product) => {
      
          const { gender, colour, priceRange, type } = filterOptions;
         
          // Check if the product matches the selected filter options
          const isGenderMatched = gender.length === 0 || gender.includes(product.gender);
          
          const isColourMatched = colour.length === 0 || colour.includes(product.color);
          const isPriceRangeMatched =
            product.price >= priceRange[0] && product.price <= priceRange[1];
          const isTypeMatched = type.length === 0 || type.includes(product.type);
    
          return isGenderMatched && isColourMatched && isPriceRangeMatched && isTypeMatched;
        });
    
        // Update the filtered products state
        setFilteredProducts(filtered);
      }, [products]); 


    
           const childrenComponent = (
         
            <TextField
              className="search-desktop header-search"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
              placeholder="Search for items/categories"
              name="search"
              onChange={(e) => debounceSearch(e.target.value, 500)}  style={{ marginTop: '1rem', alignSelf: 'center' }}
            />
          );

          return (
            <div>
              <Header  totalItemsInCart={totalItemsInCart}></Header>
        
              <div className="search-container">
                <div className="centered-search">
                  {childrenComponent}
                  {isMobileScreen && (
            <FilterListIcon
              className="filter-icon"
              onClick={handleFilterToggle}
            />
          )}

         
                </div>
              </div>
        
              <div className="content-wrapper">
                {/* Add the TShirtFilter component in the left sidebar */}
                {!isMobileScreen || isFilterVisible ? (
          <div className={`left-sidebar ${isFilterVisible ? "show" : "hide"}`}>
            <TShirtFilter
              onFilterChange={handleFilterChange}
              filteredProducts={filteredProducts}
            />
          </div>
        ) : null}
        
                <div className="main-content">
                  <Grid container p={2} direction="row" justifyContent="center" rowSpacing={1} columnSpacing={1} className="productsGrid">
                    {isLoading ? (
                      <Stack sx={{ minHeight: 500 }} justifyContent="center">
                        <Button><CircularProgress sx={{ color: "#00a278" }} /></Button>
                        Loading Products...
                      </Stack>
                    ) :(!filteredProducts) || ( filteredProducts.length) === 0 ? (
                      <Stack sx={{ minHeight: 500 }} justifyContent="center">
                        <Button><SentimentDissatisfied style={{ color: "#808080" }} /></Button>
                        <p style={{ color: "#808080" }}>No products found</p>
                      </Stack>
                    ) : (
                      filteredProducts.map((productsInfo) => (
                        <Grid className="innerGrid" item p={2} xs={10} sm={6} md={4} lg={3} key={productsInfo.id}>
                        <ProductCard product={productsInfo} handleAddToCart={addToCart} items={fetchedCartItems} products={products} />

                        </Grid>
                      ))
                    )}
                  </Grid>
                </div>
              </div>
            </div>
          );
        };
export default Products;