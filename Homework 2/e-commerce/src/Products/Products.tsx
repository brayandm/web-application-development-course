import ProductCard, { Product } from "../ProductCard/ProductCard";

interface ProductsProps {
    products: Product[];
}

export default function Products({ products }: ProductsProps) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "20px",
                gap: "20px",
                justifyContent: "center",
            }}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
