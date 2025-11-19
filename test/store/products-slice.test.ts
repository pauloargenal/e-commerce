import { describe, it, expect, beforeEach } from 'vitest';

import productsReducer, {
  setSearchQuery,
  setSortBy,
  setSortOrder,
  fetchProducts
} from '../../src/store/slices/products-slice';
import { Product } from '../../src/types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'T-Shirt',
    price: 29.99,
    category: 'Tops',
    description: 'Test',
    image: 'test.jpg',
    availableSizes: ['S', 'M', 'L'],
    availableColors: ['Red']
  },
  {
    id: '2',
    name: 'Jeans',
    price: 79.99,
    category: 'Bottoms',
    description: 'Test',
    image: 'test.jpg',
    availableSizes: ['30', '32'],
    availableColors: ['Blue']
  },
  {
    id: '3',
    name: 'Jacket',
    price: 199.99,
    category: 'Outerwear',
    description: 'Test',
    image: 'test.jpg',
    availableSizes: ['M', 'L'],
    availableColors: ['Black']
  }
];

describe('productsSlice', () => {
  it('should return the initial state', () => {
    const state = productsReducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
    expect(state.filteredItems).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.searchQuery).toBe('');
    expect(state.sortBy).toBe('name');
    expect(state.sortOrder).toBe('asc');
  });

  it('should set search query and filter items', () => {
    const initialState = {
      items: mockProducts,
      filteredItems: mockProducts,
      loading: false,
      error: null,
      searchQuery: '',
      sortBy: 'name' as const,
      sortOrder: 'asc' as const
    };

    const state = productsReducer(initialState, setSearchQuery('jean'));

    expect(state.searchQuery).toBe('jean');
    expect(state.filteredItems).toHaveLength(1);
    expect(state.filteredItems[0].name).toBe('Jeans');
  });

  it('should search by price', () => {
    const initialState = {
      items: mockProducts,
      filteredItems: mockProducts,
      loading: false,
      error: null,
      searchQuery: '',
      sortBy: 'name' as const,
      sortOrder: 'asc' as const
    };

    const state = productsReducer(initialState, setSearchQuery('79'));

    expect(state.filteredItems).toHaveLength(1);
    expect(state.filteredItems[0].name).toBe('Jeans');
  });

  it('should search by category', () => {
    const initialState = {
      items: mockProducts,
      filteredItems: mockProducts,
      loading: false,
      error: null,
      searchQuery: '',
      sortBy: 'name' as const,
      sortOrder: 'asc' as const
    };

    const state = productsReducer(initialState, setSearchQuery('outerwear'));

    expect(state.filteredItems).toHaveLength(1);
    expect(state.filteredItems[0].name).toBe('Jacket');
  });

  it('should sort by name ascending', () => {
    const initialState = {
      items: mockProducts,
      filteredItems: mockProducts,
      loading: false,
      error: null,
      searchQuery: '',
      sortBy: 'name' as const,
      sortOrder: 'asc' as const
    };

    const state = productsReducer(initialState, setSortBy('name'));

    expect(state.filteredItems[0].name).toBe('Jacket');
    expect(state.filteredItems[1].name).toBe('Jeans');
    expect(state.filteredItems[2].name).toBe('T-Shirt');
  });

  it('should sort by price ascending', () => {
    const initialState = {
      items: mockProducts,
      filteredItems: mockProducts,
      loading: false,
      error: null,
      searchQuery: '',
      sortBy: 'name' as const,
      sortOrder: 'asc' as const
    };

    const state = productsReducer(initialState, setSortBy('price'));

    expect(state.filteredItems[0].price).toBe(29.99);
    expect(state.filteredItems[1].price).toBe(79.99);
    expect(state.filteredItems[2].price).toBe(199.99);
  });

  it('should sort by price descending', () => {
    const initialState = {
      items: mockProducts,
      filteredItems: mockProducts,
      loading: false,
      error: null,
      searchQuery: '',
      sortBy: 'price' as const,
      sortOrder: 'asc' as const
    };

    let state = productsReducer(initialState, setSortBy('price'));
    state = productsReducer(state, setSortOrder('desc'));

    expect(state.filteredItems[0].price).toBe(199.99);
    expect(state.filteredItems[1].price).toBe(79.99);
    expect(state.filteredItems[2].price).toBe(29.99);
  });

  it('should handle fetchProducts pending', () => {
    const state = productsReducer(undefined, { type: fetchProducts.pending.type });

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchProducts fulfilled', () => {
    const state = productsReducer(undefined, {
      type: fetchProducts.fulfilled.type,
      payload: mockProducts
    });

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockProducts);
    expect(state.filteredItems).toHaveLength(3);
  });

  it('should handle fetchProducts rejected', () => {
    const state = productsReducer(undefined, {
      type: fetchProducts.rejected.type,
      error: { message: 'Test error' }
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Test error');
  });
});
