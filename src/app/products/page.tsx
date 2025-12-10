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

  if (search && search.trim()) {
    const data = await SearchProductServiceInstance.searchProducts(search);
    return data.products || [];
  }

  if (category && category !== 'all') {
    const data = await GetProductCategoryServiceInstance.getProductCategories(category);
    return data.products || [];
  }

  const data = await GetProductServiceInstance.getProducts(100);
  return data.products || [];
}

interface ProductPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const resolvedSearchParams = await searchParams;

  const [locales, categories, products] = await Promise.all([
    getLocale(),
    GetCategoryServiceInstance.getCategories(),
    getProducts(resolvedSearchParams)
  ]);

  const sortedProducts = sortProducts(
    products,
    resolvedSearchParams.sortBy || 'title',
    resolvedSearchParams.sortOrder || 'asc'
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
          search: resolvedSearchParams.search || '',
          category: resolvedSearchParams.category || 'all',
          sortBy: resolvedSearchParams.sortBy || 'title',
          sortOrder: resolvedSearchParams.sortOrder || 'asc'
        }}
      />
    </Suspense>
  );
}
