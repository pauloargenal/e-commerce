import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { Checkout } from '../../../src/app/products/components/check-out/check-out';
import {
  mockCheckoutLocale,
  mockProductCardLocale,
  mockReceiptLocale,
  mockExpensiveProduct,
  createMockCheckoutStore
} from '../../mocks';

const mockProduct = mockExpensiveProduct;
const createMockStore = createMockCheckoutStore;

describe('Checkout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when checkout is closed', () => {
    const store = createMockStore({
      isCheckoutOpen: false,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 1
        }
      ]
    });

    const { container } = render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    // modal should not be visible
    expect(container.querySelector('[role="dialog"]')).toBeFalsy();
  });

  it('should render checkout modal when opened', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 1
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    expect(screen.getByText('Checkout')).toBeTruthy();
  });

  it('should display order summary with cart items', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 2
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    expect(screen.getByText(/Order Summary/)).toBeTruthy();
    expect(screen.getByText('Expensive Test Product')).toBeTruthy();
    expect(screen.getByText(/Qty.*:.*2/)).toBeTruthy();
  });

  it('should calculate correct subtotal', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 2
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    expect(screen.getAllByText('$200.00').length).toBeGreaterThan(0);
  });

  it('should render promo code input', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 1
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    expect(screen.getByText('Promo Code')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter promo code')).toBeTruthy();
    expect(screen.getByText('Apply')).toBeTruthy();
  });

  it('should allow entering promo code', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 1
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    const promoInput = screen.getByPlaceholderText('Enter promo code') as HTMLInputElement;
    fireEvent.change(promoInput, { target: { value: 'SAVE10' } });

    expect(promoInput.value).toBe('SAVE10');
  });

  it('should show error for invalid promo code', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 1
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    const promoInput = screen.getByPlaceholderText('Enter promo code');
    const applyButton = screen.getByText('Apply');

    fireEvent.change(promoInput, { target: { value: 'INVALID' } });
    fireEvent.click(applyButton);

    waitFor(() => {
      expect(screen.getByText('Invalid promo code')).toBeTruthy();
    });
  });

  it('should render complete purchase button', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 1
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    expect(screen.getByText('Complete Purchase')).toBeTruthy();
  });

  it('should display total amount', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 1
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    expect(screen.getByText('Total')).toBeTruthy();
    expect(screen.getAllByText('$100.00').length).toBeGreaterThan(0);
  });

  it('should render order summary section', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 1
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    expect(screen.getByText(/Order Summary/)).toBeTruthy();
    // verify subtotal exists in the card with the Summary section
    const summaryCard = screen.getByText(/Order Summary/).closest('.space-y-6');
    expect(summaryCard?.textContent).toContain('Subtotal');
  });

  it('should display item details in order summary', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: [
        {
          product: mockProduct,
          size: 'L',
          color: 'Blue',
          quantity: 3
        }
      ]
    });

    render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    expect(screen.getByText('Expensive Test Product')).toBeTruthy();
    expect(screen.getByText(/Size.*:.*L/)).toBeTruthy();
    expect(screen.getByText(/Color.*:.*Blue/)).toBeTruthy();
    expect(screen.getByText(/Qty.*:.*3/)).toBeTruthy();
  });

  it('should have scrollable order summary for many items', () => {
    const store = createMockStore({
      isCheckoutOpen: true,
      items: Array.from({ length: 10 }, (_, i) => ({
        product: { ...mockProduct, id: `${i}` },
        size: 'M',
        color: 'Red',
        quantity: 1
      }))
    });

    const { container } = render(
      <Provider store={store}>
        <Checkout
          checkoutLocale={mockCheckoutLocale}
          productCardLocale={mockProductCardLocale}
          receiptLocale={mockReceiptLocale}
        />
      </Provider>
    );

    const orderSummary = container.querySelector('.max-h-60');
    expect(orderSummary).toBeTruthy();
    expect(orderSummary?.className).toContain('overflow-y-auto');
  });
});
