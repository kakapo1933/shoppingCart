/**
 * Represents the structure of a cart item
 * @typedef {Object} CartItem
 * @property {string} id - The unique identifier of the product
 * @property {string} name - The name of the product
 * @property {number} price - The price of the product
 */

/**
 * Represents the cart as an array of cart items
 * @typedef {CartItem[]} Cart
 */

/**
 * Applies a discount when there are three or more items in the cart
 * @param {Cart} cart - The original cart
 * @returns {Cart} The cart with discounts applied
 */

function threeOrMoreItems(cart) {
  const discountAmount = 5;
  const totalQuantity = cart.length;

  if (totalQuantity < 3) {
    return cart;
  }

  return cart.map(item => ({
    ...item,
    discountedPrice: item.price - discountAmount,
    discountApplied: 'threeOrMoreItems'
  }));
}

export { threeOrMoreItems };
