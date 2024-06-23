import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import { Box, CircularProgress } from "@mui/material";
import Products from "./Products";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Header />
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
            ) : (
                <Products products={products} />
            )}
        </>
    );
}

export default App;
