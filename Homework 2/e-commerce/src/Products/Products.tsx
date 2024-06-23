import { Product } from "../ProductCard/ProductCard";

interface ProductsProps {
    products: Product[];
}

export default function Products({ products }: ProductsProps) {
    console.log(products);
    return <></>;
}
