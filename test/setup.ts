import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Set React environment flag
beforeAll(() => {
  // @ts-expect-error - This is a test environment
  global.IS_REACT_ACT_ENVIRONMENT = true;
});
