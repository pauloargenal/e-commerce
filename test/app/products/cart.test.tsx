import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { CartSidebar } from '../../../src/app/products/components/cart-sidebar';
import cartReducer from '../../../src/store/slices/cart-slice';
import { mockProduct, mockProduct2 } from '../../mocks';

const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState
  });
};

const mockCartLocale = {
  title: 'Shopping Cart',
  'empty.title': 'Your cart is empty',
  'empty.description': 'Add some items to get started!',
  'empty.continue': 'Continue Shopping',
  subtotal: 'Subtotal:',
  checkout: 'Proceed to Checkout',
  close: 'Close cart',
  'item.decrease': 'Decrease quantity',
  'item.increase': 'Increase quantity',
  'item.remove': 'Remove item'
};

const renderWithProvider = (component: React.ReactNode, store = createMockStore()) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('CartSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show empty cart message when cart is empty', () => {
    renderWithProvider(<CartSidebar cartLocale={mockCartLocale} isOpen />);

    expect(screen.getByText(mockCartLocale['empty.title'])).toBeInTheDocument();
    expect(screen.getByText(mockCartLocale['empty.description'])).toBeInTheDocument();
  });

  it('should display cart items when cart has items', () => {
    const store = createMockStore({
      cart: {
        items: [
          { product: mockProduct, quantity: 1 },
          { product: mockProduct2, quantity: 2 }
        ],
        isOpen: true
      }
    });

    renderWithProvider(<CartSidebar cartLocale={mockCartLocale} isOpen />, store);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct2.title)).toBeInTheDocument();
  });

  it('should calculate subtotal correctly', () => {
    const store = createMockStore({
      cart: {
        items: [{ product: mockProduct, quantity: 2 }],
        isOpen: true
      }
    });

    renderWithProvider(<CartSidebar cartLocale={mockCartLocale} isOpen />, store);

    const discountedPrice = mockProduct.price * (1 - mockProduct.discountPercentage / 100);
    const subtotal = discountedPrice * 2;
    expect(screen.getByText(`$${subtotal.toFixed(2)}`)).toBeInTheDocument();
  });

  it('should not be visible when isOpen is false', () => {
    renderWithProvider(<CartSidebar cartLocale={mockCartLocale} isOpen={false} />);

    const sidebar = screen
      .getByRole('dialog', { name: mockCartLocale.title })
      .closest('aside[class*="fixed"]');

    expect(sidebar).toBeTruthy();
    expect(sidebar?.className).toContain('translate-x-full');
  });
});
