# E-Commerce Product Listing Page (PLP)

A modern e-commerce web application focused on building a high-quality Product Listing Page (PLP) showcasing products with images, names, and vital product information.

## Features

### Core Functionality

- **Product Listing Page (PLP)** - Browse products with images, names, prices, ratings, and descriptions
- **Search** - Search products by name using the search bar
- **Filter** - Filter products by category using dropdown
- **Sort** - Sort products by name, price, rating, or stock (ascending/descending)
- **Routing Navigation** - Navigate to individual product detail pages

### Technical Implementation

- **Server-Side Data Fetching** - Products are fetched on the server using Next.js Server Components
- **URL-Based Filtering** - Search, filter, and sort parameters are stored in the URL for shareable links
- **Type-Safe** - Full TypeScript implementation
- **External API Integration** - Data fetched from [DummyJSON API](https://dummyjson.com/products)

### UI/UX Features

- Modern, responsive design with Tailwind CSS
- Product cards with hover effects and quick actions
- Discount badges and stock indicators
- Star ratings display
- Shopping cart sidebar
- Product detail page with image gallery and reviews
- Loading states and skeleton screens

## Tech Stack

- **Framework**: Next.js 13.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Icons**: Lucide React
- **Font**: Poppins

## API Endpoints Used

- `https://dummyjson.com/products` - Get all products
- `https://dummyjson.com/products/{id}` - Get single product
- `https://dummyjson.com/products/search?q={query}` - Search products
- `https://dummyjson.com/products/category/{category}` - Get products by category
- `https://dummyjson.com/products/categories` - Get all categories

## Getting Started

### Prerequisites

- Node.js 18.16.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone git@github.com:pauloargenal/e-commerce.git && cd e-commerce
```

2. Install dependencies:

```bash
npm install
```

3. Update env variables:

```bash
npm run setup:env
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Check code formatting with Prettier
- `npm run test` - Run tests with Vitest

## Project Structure

```
src/
├── api/
│   ├── mock-data.ts        # Mock promo codes
│   └── get-product-service.ts  # API service for DummyJSON
│   └── ...
├── app/
│   ├── layout.tsx          # Root layout
│   └── products/
│       ├── page.tsx        # Products listing page (server component)
│       ├── layout.tsx      # Products layout
│       ├── [id]/           # Dynamic product detail route
│       │   ├── page.tsx
│       │   ├── product-detail.tsx
│       │   └── not-found.tsx
│       └── components/
│           ├── product-card.tsx
│           ├── product-list-server.tsx
│           ├── product-list-skeleton.tsx
│           ├── cart-sidebar.tsx
│           └── check-out/
├── components/             # Shared UI components
├── locales/               # i18n translations
├── store/                 # Redux store configuration
├── styles/               # Global CSS styles
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Key Features Explained

### Server-Side Data Fetching

Products are fetched on the server in `page.tsx`:

```typescript
export default async function ProductPage({ searchParams }: ProductPageProps) {
 const [locales, categories, products] = await Promise.all([
    getLocale(),
    GetCategoryServiceInstance.getCategories().then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }
      return response.json();
    }),
    getProducts(searchParams)
  ]);
```

### URL-Based Filtering

The app uses URL search parameters for filtering:

- `/products?search=phone` - Search for "phone"
- `/products?category=smartphones` - Filter by smartphones
- `/products?sortBy=price&sortOrder=asc` - Sort by price ascending

### Routing Navigation

- `/products` - Main product listing page
- `/products/{id}` - Individual product detail page
