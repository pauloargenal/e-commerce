import { createSlice } from '@reduxjs/toolkit';

// This slice is kept minimal as products are now fetched server-side
// It can be used for any client-side product state management if needed in the future

interface ProductsState {
  // Reserved for future client-side product state
  lastViewedProductIds: number[];
}

const initialState: ProductsState = {
  lastViewedProductIds: []
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addViewedProduct: (state, action) => {
      const productId = action.payload;
      // Keep only last 10 viewed products
      if (!state.lastViewedProductIds.includes(productId)) {
        state.lastViewedProductIds = [productId, ...state.lastViewedProductIds].slice(0, 10);
      }
    },
    clearViewedProducts: (state) => {
      state.lastViewedProductIds = [];
    }
  }
});

export const { addViewedProduct, clearViewedProducts } = productsSlice.actions;
export default productsSlice.reducer;
