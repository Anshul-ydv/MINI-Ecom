import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

export default function ProductList() {
    const { products, loading, addToCart } = useContext(ShopContext);
    const [selectedProduct, setSelectedProduct] = useState(null);

    if (loading) return <div className="loading">Loading products...</div>;

    return (
        <main className="container">
            {products.length === 0 ? (
                <div className="no-products">No products found.</div>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onOpenModal={setSelectedProduct}
                        />
                    ))}
                </div>
            )}

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    addToCart={addToCart}
                />
            )}
        </main>
    );
}
