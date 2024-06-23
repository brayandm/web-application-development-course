import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

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
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3 }}>
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
            <CardActions disableSpacing sx={{ justifyContent: "center" }}>
                <IconButton aria-label="add to cart" color="primary">
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
