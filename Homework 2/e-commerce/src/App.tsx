import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import { Box, CircularProgress } from "@mui/material";
import Products from "./Products";
import { Product } from "./ProductCard/ProductCard";
import Cart from "./Cart";

function App() {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);

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

    const [isCartTab, setIsCartTab] = useState(false);

    useEffect(() => {
        setIsCartTab(window.location.search.includes("tab=cart"));
    }, [refresh]);

    return (
        <>
            <Header cart={cart} setRefresh={setRefresh} />
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
            ) : !isCartTab ? (
                <Products products={products} cart={cart} setCart={setCart} />
            ) : (
                <Cart cart={cart} setCart={setCart} />
            )}
        </>
    );
}

export default App;
