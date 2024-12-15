import React from 'react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item._id });
    } else {
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { id: item._id, quantity: newQuantity }
      });
    }
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const calculateTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    // Dispatch the action to clear the cart
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {state.items.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">${item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item, 1)}>+</button>
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Total Items: {state.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
        <p className="cart-total">Total: ${calculateTotal().toFixed(2)}</p>
        <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
