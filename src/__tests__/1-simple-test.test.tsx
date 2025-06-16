import { describe, expect, test } from 'vitest';
import { countSum } from './example-functions';

describe('simple test', () => {
  const a = 1;
  const c = 3;
  test('must correctly add 1 and 2', () => {
    expect(countSum(a, 2)).toBe(c);
  });
});
