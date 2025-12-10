import { describe, it, expect, beforeEach, vi } from 'vitest';

import GetProductServiceInstance from '../../src/api/get-product-service';

describe('GetProductService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getProduct', () => {
    it('should fetch a product by ID successfully', async () => {
      const productId = 1;
      const product = await GetProductServiceInstance.getProduct(productId);

      expect(product).toBeDefined();
      expect(product.id).toBe(productId);
      expect(product.title).toBeDefined();
      expect(product.price).toBeDefined();
    });

    it('should fetch different products by different IDs', async () => {
      const product1 = await GetProductServiceInstance.getProduct(1);
      const product2 = await GetProductServiceInstance.getProduct(2);

      expect(product1.id).toBe(1);
      expect(product2.id).toBe(2);
      expect(product1.id).not.toBe(product2.id);
    });

    it('should throw error for non-existent product', async () => {
      await expect(GetProductServiceInstance.getProduct(99999)).rejects.toThrow();
    });

    it('should return product with all expected fields', async () => {
      const product = await GetProductServiceInstance.getProduct(1);

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('thumbnail');
      expect(product).toHaveProperty('images');
    });
  });
});
