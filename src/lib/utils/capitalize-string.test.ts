import { describe, expect, test } from 'vitest';
import { capitalizeString } from './capitalizeString'; // Update with the correct path

describe('capitalizeString', () => {
  test('should capitalize the first letter and lowercase the rest for a normal string', () => {
    expect(capitalizeString('hello')).toBe('Hello');
    expect(capitalizeString('WORLD')).toBe('World');
    expect(capitalizeString('tEsT')).toBe('Test');
  });

  test('should handle single-character strings', () => {
    expect(capitalizeString('a')).toBe('A');
    expect(capitalizeString('Z')).toBe('Z');
    expect(capitalizeString('1')).toBe('1');
  });
});
