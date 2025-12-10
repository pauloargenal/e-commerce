import { describe, it, expect, beforeEach, vi } from 'vitest';

import GetProductServiceInstance from '../../src/api/get-product-service';

describe('GetProductService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getProduct', () => {
    it('should fetch a product by ID successfully', async () => {
      const productId = 1;
      const response = await GetProductServiceInstance.getProduct(productId);

      expect(response).toBeDefined();
      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toBeDefined();
      expect(data.id).toBe(productId);
      expect(data.title).toBeDefined();
      expect(data.price).toBeDefined();
    });

    it('should fetch different products by different IDs', async () => {
      const response1 = await GetProductServiceInstance.getProduct(1);
      const response2 = await GetProductServiceInstance.getProduct(2);

      const data1 = await response1.json();
      const data2 = await response2.json();

      expect(data1.id).toBe(1);
      expect(data2.id).toBe(2);
      expect(data1.id).not.toBe(data2.id);
    });

    it('should return appropriate response for non-existent product', async () => {
      const response = await GetProductServiceInstance.getProduct(99999);

      expect(response).toBeDefined();
      // The API might return 404 or an error object
      if (response.ok) {
        const data = await response.json();
        expect(data).toBeDefined();
      } else {
        expect(response.status).toBe(404);
      }
    });

    it('should have correct headers', async () => {
      const response = await GetProductServiceInstance.getProduct(1);

      expect(response.headers.get('content-type')).toContain('application/json');
    });

    it('should return product with all expected fields', async () => {
      const response = await GetProductServiceInstance.getProduct(1);
      const data = await response.json();

      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('description');
      expect(data).toHaveProperty('price');
      expect(data).toHaveProperty('category');
      expect(data).toHaveProperty('thumbnail');
      expect(data).toHaveProperty('images');
    });
  });
});
