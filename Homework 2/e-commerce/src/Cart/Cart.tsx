import { Product } from "../ProductCard/ProductCard";

interface CartProps {
    cart: Product[];
    setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function Cart({ cart, setCart }: CartProps) {
    return <>Cart2</>;
}
