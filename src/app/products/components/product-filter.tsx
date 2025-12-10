import { ArrowUpDown, Filter, Search, X } from 'lucide-react';

import { Button, Select } from '../../../components';
import { ProductFilters } from '../../../types/product';

interface ProductFilterProps {
  handleSearch: (event: React.FormEvent) => void;
  productsLocale: Record<string, string>;
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleShowFilters: () => void;
  showFilters: boolean;
  currentFilters: ProductFilters;
  handleCategoryChange: (value: string) => void;
  handleSortByChange: (value: string) => void;
  handleSortOrderToggle: () => void;
  categoryOptions: { value: string; label: string }[];
  sortOrderTitle: string;
  sortOrderClass: string;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  categoryDisplayName: string;
}
export default function ProductFilter({
  handleSearch,
  productsLocale,
  searchValue,
  setSearchValue,
  handleShowFilters,
  showFilters,
  currentFilters,
  handleCategoryChange,
  handleSortByChange,
  handleSortOrderToggle,
  categoryOptions,
  sortOrderTitle,
  sortOrderClass,
  hasActiveFilters,
  clearFilters,
  categoryDisplayName
}: ProductFilterProps) {
  const showCategoryBadge = currentFilters.category && currentFilters.category !== 'all';
  const filterControlsClass = showFilters
    ? 'flex flex-col lg:flex-row gap-3 flex'
    : 'flex flex-col lg:flex-row gap-3 hidden lg:flex';
  return (
    <div className="relative z-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-5">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              aria-label={productsLocale['search.label']}
              type="text"
              autoComplete="off"
              placeholder={productsLocale['input.placeholder']}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-slate-400"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="px-4 rounded-xl lg:hidden"
            onClick={handleShowFilters}
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
        <div className={filterControlsClass}>
          <div className="flex-1">
            <Select
              fullWidth
              value={currentFilters.category}
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder={productsLocale['filter.category'] || 'Category'}
            />
          </div>
          <div className="flex gap-2 flex-1">
            <div className="flex-1">
              <Select
                fullWidth
                value={currentFilters.sortBy}
                onChange={handleSortByChange}
                options={[
                  { value: 'title', label: productsLocale['sort.byName'] },
                  { value: 'price', label: productsLocale['sort.byPrice'] },
                  { value: 'rating', label: productsLocale['sort.byRating'] || 'Rating' },
                  { value: 'stock', label: productsLocale['sort.byStock'] || 'Stock' }
                ]}
              />
            </div>
            <Button
              type="button"
              onClick={handleSortOrderToggle}
              variant="outline"
              className="px-4 rounded-xl shrink-0"
              title={sortOrderTitle}
            >
              <ArrowUpDown className={sortOrderClass} />
            </Button>
          </div>
          {hasActiveFilters && (
            <Button
              type="button"
              onClick={clearFilters}
              variant="danger"
              className="px-4 rounded-xl text-white hover:bg-red-700"
            >
              {productsLocale['filter.clear']}
            </Button>
          )}
        </div>
      </form>
      {showCategoryBadge && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mt-1">
          {categoryDisplayName}
        </span>
      )}
    </div>
  );
}
