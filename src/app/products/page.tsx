import { Suspense } from 'react';

import { getLocale } from '../../utils/get-locales';
import GetProductServiceInstance from '../../api/get-products-service';
import GetCategoryServiceInstance from '../../api/get-category-service';

import { ProductList } from './components/product-list';
import { ProductListSkeleton } from './components/product-list-skeleton';

export default async function ProductPage() {
  const [locales, categories, productsResponse] = await Promise.all([
    getLocale(),
    GetCategoryServiceInstance.getCategories(),
    GetProductServiceInstance.getProducts(100)
  ]);

  const productsLocale = locales.products;
  const productCardLocale = locales.productCard;

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList
        allProducts={productsResponse.products || []}
        categories={categories}
        productsLocale={productsLocale}
        productCardLocale={productCardLocale}
      />
    </Suspense>
  );
}
