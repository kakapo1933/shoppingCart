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
 * Applies a 50% discount to every second item of the same product in the cart
 * @param {Cart} cart - The original cart
 * @returns {Cart} The cart with discounts applied
 */
export function secondItemHalfOff(cart) {
  if (cart.length === 0) {
    return [];
  }

  const discountRate = 0.5;
  const discountedCart = [];
  const itemCount = {};

  for (const item of cart) {
    const discountedItem = { ...item };
    itemCount[item.id] = (itemCount[item.id] || 0) + 1;

    if (itemCount[item.id] % 2 === 0) {
      discountedItem.discountedPrice = item.price * discountRate;
      discountedItem.discountApplied = 'secondItemHalf';
      discountedCart[discountedCart.length - 1].discountApplied = 'secondItemHalf';
    }

    discountedCart.push(discountedItem);
  }

  return discountedCart;
}

export default secondItemHalfOff;