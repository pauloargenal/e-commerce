import { describe, it, expect, vi, beforeEach } from 'vitest';

import { productService } from '../../src/api/product-service';

describe('productService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchProducts', () => {
    it('should fetch products from the API', async () => {
      const result = await productService.fetchProducts();
      expect(result.products).toBeDefined();
      expect(result.products.length).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
    });

    it('should return products with required fields', async () => {
      const result = await productService.fetchProducts(1);
      const product = result.products[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('thumbnail');
    });
  });

  describe('fetchProductById', () => {
    it('should fetch a single product by ID', async () => {
      const product = await productService.fetchProductById(1);
      expect(product).toBeDefined();
      expect(product?.id).toBe(1);
    });

    it('should return null for non-existent product', async () => {
      const product = await productService.fetchProductById(99999);
      expect(product).toBeNull();
    });
  });

  describe('searchProducts', () => {
    it('should search products by query', async () => {
      const result = await productService.searchProducts('phone');
      expect(result.products).toBeDefined();
    });
  });

  describe('fetchProductsByCategory', () => {
    it('should fetch products by category', async () => {
      const result = await productService.fetchProductsByCategory('smartphones');
      expect(result.products).toBeDefined();
      result.products.forEach((product) => {
        expect(product.category).toBe('smartphones');
      });
    });
  });

  describe('fetchCategories', () => {
    it('should fetch all categories', async () => {
      const categories = await productService.fetchCategories();
      expect(categories).toBeDefined();
      expect(categories.length).toBeGreaterThan(0);
      expect(categories[0]).toHaveProperty('slug');
      expect(categories[0]).toHaveProperty('name');
    });
  });
});
