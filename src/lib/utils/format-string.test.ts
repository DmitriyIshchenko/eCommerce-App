import { describe, expect, test } from 'vitest';
import { formatString } from './format-string'; // Update with the correct path

describe('formatString', () => {
  test('should handle empty string', () => {
    expect(formatString('')).toBe('');
  });

  test('should convert single hyphenated word', () => {
    expect(formatString('hello-world')).toBe('Hello World');
    expect(formatString('foo-bar')).toBe('Foo Bar');
  });

  test('should handle multiple hyphenated words', () => {
    expect(formatString('hello-world-how-are-you')).toBe('Hello World How Are You');
    expect(formatString('this-is-a-test-string')).toBe('This Is A Test String');
  });
});
