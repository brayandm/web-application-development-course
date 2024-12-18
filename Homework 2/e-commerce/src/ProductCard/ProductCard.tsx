import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Badge, Tooltip } from "@mui/material";

export interface Product {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
    rating: { rate: number; count: number };
}

interface ProductCardProps {
    product: Product;
    cart: { product: Product; quantity: number }[];
    setCart: React.Dispatch<
        React.SetStateAction<{ product: Product; quantity: number }[]>
    >;
}

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    p: 4,
};

export default function ProductCard({ product, setCart }: ProductCardProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddToCartClick = (event: React.MouseEvent) => {
        event.stopPropagation();

        const storageCart = localStorage.getItem("cart") || "[]";

        const cart = JSON.parse(storageCart);

        const productIndex = cart.findIndex(
            ({
                product: cartProduct,
            }: {
                product: Product;
                quantity: number;
            }) => cartProduct.id === product.id
        );

        if (productIndex === -1) {
            cart.push({ product, quantity: 1 });
        } else {
            cart[productIndex].quantity++;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        setCart(cart);
    };

    const handleRemoveFromCartClick = (event: React.MouseEvent) => {
        event.stopPropagation();

        const storageCart = localStorage.getItem("cart") || "[]";

        const cart = JSON.parse(storageCart);

        const productIndex = cart.findIndex(
            ({
                product: cartProduct,
            }: {
                product: Product;
                quantity: number;
            }) => cartProduct.id === product.id
        );

        if (cart[productIndex].quantity === 1) {
            cart.splice(productIndex, 1);
        } else {
            cart[productIndex].quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        setCart(cart);
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const productIndex = cart.findIndex(
        ({ product: cartProduct }: { product: Product; quantity: number }) =>
            cartProduct.id === product.id
    );

    const quantity = productIndex === -1 ? 0 : cart[productIndex].quantity;

    return (
        <>
            <Card
                onClick={handleOpen}
                sx={{
                    maxWidth: 345,
                    margin: "auto",
                    boxShadow: 3,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                        transform: "scale(1.05) translateY(-10px)",
                        boxShadow: 6,
                        cursor: "pointer",
                    },
                }}
            >
                <CardHeader
                    title={
                        <Typography
                            variant="h6"
                            sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                textOverflow: "ellipsis",
                                minHeight: "60px",
                            }}
                        >
                            {product.title}
                        </Typography>
                    }
                    subheader={product.category}
                    sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={product.image}
                    alt={product.title}
                    sx={{
                        padding: "10px",
                        objectFit: "contain",
                        backgroundColor: "#e0e0e0",
                    }}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 5,
                            textOverflow: "ellipsis",
                            minHeight: "100px",
                        }}
                    >
                        {product.description}
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                    >
                        <Typography variant="h6" color="text.primary">
                            ${product.price.toFixed(2)}
                        </Typography>
                        <Rating
                            name="read-only"
                            value={product.rating.rate}
                            readOnly
                            precision={0.1}
                        />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        {product.rating.count} reviews
                    </Typography>
                </CardContent>
                <Divider variant="middle" />
                <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
                    {quantity > 0 ? (
                        <Tooltip title="Remove from cart" placement="top">
                            <IconButton
                                aria-label="remove from cart"
                                color="error"
                                onClick={handleRemoveFromCartClick}
                            >
                                <RemoveShoppingCartIcon />
                            </IconButton>
                        </Tooltip>
                    ) : null}
                    <Tooltip title="Add to cart" placement="top">
                        <IconButton
                            aria-label="add to cart"
                            color="primary"
                            onClick={handleAddToCartClick}
                        >
                            <Badge badgeContent={quantity} color="success">
                                <AddShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <Modal
                aria-labelledby="product-modal-title"
                aria-describedby="product-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography
                                id="product-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                {product.title}
                            </Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <CardMedia
                            component="img"
                            height="194"
                            image={product.image}
                            alt={product.title}
                            sx={{
                                objectFit: "contain",
                                backgroundColor: "#e0e0e0",
                                marginTop: "10px",
                            }}
                        />
                        <Typography
                            id="product-modal-description"
                            sx={{ mt: 2 }}
                        >
                            {product.description}
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            sx={{ mt: 2 }}
                        >
                            ${product.price.toFixed(2)}
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mt={2}
                        >
                            <Rating
                                name="read-only"
                                value={product.rating.rate}
                                readOnly
                                precision={0.1}
                            />
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {product.rating.count} reviews
                            </Typography>
                        </Box>
                        <CardActions
                            disableSpacing
                            sx={{ justifyContent: "flex-end" }}
                        >
                            {quantity > 0 ? (
                                <Tooltip
                                    title="Remove from cart"
                                    placement="top"
                                >
                                    <IconButton
                                        aria-label="remove from cart"
                                        color="error"
                                        onClick={handleRemoveFromCartClick}
                                    >
                                        <RemoveShoppingCartIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                            <Tooltip title="Add to cart" placement="top">
                                <IconButton
                                    aria-label="add to cart"
                                    color="primary"
                                    onClick={handleAddToCartClick}
                                >
                                    <Badge
                                        badgeContent={quantity}
                                        color="success"
                                    >
                                        <AddShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
