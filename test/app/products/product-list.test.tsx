import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { ProductList } from '../../../src/app/products/components/product-list';
import * as productService from '../../../src/api/product-service';
import {
  mockProductsLocale,
  mockProductCardLocale,
  mockProducts,
  createMockProductsStore
} from '../../mocks';
import { Product } from '../../../src/types/product';

const createMockStore = createMockProductsStore;

// mock the productService
vi.mock('../../../src/api/productService', () => ({
  productService: {
    fetchProducts: vi.fn()
  }
}));

describe('ProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(productService.productService, 'fetchProducts').mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render products list', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductList
          productsLocale={mockProductsLocale}
          productCardLocale={mockProductCardLocale}
        />
      </Provider>
    );

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeTruthy();
      expect(screen.getByText('Test Product 2')).toBeTruthy();
    });
  });

  it('should show loading state', async () => {
    vi.spyOn(productService.productService, 'fetchProducts').mockImplementation(
      () => new Promise<Product[]>((resolve) => resolve(mockProducts))
    );

    const store = createMockStore({
      products: {
        items: [],
        filteredItems: [],
        loading: true,
        error: null,
        searchQuery: '',
        sortBy: 'name',
        sortOrder: 'asc'
      }
    });

    render(
      <Provider store={store}>
        <ProductList
          productsLocale={mockProductsLocale}
          productCardLocale={mockProductCardLocale}
        />
      </Provider>
    );

    expect(screen.getByText('Loading products...')).toBeTruthy();

    // wait a tick to ensure all state updates are processed
    await waitFor(() => {
      expect(screen.getByText('Loading products...')).toBeTruthy();
    });
  });

  it('should show error state', async () => {
    // mock API to reject
    vi.spyOn(productService.productService, 'fetchProducts').mockRejectedValue(
      new Error('Failed to fetch')
    );

    const store = createMockStore({
      products: {
        items: [],
        filteredItems: [],
        loading: false,
        error: 'Failed to fetch',
        searchQuery: '',
        sortBy: 'name',
        sortOrder: 'asc'
      }
    });

    render(
      <Provider store={store}>
        <ProductList
          productsLocale={mockProductsLocale}
          productCardLocale={mockProductCardLocale}
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error loading products')).toBeTruthy();
      expect(screen.getByText('Failed to fetch')).toBeTruthy();
      expect(screen.getByText('Try Again')).toBeTruthy();
    });
  });

  it('should show no products message when list is empty', async () => {
    // mock empty products response
    vi.spyOn(productService.productService, 'fetchProducts').mockResolvedValue([]);

    const store = createMockStore({
      products: {
        items: [],
        filteredItems: [],
        loading: false,
        error: null,
        searchQuery: '',
        sortBy: 'name',
        sortOrder: 'asc'
      }
    });

    render(
      <Provider store={store}>
        <ProductList
          productsLocale={mockProductsLocale}
          productCardLocale={mockProductCardLocale}
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No products found')).toBeTruthy();
    });
  });

  it('should render search input with correct placeholder', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductList
          productsLocale={mockProductsLocale}
          productCardLocale={mockProductCardLocale}
        />
      </Provider>
    );

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search by name, price, or category...');
      expect(searchInput).toBeTruthy();
    });
  });

  it('should update search query on input change', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductList
          productsLocale={mockProductsLocale}
          productCardLocale={mockProductCardLocale}
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search by name, price, or category...')).toBeTruthy();
    });

    const searchInput = screen.getByPlaceholderText(
      'Search by name, price, or category...'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(searchInput.value).toBe('test search');
  });

  it('should render sort select with correct options', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductList
          productsLocale={mockProductsLocale}
          productCardLocale={mockProductCardLocale}
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });

    // Open the select dropdown
    const selectButton = screen.getAllByRole('button')[0];
    fireEvent.click(selectButton);

    expect(screen.getAllByText('Sort by Name').length).toBeGreaterThan(0);
    expect(screen.getByText('Sort by Price')).toBeTruthy();
    expect(screen.getByText('Sort by Category')).toBeTruthy();
  });

  it('should toggle sort order when button is clicked', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductList
          productsLocale={mockProductsLocale}
          productCardLocale={mockProductCardLocale}
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });

    const sortOrderButton = await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      return buttons.find((btn) => btn.getAttribute('title') === 'Ascending')!;
    });

    expect(sortOrderButton).toBeTruthy();

    // Click to toggle
    fireEvent.click(sortOrderButton);

    // Should update to descending
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      const updatedButton = buttons.find((btn) => btn.getAttribute('title') === 'Descending');
      expect(updatedButton).toBeTruthy();
    });
  });

  it('should render all products in grid layout', async () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ProductList
          productsLocale={mockProductsLocale}
          productCardLocale={mockProductCardLocale}
        />
      </Provider>
    );

    await waitFor(() => {
      const grids = container.querySelectorAll('.grid');
      const productsGrid = Array.from(grids).find((grid) =>
        grid.className.includes('lg:grid-cols-3')
      );
      expect(productsGrid).toBeTruthy();
    });
  });
});
