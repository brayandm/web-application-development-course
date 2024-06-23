import React from "react";
import {
    Box,
    Typography,
    IconButton,
    Divider,
    List,
    ListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../ProductCard/ProductCard";

interface CartProps {
    cart: { product: Product; quantity: number }[];
    setCart: React.Dispatch<
        React.SetStateAction<{ product: Product; quantity: number }[]>
    >;
}

export default function Cart({ cart, setCart }: CartProps) {
    const handleRemoveFromCart = (id: number) => {
        let localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");

        localStorageCart = localStorageCart.filter(
            (item: { product: Product; quantity: number }) =>
                item.product.id !== id
        );

        localStorage.setItem("cart", JSON.stringify(localStorageCart));

        setCart(localStorageCart);
    };

    const calculateTotal = () => {
        return cart
            .reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
            )
            .toFixed(2);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Shopping Cart
            </Typography>
            <List>
                {cart.map(({ product, quantity }) => (
                    <ListItem
                        key={product.id}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{
                                width: 60,
                                height: 60,
                                objectFit: "contain",
                                marginRight: 16,
                            }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6">
                                {product.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                            >
                                {product.description}
                            </Typography>
                            <Typography variant="body1">
                                ${product.price.toFixed(2)} x {quantity} = $
                                {(product.price * quantity).toFixed(2)}
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={() => handleRemoveFromCart(product.id)}
                            color="secondary"
                        >
                            <CloseIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ textAlign: "right" }}>
                Total: ${calculateTotal()}
            </Typography>
        </Box>
    );
}
