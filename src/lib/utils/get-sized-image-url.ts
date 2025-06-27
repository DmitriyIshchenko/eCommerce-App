export type ImageSize = 'thumb' | 'small' | 'medium' | 'large' | 'zoom';

export function getSizedImageUrl(url: string, size: ImageSize) {
  return url.replace('.jpg', `-${size}.jpg`);
}
