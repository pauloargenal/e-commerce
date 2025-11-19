import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import { Cart } from '../../../src/app/products/components/cart';
import { mockCartLocale, mockProduct, createMockCartStore } from '../../mocks';

const createMockStore = createMockCartStore;

describe('Cart Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show empty cart message when cart is empty', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    expect(screen.getByText('Your cart is empty')).toBeTruthy();
    expect(screen.getByText('Add some items to get started!')).toBeTruthy();
  });

  it('should render cart items when cart has products', () => {
    const store = createMockStore({
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
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeTruthy();
    // check if size and color are displayed (text is split across multiple text nodes)
    const container = screen.getByText('Test Product').closest('.flex-1');
    expect(container?.textContent).toContain('Size');
    expect(container?.textContent).toContain('M');
    expect(container?.textContent).toContain('Color');
    expect(container?.textContent).toContain('Red');
  });

  it('should display correct price per item', () => {
    const store = createMockStore({
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
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    expect(screen.getByText('$29.99 each')).toBeTruthy();
  });

  it('should display correct total price for multiple quantities', () => {
    const store = createMockStore({
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
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    expect(screen.getAllByText('$59.98').length).toBeGreaterThan(0);
  });

  it('should calculate correct subtotal for multiple items', () => {
    const store = createMockStore({
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 2
        },
        {
          product: { ...mockProduct, id: '2', price: 19.99 },
          size: 'L',
          color: 'Blue',
          quantity: 1
        }
      ]
    });

    render(
      <Provider store={store}>
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    expect(screen.getByText('$79.97')).toBeTruthy();
  });

  it('should display quantity controls', () => {
    const store = createMockStore({
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 2
        }
      ]
    });

    const { container } = render(
      <Provider store={store}>
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    const buttons = container.querySelectorAll('button');
    const decrementButton = Array.from(buttons).find((btn) => btn.textContent === '-');
    const incrementButton = Array.from(buttons).find((btn) => btn.textContent === '+');

    expect(screen.getByText('2')).toBeTruthy();
    expect(decrementButton).toBeTruthy();
    expect(incrementButton).toBeTruthy();
  });

  it('should increment quantity when + button is clicked', () => {
    const store = createMockStore({
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
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    const buttons = container.querySelectorAll('button');
    const incrementButton = Array.from(buttons).find((btn) => btn.textContent === '+');

    fireEvent.click(incrementButton!);

    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(2);
  });

  it('should decrement quantity when - button is clicked', () => {
    const store = createMockStore({
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 2
        }
      ]
    });

    const { container } = render(
      <Provider store={store}>
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    const buttons = container.querySelectorAll('button');
    const decrementButton = Array.from(buttons).find((btn) => btn.textContent === '-');

    fireEvent.click(decrementButton!);

    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(1);
  });

  it('should remove item when quantity reaches 0', () => {
    const store = createMockStore({
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
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    const buttons = container.querySelectorAll('button');
    const decrementButton = Array.from(buttons).find((btn) => btn.textContent === '-');

    fireEvent.click(decrementButton!);

    const state = store.getState();
    expect(state.cart.items.length).toBe(0);
  });

  it('should render remove button', () => {
    const store = createMockStore({
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
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    const trashIcon = container.querySelector('.lucide-trash-2');
    expect(trashIcon).toBeTruthy();
  });

  it('should remove item when remove button is clicked', () => {
    const store = createMockStore({
      items: [
        {
          product: mockProduct,
          size: 'M',
          color: 'Red',
          quantity: 2
        }
      ]
    });

    const { container } = render(
      <Provider store={store}>
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    const trashIcon = container.querySelector('.lucide-trash-2');
    fireEvent.click(trashIcon!);

    const state = store.getState();
    expect(state.cart.items.length).toBe(0);
  });

  it('should render proceed to checkout button', () => {
    const store = createMockStore({
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
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    expect(screen.getByText('Proceed to Checkout')).toBeTruthy();
  });

  it('should open checkout when proceed button is clicked', () => {
    const store = createMockStore({
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
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    const checkoutButton = screen.getByText('Proceed to Checkout');
    fireEvent.click(checkoutButton);

    const state = store.getState();
    expect(state.cart.isCheckoutOpen).toBe(true);
  });

  it('should render product image in cart item', () => {
    const store = createMockStore({
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
        <Cart cartLocale={mockCartLocale} />
      </Provider>
    );

    const image = container.querySelector('img') as HTMLImageElement;
    expect(image).toBeTruthy();
    expect(image.src).toContain('/test-image.jpg');
  });
});
