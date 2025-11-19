import { describe, it, expect } from 'vitest';

import { productService } from '../../src/api/product-service';
import { Product } from '../../src/types/product';

describe('productService', () => {
  it('should fetch products', async () => {
    const products = await productService.fetchProducts();

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('should return products with required fields', async () => {
    const products = await productService.fetchProducts();
    const product = products[0];

    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('image');
    expect(product).toHaveProperty('availableSizes');
    expect(product).toHaveProperty('availableColors');
  });

  it('should remove duplicate products', async () => {
    const products = await productService.fetchProducts();

    const duplicates = products.filter(
      (product: Product, index: number, self: Product[]) =>
        self.findIndex(
          (prod: Product) =>
            prod.name === product.name &&
            prod.price === product.price &&
            prod.category === product.category
        ) !== index
    );

    expect(duplicates.length).toBe(0);
  });

  it('should fetch product by id', async () => {
    const product = await productService.fetchProductById('1');

    expect(product).toBeDefined();
    expect(product?.id).toBe('1');
  });

  it('should return undefined for non-existent product id', async () => {
    await expect(productService.fetchProductById('non-existent-id')).rejects.toThrow(
      'Failed to fetch product with id non-existent-id'
    );
  });

  it('should have products with valid price', async () => {
    const products = await productService.fetchProducts();

    products.forEach((product) => {
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
    });
  });

  it('should have products with available sizes', async () => {
    const products = await productService.fetchProducts();

    products.forEach((product) => {
      expect(Array.isArray(product.availableSizes)).toBe(true);
      expect(product.availableSizes.length).toBeGreaterThan(0);
    });
  });

  it('should have products with available colors', async () => {
    const products = await productService.fetchProducts();

    products.forEach((product) => {
      expect(Array.isArray(product.availableColors)).toBe(true);
      expect(product.availableColors.length).toBeGreaterThan(0);
    });
  });
});
