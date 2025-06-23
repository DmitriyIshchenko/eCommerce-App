import { describe, expect, test } from 'vitest';
import formatPrice from './format-price';
import type { TypedMoney } from '@commercetools/platform-sdk';

describe('formatPrice', () => {
  test('should format USD currency correctly', () => {
    const usdPrice: TypedMoney = {
      centAmount: 12345,
      currencyCode: 'USD',
      fractionDigits: 2,
      type: 'centPrecision',
    };
    expect(formatPrice(usdPrice)).toBe('$123.45');
  });

  test('should handle large amounts correctly', () => {
    const largePrice: TypedMoney = {
      centAmount: 123456789,
      currencyCode: 'USD',
      fractionDigits: 2,
      type: 'centPrecision',
    };
    expect(formatPrice(largePrice)).toBe('$1,234,567.89');
  });
});
