'use client';

import { useEffect } from 'react';
import { Loader2, ArrowUp, ArrowDown } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchProducts,
  setSearchQuery,
  setSortBy,
  setSortOrder
} from '../../../store/slices/products-slice';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Select } from '../../../components/select';
import { Product } from '../../../types/product';

import { ProductCard } from './product-card';

interface ProductListProps {
  productsLocale: Record<string, string>;
  productCardLocale: Record<string, string>;
}

export function ProductList({ productsLocale, productCardLocale }: ProductListProps) {
  const dispatch = useAppDispatch();
  const { filteredItems, loading, error, searchQuery, sortBy, sortOrder } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleSortByChange = (value: string) => {
    dispatch(setSortBy(value as 'name' | 'price' | 'category'));
  };

  const handleToggleSortOrder = () => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="mt-4 text-gray-600">{productsLocale.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold">{productsLocale.error}</p>
          <p className="text-gray-600 mt-2">{error}</p>
          <Button className="mt-4" onClick={() => dispatch(fetchProducts())}>
            {productsLocale.tryAgain}
          </Button>
        </div>
      </div>
    );
  }

  const buttonTitle =
    sortOrder === 'asc' ? productsLocale['sort.ascending'] : productsLocale['sort.descending'];
  const buttonContent =
    sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  return (
    <>
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              fullWidth
              type="text"
              placeholder={productsLocale['input.placeholder']}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex gap-2">
            <Select
              fullWidth
              value={sortBy}
              onChange={handleSortByChange}
              options={[
                { value: 'name', label: productsLocale['sort.byName'] },
                { value: 'price', label: productsLocale['sort.byPrice'] },
                { value: 'category', label: productsLocale['sort.byCategory'] }
              ]}
            />

            <Button
              onClick={handleToggleSortOrder}
              variant="outline"
              className="px-3"
              title={buttonTitle}
            >
              {buttonContent}
            </Button>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 h-screen">
          <p className="text-gray-600 text-lg">{productsLocale.noProducts}</p>
          {searchQuery && <p className="text-gray-500 mt-2">{productsLocale.adjustSearch}</p>}
        </div>
      )}

      {filteredItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((product: Product) => (
            <ProductCard key={product.id} product={product} productCardLocale={productCardLocale} />
          ))}
        </div>
      )}
    </>
  );
}
