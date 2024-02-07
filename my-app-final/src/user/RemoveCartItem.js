// ShoppingCart.js
import React from 'react';
import CartItem from '../components/CartItem';

const ShoppingCart = ({ cartItems, onRemoveItem }) => {
    return (
        <div className="shopping-cart">
            {cartItems.map((item) => (
                <CartItem key={item.id} product={item} onRemove={onRemoveItem} />
            ))}
        </div>
    );
};

export default ShoppingCart;
