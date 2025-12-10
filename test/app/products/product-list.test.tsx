import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { ProductList } from '../../../src/app/products/components/product-list';
import cartReducer from '../../../src/store/slices/cart-slice';
import productsReducer from '../../../src/store/slices/products-slice';
import { mockProducts } from '../../mocks';
import { CategoryResponse } from '../../../src/api/get-product-category-service';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn()
  }),
  useSearchParams: () => ({
    toString: () => '',
    get: () => null
  })
}));

const createMockStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer
    }
  });
};

const mockCategories: CategoryResponse[] = [
  {
    slug: 'smartphones',
    name: 'Smartphones',
    url: 'https://dummyjson.com/products/category/smartphones'
  },
  { slug: 'laptops', name: 'Laptops', url: 'https://dummyjson.com/products/category/laptops' }
];

const mockLocale = {
  title: 'Browse Products',
  loading: 'Loading...',
  noProducts: 'No products found',
  adjustSearch: 'Try adjusting your search',
  'input.placeholder': 'Search products...',
  'filter.allCategories': 'All Categories',
  'filter.category': 'Category',
  'search.label': 'Search:',
  'sort.byName': 'Name',
  'sort.byPrice': 'Price',
  'sort.byRating': 'Rating',
  'sort.byStock': 'Stock',
  'sort.ascending': 'Ascending',
  'sort.descending': 'Descending',
  results: 'products found',
  viewAll: 'View All Products'
};

const mockProductCardLocale = {
  addToCart: 'Add to Cart',
  added: 'Added!',
  view: 'View Details'
};

const mockFilters = {
  search: '',
  category: 'all',
  sortBy: 'title' as const,
  sortOrder: 'asc' as const
};

const renderWithProvider = (component: React.ReactNode) => {
  const store = createMockStore();
  return render(<Provider store={store}>{component}</Provider>);
};

describe('ProductListServer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render products', () => {
    renderWithProvider(
      <ProductList
        allProducts={mockProducts}
        categories={mockCategories}
        productsLocale={mockLocale}
        productCardLocale={mockProductCardLocale}
      />
    );

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it('should display product count', () => {
    renderWithProvider(
      <ProductList
        allProducts={mockProducts}
        categories={mockCategories}
        productsLocale={mockLocale}
        productCardLocale={mockProductCardLocale}
      />
    );

    expect(screen.getByText(String(mockProducts.length))).toBeInTheDocument();
  });

  it('should show no products message when empty', () => {
    renderWithProvider(
      <ProductList
        allProducts={[]}
        categories={mockCategories}
        productsLocale={mockLocale}
        productCardLocale={mockProductCardLocale}
      />
    );

    expect(screen.getByText(mockLocale.noProducts)).toBeInTheDocument();
  });

  it('should render search input', () => {
    renderWithProvider(
      <ProductList
        allProducts={mockProducts}
        categories={mockCategories}
        productsLocale={mockLocale}
        productCardLocale={mockProductCardLocale}
      />
    );

    expect(screen.getByPlaceholderText(mockLocale['input.placeholder'])).toBeInTheDocument();
  });
});
