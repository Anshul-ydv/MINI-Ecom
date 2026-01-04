import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Header({ onOpenCart }) {
    const { cart } = useContext(ShopContext);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="header">
            <div className="container header-content">
                <h1>Mini Shop</h1>
                <button onClick={onOpenCart} className="cart-btn">
                    Cart ({totalItems})
                </button>
            </div>
        </header>
    );
}
