import { Suspense } from 'react';

import { getLocale } from '../../utils/get-locales';
import { Product, SortOption, SortOrder } from '../../types/product';
import GetProductServiceInstance from '../../api/get-products-service';
import GetCategoryServiceInstance from '../../api/get-category-service';
import GetProductCategoryServiceInstance from '../../api/get-product-category-service';
import SearchProductServiceInstance from '../../api/search-product-service';

import { ProductList } from './components/product-list';
import { ProductListSkeleton } from './components/product-list-skeleton';
import { sortProducts } from './utils/sort-products';

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
    const response = await SearchProductServiceInstance.searchProducts(search);
    const data = await response.json();
    if (!data.products) {
      throw new Error(`No products found for search: ${search}`);
    }
    products = data.products;
  } else if (category && category !== 'all') {
    const response = await GetProductCategoryServiceInstance.getProductCategories(category);
    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.products) {
      throw new Error(`No products found for category: ${category}`);
    }
    products = data.products;
  } else {
    const response = await GetProductServiceInstance.getProducts(100);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.products) {
      throw new Error(`No products found`);
    }
    products = data.products;
  }

  return products;
}

interface ProductPageProps {
  searchParams: SearchParams;
}

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
