# Fashion Style - E-commerce Application

A modern, responsive e-commerce application built with Next.js, React, Redux Toolkit, and TailwindCSS.
The application integrates with the [Fake Store API](https://fakestoreapi.com/) to display real product data and provides a complete shopping experience with cart management and checkout functionality.

## Features

- **Product Catalog**: Browse products from multiple categories (electronics, jewelry, men's/women's clothing)
- **Real-time Search**: Fuzzy search across product names, categories, and prices
- **Sorting & Filtering**: Sort products by name, price, or category in ascending/descending order
- **Shopping Cart**: Add items with size and color selections, update quantities, remove items
- **Checkout Process**: Apply promo codes, view receipts, and complete purchases
- **Responsive Design**: Optimized layouts for mobile, tablet, and desktop
- **Internationalization**: Locale-based string management for easy translation
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Comprehensive Testing**: Unit and integration tests with Vitest and React Testing Library

## 📋 Table of Contents

- [Setup Instructions](#setup-instructions)
- [Design Decisions](#design-decisions)
- [Known Limitations](#known-limitations)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Scripts](#scripts)

## 🛠 Setup Instructions

### Prerequisites

- **Node.js**: Version 18.16.0 (specified in `engines` field)
- **npm**: Comes with Node.js

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:pauloargenal/e-commerce.git
   cd fashion-style
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

### Environment

- **Development**: Runs on port 3000
- **Node Version**: 18.16.0
- **API**: Uses Fake Store API (https://fakestoreapi.com) - no API keys required

## Design Decisions

### State Management Architecture

#### Redux Toolkit with Slices

The application uses Redux Toolkit for centralized state management, organized into two main slices:

**1. Products Slice (`products-slice.ts`)**

```typescript
interface ProductsState {
  items: Product[]; // All fetched products
  filteredItems: Product[]; // Filtered and sorted products for display
  loading: boolean; // Loading state for async operations
  error: string | null; // Error messages
  searchQuery: string; // Current search query
  sortBy: 'name' | 'price' | 'category';
  sortOrder: 'asc' | 'desc';
}
```

**Design Rationale:**

- **Separation of concerns**: `items` stores raw data, `filteredItems` stores computed results
- **Optimistic filtering**: Search and sort operations are performed client-side for instant feedback
- **Async thunk**: Uses `createAsyncThunk` for API calls with built-in loading/error states

**2. Cart Slice (`cart-slice.ts`)**

```typescript
interface CartState {
  items: CartItem[]; // Cart items with product, size, color, quantity
  isCheckoutOpen: boolean; // Checkout modal state
}
```

**Design Rationale:**

- **Composite keys**: Cart items are uniquely identified by `productId + size + color` combination
- **Immutable updates**: Uses Redux Toolkit's Immer for safe state mutations
- **Modal management**: Checkout state lives in Redux for accessibility across components

**Trade-offs:**

- **Pros**: Centralized state, predictable updates, easy debugging with Redux DevTools
- **Cons**: Adds complexity for small apps, requires boilerplate for actions/reducers
- **Alternative considered**: React Context API (simpler but less scalable)

### Component Structure

#### Layout Pattern

```
ProductLayout (Client Component)
├── Header (Display cart count)
├── Main Content (4-column grid: 75% products / 25% cart)
│   ├── ProductList (Client Component)
│   │   └── ProductCard (Multiple instances)
│   └── Cart (Client Component)
├── Checkout (Modal, Client Component)
└── Footer
```

**Design Rationale:**

- **Server Components**: Pages load locale data server-side for SEO and performance
- **Client Components**: Interactive features (cart, search, filters) use `'use client'` directive
- **Prop Drilling for Locales**: Server-loaded strings passed down to maintain server component benefits
- **Sticky Sidebar**: Cart has `position: sticky` for easy access while browsing

**Trade-offs:**

- **Pros**: Better performance, SEO-friendly, clear separation of concerns
- **Cons**: Locale strings must be passed as props (can't use hooks in server components)

#### Component Design Principles

1. **Atomic Design**: Reusable components (`Button`, `Card`, `Input`, `Select`)
2. **Single Responsibility**: Each component has one clear purpose
3. **Composition over Inheritance**: Components compose smaller components
4. **Presentation/Container Pattern**: Smart components (Redux) vs presentational components

### API Integration

#### Fake Store API Mapping

The application transforms Fake Store API responses to match internal data structures:

```typescript
// API Response → Internal Product
{
  title → name
  id (number) → id (string)
  // Added fields not in API:
  availableSizes: Generated based on category
  availableColors: Generated based on category
}
```

**Design Rationale:**

- **Category-based logic**: Clothing gets sizes (XS-XL), electronics get "One Size"
- **Color defaults**: Electronics (Black/Silver/White), Jewelry (Gold/Silver), Clothing (varied)
- **Graceful degradation**: If API fails, errors are caught and displayed to users

**Trade-offs:**

- **Pros**: Works with real API, demonstrates API integration, no backend required
- **Cons**: Generated data (sizes/colors) is not real, limited to API's data
- **Future Enhancement**: Could use a custom backend for more realistic data

### Styling Strategy

#### TailwindCSS with Utility Classes

- **Responsive Design**: Mobile-first with breakpoints (sm, md, lg, xl)
- **Grid Layout**: Responsive product grid (1→2→3→4 columns)
- **Component Styling**: Inline utility classes for rapid development
- **No CSS files**: All styles in JSX (except global styles)

**Trade-offs:**

- **Pros**: Fast development, no CSS naming conflicts, built-in responsiveness
- **Cons**: Verbose JSX, harder to share complex styles
- **Alternative considered**: CSS Modules (more traditional but slower to iterate)

### Data Flow

```
User Action → Component → Redux Action → Reducer → State Update → Re-render
                    ↓
              API Call (for products)
```

**Optimizations:**

- **Memoization**: `useMemo` for computed values (truncated descriptions, formatted prices)
- **State co-location**: Cart state persists across navigation
- **Debouncing**: Could be added for search (not implemented to keep code simple)

### Search & Filter Implementation

**Fuzzy Search:**

- Searches across name, category, and price fields
- Case-insensitive matching
- Updates `filteredItems` on every keystroke

**Sorting:**

- Three sort options: name (alphabetical), price (numerical), category (alphabetical)
- Toggle between ascending/descending order
- Maintains search query during sort operations

**Trade-offs:**

- **Pros**: Instant feedback, works offline after initial load
- **Cons**: Client-side filtering doesn't scale to thousands of products
- **Future Enhancement**: Server-side search/pagination for larger catalogs

## Known Limitations

### 1. Data Limitations

- **Generated attributes**: Product sizes and colors are generated based on category rules, not real data
- **Limited products**: Only ~20 products from Fake Store API
- **No product variants**: Each product-size-color combination is treated as unique in cart
- **Rating data**: Present but not displayed in UI

### 2. State Persistence

- **No local storage**: Cart clears on page refresh
- **No authentication**: No user accounts or order history
- **Session management**: All data is in-memory only

**Future Enhancement:**

```typescript
// Could add Redux Persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
```

### 3. Performance Considerations

- **Client-side filtering**: All products loaded at once, not suitable for large catalogs
- **No pagination**: All products rendered simultaneously
- **No image optimization**: Using external URLs without Next.js Image optimization
- **Bundle size**: Redux Toolkit + all dependencies increase initial load

**Current bundle approach:**

- Acceptable for 20 products
- Would need optimization for 1000+ products

### 4. Mobile Responsiveness

- **Card width**: Fixed minimum width can cause horizontal scroll on very small screens (<350px)
- **Checkout modal**: Takes full screen on mobile (intentional but could be improved)
- **Touch interactions**: No swipe gestures for cart management

### 5. Accessibility

- **Partial ARIA support**: Some interactive elements lack proper labels
- **Keyboard navigation**: Works but not optimized
- **Screen reader**: Not fully tested
- **Color contrast**: Meets WCAG AA but not AAA

**Future Enhancement:**

- Add `aria-label`, `role` attributes
- Implement product page
- Implement focus management
- Add skip navigation links
### 6. Testing Coverage

- **No E2E tests**: Only unit and integration tests
- **API mocking**: Tests don't use MSW (Mock Service Worker) for realistic API simulation
- **Visual regression**: No screenshot comparison tests
- **Coverage gaps**: Some edge cases not covered

### 7. Error Handling

- **Generic error messages**: API errors shown as generic messages
- **No retry logic**: Failed API calls don't automatically retry
- **No offline support**: App requires internet connection
- **No loading skeletons**: Simple spinner instead of content placeholders

### 8. Promo Code System

- **Hardcoded promo codes**: Stored in `mock-data.ts`, not validated server-side
- **Simple discount**: Only percentage discount, no complex rules
- **No expiration**: Promo codes never expire
- **Multiple codes**: Can't stack multiple promo codes

### 9. Checkout Flow

- **No payment processing**: Checkout only generates a receipt
- **No validation**: Doesn't validate shipping addresses or payment info


### 10. Internationalization

- **English only**: Locale system exists but only English strings provided
- **Hardcoded formatting**: Currency and date formatting not locale-aware

## 📁 Project Structure

```
fashion-style/
├── src/
│   ├── api/                      # API integration layer
│   │   ├── product-service.ts    # Fake Store API client
│   │   └── mock-data.ts          # Promo codes
│   ├── app/                      # Next.js  app directory (routes)
│   │   ├── layout.tsx            # Root layout
│   │   └── products/             # Products page route
│   │       ├── page.tsx          # Server component (loads locales)
│   │       ├── product-layout.tsx # Client component layout
│   │       └── components/       # Page-specific components
│   │           ├── product-list.tsx
│   │           ├── product-card.tsx
│   │           ├── cart.tsx
│   │           └── check-out/
│   ├── components/               # Shared UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── modal.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── providers.tsx         # Redux Provider wrapper
│   ├── store/                    # Redux store
│   │   ├── index.ts              # Store configuration
│   │   ├── hooks.ts              # Typed Redux hooks
│   │   └── slices/
│   │       ├── products-slice.ts
│   │       ├── cart-slice.ts
│   │       └── types.ts
│   ├── types/                    # TypeScript type definitions
│   │   └── product.ts
│   ├── utils/                    # Utility functions
│   │   ├── get-locales.ts
│   │   └── validation/           # Zod validation schemas
│   ├── locales/                  # i18n JSON files
│   │   └── en.json
│   └── styles/                   # Global styles
│       └── main.css
├── test/                         # Test files (mirrors src structure)
│   ├── api/
│   ├── app/
│   ├── components/
│   ├── store/
│   └── mocks/
├── public/                       # Static assets
├── vitest.config.cjs            # Vitest configuration
├── tailwind.config.cjs          # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json
```

### Key Architectural Patterns

- **Next.js  App Directory**: File-system based routing
- **Server/Client Component Split**: Optimized performance and SEO
- **Feature-based Organization**: Page-specific components in route folders
- **Shared Components**: Reusable components in `/components`
- **Type-first Development**: TypeScript interfaces drive implementation
- **Test Co-location**: Tests mirror source structure

## Testing

### Test Stack

- **Test Runner**: Vitest (fast, Vite-based)
- **React Testing**: @testing-library/react
- **Environment**: jsdom for DOM simulation

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- test/api/product-service.test.ts
```


## Scripts

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production
npm start          # Serve production build
npm test           # Run tests
npm run lint       # Run ESLint
npm run format     # Check code formatting with Prettier
```

## Tech Stack

### Core

- **Next.js 13.5.4**: React framework with App Router
- **React 18.2.0**: UI library
- **TypeScript 5.1.3**: Type safety

### State Management

- **Redux Toolkit 2.10.1**: State management
- **React Redux 9.2.0**: React bindings

### Styling

- **TailwindCSS 3.3.2**: Utility-first CSS
- **Lucide React**: Icon library

### Development Tools

- **Vitest 0.31.1**: Test runner
- **ESLint**: Code linting
- **Prettier**: Code formatting




