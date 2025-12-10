import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, CartItem } from '../../types/product';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  isCheckoutOpen: false
};

interface AddToCartPayload {
  product: Product;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem && existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      } else if (!existingItem && product.stock > 0) {
        state.items.push({
          product,
          quantity: 1
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.product.id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((cartItem) => cartItem.product.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setCheckoutOpen: (state, action: PayloadAction<boolean>) => {
      state.isCheckoutOpen = action.payload;
    },
    openCheckout: (state) => {
      state.isOpen = false;
      state.isCheckoutOpen = true;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  setCheckoutOpen,
  openCheckout
} = cartSlice.actions;

export default cartSlice.reducer;
