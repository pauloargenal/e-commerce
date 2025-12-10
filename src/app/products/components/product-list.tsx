'use client';

import { useCallback, useState, useMemo } from 'react';
import { Search } from 'lucide-react';

import { Product, ProductFilters, SortOption, SortOrder } from '../../../types/product';
import { Button } from '../../../components/button';
import { CategoryResponse } from '../../../api/get-product-category-service';
import { sortProducts } from '../utils/sort-products';

import { ProductCard } from './product-card';
import ProductFilter from './product-filter';

interface ProductListProps {
  allProducts: Product[];
  categories: CategoryResponse[];
  productsLocale: Record<string, string>;
  productCardLocale: Record<string, string>;
}

export function ProductList({
  allProducts,
  categories,
  productsLocale,
  productCardLocale
}: ProductListProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<ProductFilters>({
    search: '',
    category: 'all',
    sortBy: 'title',
    sortOrder: 'asc'
  });

  const handleShowFilters = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCurrentFilters((prev) => ({ ...prev, search: searchValue }));
    },
    [searchValue]
  );

  const handleCategoryChange = useCallback((value: string) => {
    setCurrentFilters((prev) => ({ ...prev, category: value }));
  }, []);

  const handleSortByChange = useCallback((value: string) => {
    setCurrentFilters((prev) => ({ ...prev, sortBy: value as SortOption }));
  }, []);

  const handleSortOrderToggle = useCallback(() => {
    setCurrentFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchValue('');
    setCurrentFilters({
      search: '',
      category: 'all',
      sortBy: 'title',
      sortOrder: 'asc'
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];
    if (currentFilters.search.trim()) {
      const searchTerm = currentFilters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
    }

    if (currentFilters.category && currentFilters.category !== 'all') {
      filtered = filtered.filter((product) => product.category === currentFilters.category);
    }

    return sortProducts(filtered, currentFilters.sortBy, currentFilters.sortOrder);
  }, [allProducts, currentFilters]);

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

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          <span className="font-semibold text-slate-900">{filteredProducts.length}</span>{' '}
          {productsLocale.results}
        </p>
      </div>

      {filteredProducts.length === 0 && (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            productCardLocale={productCardLocale}
          />
        ))}
      </div>
    </div>
  );
}
