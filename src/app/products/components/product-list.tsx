'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';
import { Search, Loader2 } from 'lucide-react';

import { Product, ProductFilters, SortOption, SortOrder } from '../../../types/product';
import { Button } from '../../../components/button';
import { CategoryResponse } from '../../../api/product-service';

import { ProductCard } from './product-card';
import ProductFilter from './product-filter';

interface ProductListProps {
  initialProducts: Product[];
  categories: CategoryResponse[];
  productsLocale: Record<string, string>;
  currentFilters: ProductFilters;
  productCardLocale: Record<string, string>;
}

export function ProductList({
  initialProducts,
  categories,
  productsLocale,
  currentFilters,
  productCardLocale
}: ProductListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState(currentFilters.search);
  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);

  const updateFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== 'all' && value !== '') {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      startTransition(() => {
        router.push(`/products?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      updateFilters({ search: searchValue, category: '' });
    },
    [searchValue, updateFilters]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      updateFilters({ category: value, search: '' });
      setSearchValue('');
    },
    [updateFilters]
  );

  const handleSortByChange = useCallback(
    (value: string) => {
      updateFilters({ sortBy: value as SortOption });
    },
    [updateFilters]
  );

  const handleSortOrderToggle = useCallback(() => {
    const newOrder: SortOrder = currentFilters.sortOrder === 'asc' ? 'desc' : 'asc';
    updateFilters({ sortOrder: newOrder });
  }, [currentFilters.sortOrder, updateFilters]);

  const clearFilters = useCallback(() => {
    setSearchValue('');
    startTransition(() => {
      router.push('/products');
    });
  }, [router]);

  const hasActiveFilters =
    currentFilters.search || (currentFilters.category && currentFilters.category !== 'all');

  const categoryOptions = [
    { value: 'all', label: productsLocale['filter.allCategories'] || 'All Categories' },
    ...categories.map((cat) => ({ value: cat.slug, label: cat.name }))
  ];

  const sortOrderTitle =
    currentFilters.sortOrder === 'asc'
      ? productsLocale['sort.ascending']
      : productsLocale['sort.descending'];

  const sortOrderClass =
    currentFilters.sortOrder === 'desc'
      ? 'w-5 h-5 transition-transform rotate-180'
      : 'w-5 h-5 transition-transform';

  const matchingCategory = categories.find((cat) => cat.slug === currentFilters.category);
  const categoryDisplayName = matchingCategory?.name || currentFilters.category;

  return (
    <div className="space-y-6">
      <ProductFilter
        handleSearch={handleSearch}
        productsLocale={productsLocale}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleShowFilters={handleShowFilters}
        showFilters={showFilters}
        currentFilters={currentFilters}
        handleCategoryChange={handleCategoryChange}
        handleSortByChange={handleSortByChange}
        handleSortOrderToggle={handleSortOrderToggle}
        categoryOptions={categoryOptions}
        sortOrderTitle={sortOrderTitle}
        sortOrderClass={sortOrderClass}
        hasActiveFilters={Boolean(hasActiveFilters)}
        clearFilters={clearFilters}
        categoryDisplayName={categoryDisplayName}
      />

      {isPending && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span className="text-slate-600 font-medium">{productsLocale.loading}</span>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          <span className="font-semibold text-slate-900">{initialProducts.length}</span>{' '}
          {productsLocale.results}
        </p>
      </div>

      {initialProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
            <Search className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">{productsLocale.noProducts}</h3>
          <p className="text-slate-500 mb-6">{productsLocale.adjustSearch}</p>
          <Button
            onClick={clearFilters}
            variant="primary"
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
          >
            {productsLocale.viewAll}
          </Button>
        </div>
      )}
      {initialProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {initialProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              productCardLocale={productCardLocale}
            />
          ))}
        </div>
      )}
    </div>
  );
}
