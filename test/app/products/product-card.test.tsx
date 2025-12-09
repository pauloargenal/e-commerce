import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { ProductCard } from '../../../src/app/products/components/product-card';
import cartReducer from '../../../src/store/slices/cart-slice';
import { mockProduct } from '../../mocks';

const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState
  });
};

const renderWithProvider = (component: React.ReactNode, store = createMockStore()) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render product information', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
  });

  it('should display discounted price', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const discountedPrice = mockProduct.price * (1 - mockProduct.discountPercentage / 100);
    expect(screen.getByText(`$${discountedPrice.toFixed(2)}`)).toBeInTheDocument();
  });

  it('should show discount badge when product has discount', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    expect(screen.getByText(`-${Math.round(mockProduct.discountPercentage)}%`)).toBeInTheDocument();
  });

  it('should render product image', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText(mockProduct.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.thumbnail);
  });

  it('should link to product detail page', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });
});
