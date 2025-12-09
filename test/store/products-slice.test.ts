import { describe, it, expect } from 'vitest';

import productsReducer, {
  addViewedProduct,
  clearViewedProducts
} from '../../src/store/slices/products-slice';

describe('productsSlice', () => {
  const initialState = {
    lastViewedProductIds: []
  };

  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addViewedProduct', () => {
    it('should add a product id to viewed products', () => {
      const state = productsReducer(initialState, addViewedProduct(1));
      expect(state.lastViewedProductIds).toContain(1);
    });

    it('should not add duplicate product ids', () => {
      const stateWithProduct = {
        lastViewedProductIds: [1]
      };
      const state = productsReducer(stateWithProduct, addViewedProduct(1));
      expect(state.lastViewedProductIds).toHaveLength(1);
    });

    it('should keep only last 10 viewed products', () => {
      interface ProductsState {
        lastViewedProductIds: number[];
      }
      let state: ProductsState = initialState;
      for (let i = 1; i <= 15; i++) {
        state = productsReducer(state, addViewedProduct(i)) as ProductsState;
      }
      expect(state.lastViewedProductIds).toHaveLength(10);
      expect(state.lastViewedProductIds[0]).toBe(15); // Most recent first
    });
  });

  describe('clearViewedProducts', () => {
    it('should clear all viewed products', () => {
      const stateWithProducts = {
        lastViewedProductIds: [1, 2, 3]
      };
      const state = productsReducer(stateWithProducts, clearViewedProducts());
      expect(state.lastViewedProductIds).toHaveLength(0);
    });
  });
});
