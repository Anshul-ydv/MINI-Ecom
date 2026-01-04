import React from 'react';

export default function ProductModal({ product, onClose, addToCart }) {
    if (!product) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                <div className="modal-body">
                    <img src={product.thumbnail} alt={product.title} className="modal-image" />
                    <div className="modal-details">
                        <h2>{product.title}</h2>
                        <p className="modal-category">{product.category}</p>
                        <p className="modal-description">{product.description}</p>
                        <p className="modal-price">Price: ₹{product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <button
                            className="add-btn"
                            onClick={() => {
                                addToCart(product);
                                onClose();
                            }}
                            disabled={product.stock === 0}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
