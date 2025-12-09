import { describe, it, expect } from 'vitest';

import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  setCheckoutOpen,
  openCheckout
} from '../../src/store/slices/cart-slice';
import { mockProduct, mockProduct2 } from '../mocks';

describe('cartSlice', () => {
  const initialState = {
    items: [],
    isOpen: false,
    isCheckoutOpen: false
  };

  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addToCart', () => {
    it('should add a product to the cart', () => {
      const state = cartReducer(initialState, addToCart({ product: mockProduct }));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product.id).toBe(mockProduct.id);
      expect(state.items[0].quantity).toBe(1);
    });

    it('should increment quantity if product already exists', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct, quantity: 1 }]
      };
      const state = cartReducer(stateWithItem, addToCart({ product: mockProduct }));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
    });
  });

  describe('removeFromCart', () => {
    it('should remove a product from the cart', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct, quantity: 1 }]
      };
      const state = cartReducer(stateWithItem, removeFromCart(mockProduct.id));
      expect(state.items).toHaveLength(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update the quantity of a product', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct, quantity: 1 }]
      };
      const state = cartReducer(
        stateWithItem,
        updateQuantity({ productId: mockProduct.id, quantity: 5 })
      );
      expect(state.items[0].quantity).toBe(5);
    });

    it('should remove product if quantity is 0 or less', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct, quantity: 1 }]
      };
      const state = cartReducer(
        stateWithItem,
        updateQuantity({ productId: mockProduct.id, quantity: 0 })
      );
      expect(state.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from the cart', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { product: mockProduct, quantity: 1 },
          { product: mockProduct2, quantity: 2 }
        ]
      };
      const state = cartReducer(stateWithItems, clearCart());
      expect(state.items).toHaveLength(0);
    });
  });

  describe('toggleCart', () => {
    it('should toggle cart open state', () => {
      const state = cartReducer(initialState, toggleCart());
      expect(state.isOpen).toBe(true);
      const state2 = cartReducer(state, toggleCart());
      expect(state2.isOpen).toBe(false);
    });
  });

  describe('setCartOpen', () => {
    it('should set cart open state', () => {
      const state = cartReducer(initialState, setCartOpen(true));
      expect(state.isOpen).toBe(true);
      const state2 = cartReducer(state, setCartOpen(false));
      expect(state2.isOpen).toBe(false);
    });
  });

  describe('setCheckoutOpen', () => {
    it('should set checkout open state', () => {
      const state = cartReducer(initialState, setCheckoutOpen(true));
      expect(state.isCheckoutOpen).toBe(true);
      const state2 = cartReducer(state, setCheckoutOpen(false));
      expect(state2.isCheckoutOpen).toBe(false);
    });
  });

  describe('openCheckout', () => {
    it('should close cart and open checkout', () => {
      const stateWithCartOpen = {
        ...initialState,
        isOpen: true
      };
      const state = cartReducer(stateWithCartOpen, openCheckout());
      expect(state.isOpen).toBe(false);
      expect(state.isCheckoutOpen).toBe(true);
    });
  });
});
