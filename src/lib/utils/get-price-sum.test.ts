import { describe, expect, test } from 'vitest';
import { getSumPrice } from './get-price-sum'; // Update with the correct path

describe('getSumPrice', () => {
  test('should sum two valid currency strings', () => {
    expect(getSumPrice('$12.34', '$5.67')).toBe('$18.01');
    expect(getSumPrice('$1.99', '$0.01')).toBe('$2.00');
    expect(getSumPrice('$1000', '$500.50')).toBe('$1500.50');
  });
});
