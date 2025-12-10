import { describe, it, expect, beforeEach, vi } from 'vitest';

import SearchProductServiceInstance from '../../src/api/search-product-service';

describe('SearchProductService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('searchProducts', () => {
    it('should search products successfully', async () => {
      const query = 'phone';
      const data = await SearchProductServiceInstance.searchProducts(query);

      expect(data).toBeDefined();
      expect(data.products).toBeDefined();
      expect(Array.isArray(data.products)).toBe(true);
    });

    it('should return products matching search query', async () => {
      const query = 'laptop';
      const data = await SearchProductServiceInstance.searchProducts(query);

      expect(data.products.length).toBeGreaterThan(0);

      // At least some products should contain the search term
      const matchingProducts = data.products.filter((product: any) => {
        const searchableText =
          `${product.title} ${product.description} ${product.category}`.toLowerCase();
        return searchableText.includes(query.toLowerCase());
      });

      expect(matchingProducts.length).toBeGreaterThan(0);
    });

    it('should handle URL encoding for special characters', async () => {
      const query = 'phone & tablet';
      const data = await SearchProductServiceInstance.searchProducts(query);

      expect(data.products).toBeDefined();
    });

    it('should return empty results for non-matching query', async () => {
      const query = 'xyzabc123nonexistent';
      const data = await SearchProductServiceInstance.searchProducts(query);

      expect(data.products).toBeDefined();
      expect(data.products.length).toBe(0);
    });

    it('should return products with required fields', async () => {
      const query = 'phone';
      const data = await SearchProductServiceInstance.searchProducts(query);

      if (data.products.length > 0) {
        const product = data.products[0];

        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('thumbnail');
      }
    });

    it('should return metadata with search results', async () => {
      const query = 'phone';
      const data = await SearchProductServiceInstance.searchProducts(query);

      expect(data).toHaveProperty('products');
      expect(data).toHaveProperty('total');
      expect(typeof data.total).toBe('number');
    });

    it('should handle case-insensitive search', async () => {
      const query1 = 'phone';
      const query2 = 'PHONE';

      const data1 = await SearchProductServiceInstance.searchProducts(query1);
      const data2 = await SearchProductServiceInstance.searchProducts(query2);

      expect(data1.products.length).toBe(data2.products.length);
    });

    it('should handle empty search query', async () => {
      const query = '';
      const data = await SearchProductServiceInstance.searchProducts(query);

      expect(data.products).toBeDefined();
    });

    it('should handle single character search', async () => {
      const query = 'a';
      const data = await SearchProductServiceInstance.searchProducts(query);

      expect(data.products).toBeDefined();
    });

    it('should search across multiple product fields', async () => {
      const queries = ['phone', 'laptop', 'perfume'];

      for (const query of queries) {
        const data = await SearchProductServiceInstance.searchProducts(query);

        if (data.products.length > 0) {
          // Verify that results are relevant to the query
          const hasRelevantResults = data.products.some((product: any) => {
            const searchableText =
              `${product.title} ${product.description} ${product.category}`.toLowerCase();
            return searchableText.includes(query.toLowerCase());
          });
          expect(hasRelevantResults).toBe(true);
        }
      }
    });
  });
});
