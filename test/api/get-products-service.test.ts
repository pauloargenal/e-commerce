import { describe, it, expect, beforeEach, vi } from 'vitest';

import GetProductsServiceInstance from '../../src/api/get-products-service';

describe('GetProductsService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch products with default parameters', async () => {
      const data = await GetProductsServiceInstance.getProducts();

      expect(data).toBeDefined();
      expect(data.products).toBeDefined();
      expect(Array.isArray(data.products)).toBe(true);
      expect(data.products.length).toBeGreaterThan(0);
      expect(data.total).toBeDefined();
      expect(data.skip).toBeDefined();
      expect(data.limit).toBeDefined();
    });

    it('should respect limit parameter', async () => {
      const limit = 5;
      const data = await GetProductsServiceInstance.getProducts(limit);

      expect(data.products.length).toBeLessThanOrEqual(limit);
      expect(data.limit).toBe(limit);
    });

    it('should respect skip parameter', async () => {
      const limit = 10;
      const skip = 5;
      const data = await GetProductsServiceInstance.getProducts(limit, skip);

      expect(data.skip).toBe(skip);
      expect(data.limit).toBe(limit);
    });

    it('should fetch different products with different skip values', async () => {
      const data1 = await GetProductsServiceInstance.getProducts(1, 0);
      const data2 = await GetProductsServiceInstance.getProducts(1, 1);

      // Products should be different
      expect(data1.products[0].id).not.toBe(data2.products[0].id);
    });

    it('should return products with required fields', async () => {
      const data = await GetProductsServiceInstance.getProducts(1);

      expect(data.products.length).toBeGreaterThan(0);
      const product = data.products[0];

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('thumbnail');
    });

    it('should handle large limit values', async () => {
      const limit = 100;
      const data = await GetProductsServiceInstance.getProducts(limit);

      expect(data.products).toBeDefined();
      expect(Array.isArray(data.products)).toBe(true);
    });

    it('should return metadata with products', async () => {
      const data = await GetProductsServiceInstance.getProducts(10, 0);

      expect(data).toHaveProperty('products');
      expect(data).toHaveProperty('total');
      expect(data).toHaveProperty('skip');
      expect(data).toHaveProperty('limit');
      expect(typeof data.total).toBe('number');
      expect(typeof data.skip).toBe('number');
      expect(typeof data.limit).toBe('number');
    });
  });
});
