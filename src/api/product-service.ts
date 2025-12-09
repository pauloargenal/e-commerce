import { Product, ProductsResponse } from '../types/product';

const API_BASE_URL = 'https://dummyjson.com';

export interface CategoryResponse {
  slug: string;
  name: string;
  url: string;
}

export const productService = {
  async fetchProducts(limit = 100, skip = 0): Promise<ProductsResponse> {
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return response.json();
  },

  async fetchProductById(id: number): Promise<Product | null> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, { next: { revalidate: 3600 } });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch product with id ${id}`);
    }

    return response.json();
  },

  async searchProducts(query: string): Promise<ProductsResponse> {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.statusText}`);
    }

    return response.json();
  },

  async fetchProductsByCategory(category: string): Promise<ProductsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.statusText}`);
    }

    return response.json();
  },

  async fetchCategories(): Promise<CategoryResponse[]> {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return response.json();
  }
};
