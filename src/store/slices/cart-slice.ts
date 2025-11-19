import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartState, AddToCartPayload, UpdateQuantityPayload, RemoveFromCartPayload } from './types';

const initialState: CartState = {
  items: [],
  isCheckoutOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, size, color } = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,
          size,
          color,
          quantity: 1
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      const { productId, size, color } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      );
    },

    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId, size, color, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.product.id === productId && item.size === size && item.color === color
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color === color)
          );
        } else {
          item.quantity = quantity;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.isCheckoutOpen = false;
    },

    setCheckoutOpen: (state, action: PayloadAction<boolean>) => {
      state.isCheckoutOpen = action.payload;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCheckoutOpen } =
  cartSlice.actions;

export default cartSlice.reducer;
