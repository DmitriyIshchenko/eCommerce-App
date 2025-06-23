import { describe, expect, test } from 'vitest';
import { getSizedImageUrl, type ImageSize } from './get-sized-image-url'; // Update with the correct path

describe('getSizedImageUrl', () => {
  const testCases: { size: ImageSize; expected: string }[] = [
    { size: 'thumb', expected: 'https://example.com/image-thumb.jpg' },
    { size: 'small', expected: 'https://example.com/image-small.jpg' },
    { size: 'medium', expected: 'https://example.com/image-medium.jpg' },
    { size: 'large', expected: 'https://example.com/image-large.jpg' },
    { size: 'zoom', expected: 'https://example.com/image-zoom.jpg' },
  ];

  test.each(testCases)('should correctly handle $size size', ({ size, expected }) => {
    const url = 'https://example.com/image.jpg';
    expect(getSizedImageUrl(url, size)).toBe(expected);
  });

  test('should handle URLs without .jpg extension', () => {
    const url = 'https://example.com/image.png';
    expect(getSizedImageUrl(url, 'medium')).toBe('https://example.com/image.png');
  });

  test('should handle URLs with query parameters', () => {
    const url = 'https://example.com/image.jpg?width=800&height=600';
    expect(getSizedImageUrl(url, 'large')).toBe(
      'https://example.com/image-large.jpg?width=800&height=600',
    );
  });

  test('should return original URL when empty string is provided', () => {
    const url = '';
    expect(getSizedImageUrl(url, 'medium')).toBe('');
  });
});
