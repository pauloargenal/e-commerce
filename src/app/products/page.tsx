import { Suspense } from 'react';

import { productService } from '../../api/product-service';
import { getLocale } from '../../utils/get-locales';
import { Product, SortOption, SortOrder } from '../../types/product';

import { ProductList } from './components/product-list';
import { ProductListSkeleton } from './components/product-list-skeleton';

interface SearchParams {
  search?: string;
  category?: string;
  sortBy?: SortOption;
  sortOrder?: SortOrder;
}

async function getProducts(searchParams: SearchParams): Promise<Product[]> {
  const { search, category } = searchParams;

  let products: Product[] = [];

  if (search && search.trim()) {
    const response = await productService.searchProducts(search);
    products = response.products;
  } else if (category && category !== 'all') {
    const response = await productService.fetchProductsByCategory(category);
    products = response.products;
  } else {
    const response = await productService.fetchProducts(100);
    products = response.products;
  }

  return products;
}

function sortProducts(
  products: Product[],
  sortBy: SortOption = 'title',
  sortOrder: SortOrder = 'asc'
): Product[] {
  return [...products].sort((productA, productB) => {
    let comparison = 0;

    switch (sortBy) {
      case 'title':
        comparison = productA.title.localeCompare(productB.title);
        break;
      case 'price':
        comparison = productA.price - productB.price;
        break;
      case 'rating':
        comparison = productA.rating - productB.rating;
        break;
      case 'stock':
        comparison = productA.stock - productB.stock;
        break;
      default:
        comparison = productA.title.localeCompare(productB.title);
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

interface ProductPageProps {
  searchParams: SearchParams;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const [locales, categories, products] = await Promise.all([
    getLocale(),
    productService.fetchCategories(),
    getProducts(searchParams)
  ]);

  const sortedProducts = sortProducts(
    products,
    searchParams.sortBy || 'title',
    searchParams.sortOrder || 'asc'
  );

  const productsLocale = locales.products;
  const productCardLocale = locales.productCard;
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList
        initialProducts={sortedProducts}
        categories={categories}
        productsLocale={productsLocale}
        productCardLocale={productCardLocale}
        currentFilters={{
          search: searchParams.search || '',
          category: searchParams.category || 'all',
          sortBy: searchParams.sortBy || 'title',
          sortOrder: searchParams.sortOrder || 'asc'
        }}
      />
    </Suspense>
  );
}
