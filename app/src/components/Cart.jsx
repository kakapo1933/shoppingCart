import React from 'react';

function Cart({ cart, onRemove, onUpdateQuantity, promotionRule }) {
  const total = promotionRule && typeof promotionRule === 'function'
    ? promotionRule(cart)
    : cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name} - ${item.price.toFixed(2)}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value, 10);
                  if (!isNaN(newQuantity) && newQuantity > 0) {
                    onUpdateQuantity(item.id, newQuantity);
                  }
                }}
              />
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
