import ProductCard, { Product } from "../ProductCard/ProductCard";

interface ProductsProps {
    products: Product[];
    cart: { product: Product; quantity: number }[];
    setCart: React.Dispatch<
        React.SetStateAction<{ product: Product; quantity: number }[]>
    >;
}

export default function Products({ products, cart, setCart }: ProductsProps) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                margin: "20px",
                gap: "20px",
                justifyContent: "center",
            }}
        >
            {products.map((product) => (
                <ProductCard
                    cart={cart}
                    setCart={setCart}
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}
