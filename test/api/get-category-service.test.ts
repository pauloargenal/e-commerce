import { describe, it, expect, beforeEach, vi } from 'vitest';

import GetCategoryServiceInstance from '../../src/api/get-category-service';

describe('GetCategoryService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getCategories', () => {
    it('should fetch all categories successfully', async () => {
      const response = await GetCategoryServiceInstance.getCategories();

      expect(response).toBeDefined();
      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('should return categories as an array of objects with required fields', async () => {
      const response = await GetCategoryServiceInstance.getCategories();
      const categories = await response.json();

      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);

      categories.forEach((category: any) => {
        expect(category).toHaveProperty('slug');
        expect(category).toHaveProperty('name');
        expect(typeof category.slug).toBe('string');
        expect(typeof category.name).toBe('string');
      });
    });

    it('should have correct content-type header', async () => {
      const response = await GetCategoryServiceInstance.getCategories();

      expect(response.headers.get('content-type')).toContain('application/json');
    });

    it('should return consistent data on multiple calls', async () => {
      const response1 = await GetCategoryServiceInstance.getCategories();
      const response2 = await GetCategoryServiceInstance.getCategories();

      const data1 = await response1.json();
      const data2 = await response2.json();

      expect(data1.length).toBe(data2.length);
      expect(data1[0].slug).toBe(data2[0].slug);
    });

    it('should return categories with valid slugs', async () => {
      const response = await GetCategoryServiceInstance.getCategories();
      const categories = await response.json();

      categories.forEach((category: any) => {
        // Slugs should not be empty
        expect(category.slug.length).toBeGreaterThan(0);
        // Slugs should be lowercase and use hyphens
        expect(category.slug).toMatch(/^[a-z0-9-]+$/);
      });
    });

    it('should return categories with valid names', async () => {
      const response = await GetCategoryServiceInstance.getCategories();
      const categories = await response.json();

      categories.forEach((category: any) => {
        // Names should not be empty
        expect(category.name.length).toBeGreaterThan(0);
        // Names should start with a capital letter
        expect(category.name[0]).toMatch(/[A-Z]/);
      });
    });
  });
});
