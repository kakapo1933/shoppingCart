import { secondItemHalfOff, threeOrMoreItems } from './index';

/**
 * Represents a cart item
 * @typedef {Object} CartItem
 * @property {string} id - The unique identifier of the product
 * @property {string} name - The name of the product
 * @property {number} price - The price of the product
 * @property {number} quantity - The quantity of the product in the cart
 */

/**
 * Represents the cart as an array of cart items
 * @typedef {CartItem[]} Cart
 */

/**
 * Applies promotions to the cart and calculates the total price
 * @param {Cart} cart - The cart to apply promotions to
 * @returns {number} The total price after applying promotions
 */
function ruleOne(cart) {
  // Transform cart data structure to single items without quantity
  const transformedCart = cart.flatMap(item => 
    Array(item.quantity).fill().map(() => ({
      id: item.id,
      name: item.name,
      price: item.price
    }))
  );

  // Apply secondItemHalfOff promotion
  const discountedCartAppliedSecondItemHalfOff = secondItemHalfOff(transformedCart);

  // Calculate total price for items with secondItemHalfOff discount
  const discountedTotal = discountedCartAppliedSecondItemHalfOff
    .filter(item => item.discountApplied)
    .reduce((sum, item) => sum + (item.discountedPrice || item.price), 0);

  // Get non-discounted items
  const nonDiscountedItems = discountedCartAppliedSecondItemHalfOff.filter(item => !item.discountApplied);

  // Apply threeOrMoreItems promotion to non-discounted items
  const furtherDiscountedItems = threeOrMoreItems(nonDiscountedItems);

  // Calculate total price for items with threeOrMoreItems discount
  const furtherDiscountedTotal = furtherDiscountedItems
    .reduce((sum, item) => sum + (item.discountedPrice || item.price), 0);

  // Sum up all discounts
  const totalPrice = discountedTotal + furtherDiscountedTotal;

  return totalPrice;
}

const promotionRules = {
  ruleOne
};

export { promotionRules };