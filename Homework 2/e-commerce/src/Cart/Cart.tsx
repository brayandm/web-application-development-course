import React, { useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    Divider,
    List,
    ListItem,
    Button,
    Modal,
    Fade,
    Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Product } from "../ProductCard/ProductCard";

interface CartProps {
    cart: { product: Product; quantity: number }[];
    setCart: React.Dispatch<
        React.SetStateAction<{ product: Product; quantity: number }[]>
    >;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

export default function Cart({ cart, setCart, setRefresh }: CartProps) {
    const [checkoutOpen, setCheckoutOpen] = useState(false);

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

    const handleBackClick = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete("tab");
        window.history.pushState({}, "", url.toString());
        setRefresh((prev) => !prev);
    };

    const handleCheckoutOpen = () => {
        setCheckoutOpen(true);
    };

    const handleCheckoutClose = () => {
        setCheckoutOpen(false);
        localStorage.setItem("cart", "[]");
        setCart([]);
        const url = new URL(window.location.href);
        url.searchParams.delete("tab");
        window.history.pushState({}, "", url.toString());
        setRefresh((prev) => !prev);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBackClick}
                sx={{ mb: 2 }}
            >
                Back
            </Button>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Shopping Cart
            </Typography>
            <List>
                {cart.map(({ product, quantity }) => (
                    <ListItem
                        key={product.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "80%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: 16,
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                width={60}
                                height={60}
                                style={{
                                    marginRight: 16,
                                }}
                            />
                        </div>
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
            <Button
                variant="contained"
                color="primary"
                onClick={handleCheckoutOpen}
                sx={{ mt: 2, float: "right" }}
            >
                Checkout
            </Button>

            <Modal
                aria-labelledby="checkout-modal-title"
                aria-describedby="checkout-modal-description"
                open={checkoutOpen}
                onClose={handleCheckoutClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={checkoutOpen}>
                    <Box sx={modalStyle}>
                        <Typography id="checkout-modal-title" variant="h6">
                            Checkout
                        </Typography>
                        <Typography
                            id="checkout-modal-description"
                            sx={{ mt: 2 }}
                        >
                            Your checkout is done! <br />
                            The items will be shipped to you soon.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCheckoutClose}
                            sx={{ mt: 2 }}
                        >
                            Close
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
