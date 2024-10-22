import { promotionRules } from "../promotions/promotionRules";

describe("promotionRules.ruleOne", () => {
  const { ruleOne } = promotionRules;

  it("should return 0 if no items are in the cart", () => {
    expect(ruleOne([])).toBe(0);
  });

  it("should calculate the correct price for a single item", () => {
    const cart = [{ id: '001', name: 'Product 1', price: 45, quantity: 1 }];
    expect(ruleOne(cart)).toBe(45);
  });

  it("should apply 50% discount on the second item of the same product", () => {
    const cart = [{ id: '003', name: 'Product 3', price: 55, quantity: 2 }];
    expect(ruleOne(cart)).toBe(82.5);
  });

  it("should apply $5 discount on each item when buying 3 or more items", () => {
    const cart = [
      { id: '001', name: 'Product 1', price: 45, quantity: 1 },
      { id: '002', name: 'Product 2', price: 50, quantity: 1 },
      { id: '003', name: 'Product 3', price: 55, quantity: 1 }
    ];
    expect(ruleOne(cart)).toBe(135);
  });

  it("should handle multiple discounts correctly", () => {
    const cart = [
      { id: '003', name: 'Product 3', price: 55, quantity: 3 },
      { id: '002', name: 'Product 2', price: 50, quantity: 1 },
      { id: '004', name: 'Product 4', price: 60, quantity: 1 }
    ];
    expect(ruleOne(cart)).toBe(232.5);
  });

  it("should apply discounts correctly for a large number of items", () => {
    const cart = [
      { id: '001', name: 'Product 1', price: 45, quantity: 2 },
      { id: '002', name: 'Product 2', price: 50, quantity: 2 },
      { id: '003', name: 'Product 3', price: 55, quantity: 1 },
      { id: '004', name: 'Product 4', price: 60, quantity: 1 },
      { id: '005', name: 'Product 5', price: 35, quantity: 1 }
    ];
    expect(ruleOne(cart)).toBe(277.5);
  });

  it("should apply discounts correctly for five of the same item", () => {
    const cart = [{ id: '002', name: 'Product 2', price: 50, quantity: 5 }];
    expect(ruleOne(cart)).toBe(200);
  });

  it("should not apply any discount for two different items", () => {
    const cart = [
      { id: '001', name: 'Product 1', price: 30, quantity: 1 },
      { id: '002', name: 'Product 2', price: 40, quantity: 1 }
    ];
    expect(ruleOne(cart)).toBe(70);
  });

  it("should apply correct discount for multiple sets of two items", () => {
    const cart = [
      { id: '001', name: 'Product 1', price: 30, quantity: 2 },
      { id: '002', name: 'Product 2', price: 40, quantity: 2 }
    ];
    expect(ruleOne(cart)).toBe(105);
  });

  it("should handle a mix of discounted and non-discounted items", () => {
    const cart = [
      { id: '001', name: 'Product 1', price: 30, quantity: 3 },
      { id: '002', name: 'Product 2', price: 40, quantity: 1 },
      { id: '003', name: 'Product 3', price: 50, quantity: 2 }
    ];
    expect(ruleOne(cart)).toBe(190);
  });

  it("should handle a cart with a large number of different items", () => {
    const cart = [
      { id: '001', name: 'Product 1', price: 10, quantity: 1 },
      { id: '002', name: 'Product 2', price: 20, quantity: 2 },
      { id: '003', name: 'Product 3', price: 30, quantity: 3 },
      { id: '004', name: 'Product 4', price: 40, quantity: 4 },
      { id: '005', name: 'Product 5', price: 50, quantity: 5 }
    ];
    expect(ruleOne(cart)).toBe(420);
  });
});
