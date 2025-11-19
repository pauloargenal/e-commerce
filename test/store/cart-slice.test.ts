import { describe, it, expect } from 'vitest';

import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCheckoutOpen
} from '../../src/store/slices/cart-slice';
import { Product } from '../../src/types/product';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 29.99,
  category: 'Test',
  description: 'Test description',
  image: 'test.jpg',
  availableSizes: ['S', 'M', 'L'],
  availableColors: ['Red', 'Blue']
};

describe('cartSlice', () => {
  it('should return the initial state', () => {
    const state = cartReducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
    expect(state.isCheckoutOpen).toBe(false);
  });

  it('should add item to cart', () => {
    const state = cartReducer(
      undefined,
      addToCart({ product: mockProduct, size: 'M', color: 'Red' })
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe('1');
    expect(state.items[0].size).toBe('M');
    expect(state.items[0].color).toBe('Red');
    expect(state.items[0].quantity).toBe(1);
  });

  it('should increase quantity when adding same item with same variant', () => {
    let state = cartReducer(
      undefined,
      addToCart({ product: mockProduct, size: 'M', color: 'Red' })
    );

    state = cartReducer(state, addToCart({ product: mockProduct, size: 'M', color: 'Red' }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should add separate entry for different variants', () => {
    let state = cartReducer(
      undefined,
      addToCart({ product: mockProduct, size: 'M', color: 'Red' })
    );

    state = cartReducer(state, addToCart({ product: mockProduct, size: 'L', color: 'Blue' }));

    expect(state.items).toHaveLength(2);
    expect(state.items[0].size).toBe('M');
    expect(state.items[0].color).toBe('Red');
    expect(state.items[1].size).toBe('L');
    expect(state.items[1].color).toBe('Blue');
  });

  it('should remove item from cart', () => {
    let state = cartReducer(
      undefined,
      addToCart({ product: mockProduct, size: 'M', color: 'Red' })
    );

    state = cartReducer(state, removeFromCart({ productId: '1', size: 'M', color: 'Red' }));

    expect(state.items).toHaveLength(0);
  });

  it('should update quantity', () => {
    let state = cartReducer(
      undefined,
      addToCart({ product: mockProduct, size: 'M', color: 'Red' })
    );

    state = cartReducer(
      state,
      updateQuantity({ productId: '1', size: 'M', color: 'Red', quantity: 5 })
    );

    expect(state.items[0].quantity).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    let state = cartReducer(
      undefined,
      addToCart({ product: mockProduct, size: 'M', color: 'Red' })
    );

    state = cartReducer(
      state,
      updateQuantity({ productId: '1', size: 'M', color: 'Red', quantity: 0 })
    );

    expect(state.items).toHaveLength(0);
  });

  it('should clear cart', () => {
    let state = cartReducer(
      undefined,
      addToCart({ product: mockProduct, size: 'M', color: 'Red' })
    );

    state = cartReducer(state, clearCart());

    expect(state.items).toHaveLength(0);
    expect(state.isCheckoutOpen).toBe(false);
  });

  it('should set checkout open state', () => {
    let state = cartReducer(undefined, setCheckoutOpen(true));
    expect(state.isCheckoutOpen).toBe(true);

    state = cartReducer(state, setCheckoutOpen(false));
    expect(state.isCheckoutOpen).toBe(false);
  });
});
