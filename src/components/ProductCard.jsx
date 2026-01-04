import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function ProductCard({ product, onOpenModal }) {
    const { addToCart } = useContext(ShopContext);

    // Check if out of stock - dummyjson doesn't always have 'stock' but we'll assume it does or random
    const isOutOfStock = product.stock === 0;

    return (
        <div className="product-card">
            <div className="product-image-wrapper" onClick={() => onOpenModal(product)}>
                <img src={product.thumbnail} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
                <h3 className="product-title" onClick={() => onOpenModal(product)}>{product.title}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-footer">
                    <span className="product-price">₹{product.price}</span>
                    <button
                        disabled={isOutOfStock}
                        onClick={() => addToCart(product)}
                        className="add-btn"
                    >
                        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
