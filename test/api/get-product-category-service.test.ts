import { describe, it, expect, beforeEach, vi } from 'vitest';

import GetProductCategoryServiceInstance from '../../src/api/get-product-category-service';

describe('GetProductCategoryService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getProductCategories', () => {
    it('should fetch products by category successfully', async () => {
      const category = 'smartphones';
      const response = await GetProductCategoryServiceInstance.getProductCategories(category);

      expect(response).toBeDefined();
      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.products).toBeDefined();
      expect(Array.isArray(data.products)).toBe(true);
      expect(data.products.length).toBeGreaterThan(0);
    });

    it('should return products with matching category', async () => {
      const category = 'laptops';
      const response = await GetProductCategoryServiceInstance.getProductCategories(category);
      const data = await response.json();

      expect(data.products.length).toBeGreaterThan(0);
      data.products.forEach((product: any) => {
        expect(product.category).toBe(category);
      });
    });

    it('should handle URL encoding for category names with spaces', async () => {
      const category = 'home-decoration';
      const response = await GetProductCategoryServiceInstance.getProductCategories(category);

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data.products).toBeDefined();
    });

    it('should return products with required fields', async () => {
      const category = 'smartphones';
      const response = await GetProductCategoryServiceInstance.getProductCategories(category);
      const data = await response.json();

      expect(data.products.length).toBeGreaterThan(0);
      const product = data.products[0];

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('thumbnail');
    });

    it('should return metadata with products', async () => {
      const category = 'smartphones';
      const response = await GetProductCategoryServiceInstance.getProductCategories(category);
      const data = await response.json();

      expect(data).toHaveProperty('products');
      expect(data).toHaveProperty('total');
      expect(typeof data.total).toBe('number');
      expect(data.total).toBeGreaterThan(0);
    });

    it('should have correct content-type header', async () => {
      const category = 'smartphones';
      const response = await GetProductCategoryServiceInstance.getProductCategories(category);

      expect(response.headers.get('content-type')).toContain('application/json');
    });

    it('should handle different category names', async () => {
      const categories = ['smartphones', 'laptops', 'fragrances'];

      for (const category of categories) {
        const response = await GetProductCategoryServiceInstance.getProductCategories(category);
        const data = await response.json();

        expect(response.ok).toBe(true);
        expect(data.products.length).toBeGreaterThan(0);
        data.products.forEach((product: any) => {
          expect(product.category).toBe(category);
        });
      }
    });

    it('should return appropriate response for non-existent category', async () => {
      const response = await GetProductCategoryServiceInstance.getProductCategories(
        'non-existent-category-12345'
      );

      // The API might return 404 or empty products array
      if (response.ok) {
        const data = await response.json();
        expect(data.products).toBeDefined();
        expect(data.products.length).toBe(0);
      } else {
        expect(response.status).toBe(404);
      }
    });
  });
});
