import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Set React environment flag
beforeAll(() => {
  // @ts-expect-error - This is a test environment
  global.IS_REACT_ACT_ENVIRONMENT = true;

  process.env.NEXT_PUBLIC_API_BASE_URL = 'https://dummyjson.com';
});
