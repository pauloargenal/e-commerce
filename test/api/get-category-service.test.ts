import { describe, it, expect, beforeEach, vi } from 'vitest';

import GetCategoryServiceInstance from '../../src/api/get-category-service';

describe('GetCategoryService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getCategories', () => {
    it('should fetch all categories successfully', async () => {
      const categories = await GetCategoryServiceInstance.getCategories();

      expect(categories).toBeDefined();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should return categories as an array of objects with required fields', async () => {
      const categories = await GetCategoryServiceInstance.getCategories();

      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);

      categories.forEach((category: any) => {
        expect(category).toHaveProperty('slug');
        expect(category).toHaveProperty('name');
        expect(typeof category.slug).toBe('string');
        expect(typeof category.name).toBe('string');
      });
    });

    it('should return consistent data on multiple calls', async () => {
      const categories1 = await GetCategoryServiceInstance.getCategories();
      const categories2 = await GetCategoryServiceInstance.getCategories();

      expect(categories1.length).toBe(categories2.length);
      expect(categories1[0].slug).toBe(categories2[0].slug);
    });

    it('should return categories with valid slugs', async () => {
      const categories = await GetCategoryServiceInstance.getCategories();

      categories.forEach((category: any) => {
        // Slugs should not be empty
        expect(category.slug.length).toBeGreaterThan(0);
        // Slugs should be lowercase and use hyphens
        expect(category.slug).toMatch(/^[a-z0-9-]+$/);
      });
    });

    it('should return categories with valid names', async () => {
      const categories = await GetCategoryServiceInstance.getCategories();

      categories.forEach((category: any) => {
        // Names should not be empty
        expect(category.name.length).toBeGreaterThan(0);
        // Names should start with a capital letter
        expect(category.name[0]).toMatch(/[A-Z]/);
      });
    });
  });
});
