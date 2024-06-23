import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { Product } from "../ProductCard/ProductCard";

interface HeaderProps {
    cart: Product[];
    setCartTab: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ cart, setCartTab }: HeaderProps) {
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
                        sx={{ flexGrow: 1, cursor: "pointer" }}
                        onClick={() => {
                            setCartTab(false);
                        }}
                    >
                        E-Commerce
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            setCartTab(true);
                        }}
                    >
                        <Badge badgeContent={cart.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
}
