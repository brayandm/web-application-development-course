import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { Product } from "../ProductCard/ProductCard";

interface HeaderProps {
    cart: { product: Product; quantity: number }[];
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ cart, setRefresh }: HeaderProps) {
    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "64px",
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        onClick={() => {
                            const url = new URL(window.location.href);
                            url.searchParams.delete("tab");
                            window.history.pushState({}, "", url.toString());
                            setRefresh((prev) => !prev);
                        }}
                    >
                        <p
                            style={{
                                cursor: "pointer",
                                userSelect: "none",
                                width: "120px",
                            }}
                        >
                            E-Commerce
                        </p>
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            window.history.pushState(
                                { tab: "cart" },
                                "cart",
                                "?tab=cart"
                            );
                            setRefresh((prev) => !prev);
                        }}
                    >
                        <Badge
                            badgeContent={cart.reduce(
                                (total, item) => total + item.quantity,
                                0
                            )}
                            color="secondary"
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
}
