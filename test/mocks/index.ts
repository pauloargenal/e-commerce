import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../../src/store/slices/products-slice';
import cartReducer from '../../src/store/slices/cart-slice';

export const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'Test description',
  price: 29.99,
  category: 'Test Category',
  image: '/test-image.jpg',
  availableSizes: ['S', 'M', 'L'],
  availableColors: ['Red', 'Blue']
};

export const mockProducts = [
  {
    id: '1',
    name: 'Test Product 1',
    description: 'Test description 1',
    price: 29.99,
    category: 'Test Category',
    image: '/test-image-1.jpg',
    availableSizes: ['S', 'M', 'L'],
    availableColors: ['Red', 'Blue']
  },
  {
    id: '2',
    name: 'Test Product 2',
    description: 'Test description 2',
    price: 49.99,
    category: 'Test Category',
    image: '/test-image-2.jpg',
    availableSizes: ['M', 'L', 'XL'],
    availableColors: ['Black', 'White']
  }
];

export const mockExpensiveProduct = {
  id: '3',
  name: 'Expensive Test Product',
  description: 'Expensive test description',
  price: 100,
  category: 'Premium Category',
  image: '/test-image-premium.jpg',
  availableSizes: ['S', 'M', 'L'],
  availableColors: ['Red', 'Blue']
};

export const mockProductsLocale = {
  loading: 'Loading products...',
  error: 'Error loading products',
  tryAgain: 'Try Again',
  noProducts: 'No products found',
  adjustSearch: 'Try adjusting your search',
  'input.placeholder': 'Search by name, price, or category...',
  'sort.byName': 'Sort by Name',
  'sort.byPrice': 'Sort by Price',
  'sort.byCategory': 'Sort by Category',
  'sort.ascending': 'Ascending',
  'sort.descending': 'Descending'
};

export const mockCartLocale = {
  'empty.title': 'Your cart is empty',
  'empty.description': 'Add some items to get started!',
  'item.size': 'Size',
  'item.color': 'Color',
  'item.each': 'each',
  'item.remove': 'Remove',
  'item.decrease': '-',
  'item.increase': '+',
  subtotal: 'Subtotal',
  checkout: 'Proceed to Checkout'
};

export const mockCheckoutLocale = {
  title: 'Checkout',
  orderComplete: 'Order Complete',
  orderSummary: 'Order Summary',
  promoCode: {
    invalid: 'Invalid promo code'
  },
  'promoCode.title': 'Promo Code',
  'promoCode.placeholder': 'Enter promo code',
  'promoCode.apply': 'Apply',
  'promoCode.applied': 'Promo code "{code}" applied!',
  'promoCode.saving': "You're saving {percentage}%",
  'promoCode.remove': 'Remove',
  'summary.subtotal': 'Subtotal:',
  'summary.discount': 'Discount ({percentage}%)',
  'summary.total': 'Total',
  completePurchase: 'Complete Purchase',
  qty: 'Qty'
};

export const mockProductCardLocale = {
  size: 'Size',
  color: 'Color',
  addToCart: 'Add to Cart',
  added: 'Added!'
};

export const mockReceiptLocale = {
  title: 'Thank you for your purchase!',
  orderNumber: 'Order Number',
  date: 'Date',
  items: 'Items',
  continueShopping: 'Continue Shopping'
};

/**
 * mock Redux store for products tests
 */
export function createMockProductsStore(initialState: any = {}) {
  return configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer
    },
    preloadedState: {
      products: {
        items: mockProducts,
        filteredItems: mockProducts,
        loading: false,
        error: null,
        searchQuery: '',
        sortBy: 'name' as 'name' | 'price' | 'category',
        sortOrder: 'asc' as 'asc' | 'desc',
        ...initialState
      },
      cart: {
        items: [],
        isCheckoutOpen: false,
        ...initialState
      }
    }
  });
}

/**
 * Creates a mock Redux store for cart tests
 */
export function createMockCartStore(initialState: any = {}) {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: {
        items: [],
        isCheckoutOpen: false,
        ...initialState
      }
    }
  });
}

/**
 * Creates a mock Redux store for checkout tests
 */
export function createMockCheckoutStore(initialState: any = {}) {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: {
        items: [],
        isCheckoutOpen: false,
        ...initialState
      }
    }
  });
}
