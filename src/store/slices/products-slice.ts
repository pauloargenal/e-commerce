import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../../types/product';
import { productService } from '../../api/product-service';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: 'name' | 'price' | 'category';
  sortOrder: 'asc' | 'desc';
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  searchQuery: '',
  sortBy: 'name',
  sortOrder: 'asc'
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const products = await productService.fetchProducts();
  return products;
});

const fuzzySearch = (items: Product[], query: string): Product[] => {
  if (!query.trim()) {
    return items;
  }

  const lowerQuery = query.toLowerCase();

  return items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(lowerQuery);
    const priceMatch = item.price.toString().includes(lowerQuery);
    const categoryMatch = item.category.toLowerCase().includes(lowerQuery);

    return nameMatch || priceMatch || categoryMatch;
  });
};

const sortProducts = (
  items: Product[],
  sortBy: 'name' | 'price' | 'category',
  sortOrder: 'asc' | 'desc'
): Product[] => {
  const sorted = [...items].sort((productA, productB) => {
    let comparison = 0;

    if (sortBy === 'name') {
      comparison = productA.name.localeCompare(productB.name);
    } else if (sortBy === 'price') {
      comparison = productA.price - productB.price;
    } else if (sortBy === 'category') {
      comparison = productA.category.localeCompare(productB.category);
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const searched = fuzzySearch(state.items, action.payload);
      state.filteredItems = sortProducts(searched, state.sortBy, state.sortOrder);
    },
    setSortBy: (state, action: PayloadAction<'name' | 'price' | 'category'>) => {
      state.sortBy = action.payload;
      const searched = fuzzySearch(state.items, state.searchQuery);
      state.filteredItems = sortProducts(searched, action.payload, state.sortOrder);
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
      const searched = fuzzySearch(state.items, state.searchQuery);
      state.filteredItems = sortProducts(searched, state.sortBy, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
        const searched = fuzzySearch(action.payload, state.searchQuery);
        state.filteredItems = sortProducts(searched, state.sortBy, state.sortOrder);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export const { setSearchQuery, setSortBy, setSortOrder } = productsSlice.actions;
export default productsSlice.reducer;
