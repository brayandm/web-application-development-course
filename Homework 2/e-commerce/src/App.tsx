import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import { Box, CircularProgress } from "@mui/material";
import Products from "./Products";
import { Product } from "./ProductCard/ProductCard";
import Cart from "./Cart";

function App() {
    const [products, setProducts] = useState([]);
    const [cartTab, setCartTab] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
        []
    );

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    }, []);

    return (
        <>
            <Header cart={cart} setCartTab={setCartTab} />
            {products.length == 0 ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "calc(100vh - 64px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : !cartTab ? (
                <Products products={products} cart={cart} setCart={setCart} />
            ) : (
                <Cart cart={cart} setCart={setCart} />
            )}
        </>
    );
}

export default App;
