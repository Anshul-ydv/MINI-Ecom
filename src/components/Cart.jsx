import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Cart({ onClose }) {
    const { cart, updateQuantity, removeFromCart, clearCart } = useContext(ShopContext);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={e => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p className="empty-cart">Your cart is empty.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-info">
                                    <h4>{item.title}</h4>
                                    <p>₹{item.price} each</p>
                                </div>
                                <div className="cart-controls">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <h3>Total: ₹{total.toFixed(2)}</h3>
                    {cart.length > 0 && (
                        <button className="checkout-btn" onClick={() => alert('Checkout not implemented')}>
                            Checkout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
