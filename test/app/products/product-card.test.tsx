import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { ProductCard } from '../../../src/app/products/components/product-card';
import { mockProductCardLocale, createMockCartStore } from '../../mocks';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'Test description',
  price: 29.99,
  category: 'Test Category',
  image: '/test-image.jpg',
  availableSizes: ['S', 'M', 'L'],
  availableColors: ['Red', 'Blue', 'Green']
};

const createMockStore = createMockCartStore;

describe('ProductCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render product information', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('Test description')).toBeTruthy();
    expect(screen.getByText('$29.99')).toBeTruthy();
    expect(screen.getByText('Test Category')).toBeTruthy();
  });

  it('should render product image', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    const image = container.querySelector('img') as HTMLImageElement;
    expect(image).toBeTruthy();
    expect(image.src).toContain('/test-image.jpg');
    expect(image.alt).toBe('Test Product');
  });

  it('should render size select with all available sizes', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    // Find Size label
    expect(screen.getByText('Size')).toBeTruthy();

    // Open the select dropdown
    const selectButtons = screen.getAllByRole('button');
    const sizeSelectButton = selectButtons[0];
    fireEvent.click(sizeSelectButton);

    expect(screen.getAllByText('S').length).toBeGreaterThan(0);
    expect(screen.getByText('M')).toBeTruthy();
    expect(screen.getByText('L')).toBeTruthy();
  });

  it('should render color select with all available colors', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    expect(screen.getByText('Color')).toBeTruthy();

    // open the select dropdown
    const selectButtons = screen.getAllByRole('button');
    const colorSelectButton = selectButtons[1];
    fireEvent.click(colorSelectButton);

    // check if colors are rendered (use getAllByText since text appears multiple times)
    expect(screen.getAllByText('Red').length).toBeGreaterThan(0);
    expect(screen.getByText('Blue')).toBeTruthy();
    expect(screen.getByText('Green')).toBeTruthy();
  });

  it('should render add to cart button', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    expect(addToCartButton).toBeTruthy();
  });

  it('should show "Added!" message after adding to cart', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(screen.getByText('Added!')).toBeTruthy();
    });
  });

  it('should add product to cart with selected size and color', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    // click add to cart
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    // verify item was added to cart
    const state = store.getState();
    expect(state.cart.items.length).toBe(1);
    expect(state.cart.items[0].product.id).toBe('1');
    expect(state.cart.items[0].size).toBe('S');
    expect(state.cart.items[0].color).toBe('Red');
  });

  it('should change size selection', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    // open size select
    const selectButtons = screen.getAllByRole('button');
    const sizeSelectButton = selectButtons[0];
    fireEvent.click(sizeSelectButton);

    // select 'L' size
    const lSizeOption = screen.getByText('L');
    fireEvent.click(lSizeOption);

    // add to cart
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    // verify item was added with size L
    const state = store.getState();
    expect(state.cart.items[0].size).toBe('L');
  });

  it('should change color selection', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    // open color select
    const selectButtons = screen.getAllByRole('button');
    const colorSelectButton = selectButtons[1];
    fireEvent.click(colorSelectButton);

    // select 'Blue' color
    const blueColorOption = screen.getByText('Blue');
    fireEvent.click(blueColorOption);

    // add to cart
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    // verify item was added with color Blue
    const state = store.getState();
    expect(state.cart.items[0].color).toBe('Blue');
  });

  it('should have proper card layout styles', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} productCardLocale={mockProductCardLocale} />
      </Provider>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('flex');
    expect(card.className).toContain('flex-col');
    expect(card.className).toContain('h-full');
  });
});
