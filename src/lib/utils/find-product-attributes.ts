import type { ProductVariant } from '@commercetools/platform-sdk';

export default function findProductVariationAttributes(
  variants: ProductVariant[] | undefined,
): Record<string, Set<string>> {
  const attributes: Record<string, Set<string>> = {};

  variants?.forEach((variant) => {
    variant.attributes?.forEach((attr) => {
      if (!attributes[attr.name]) {
        attributes[attr.name] = new Set();
      }
      if (attr.name === 'material') {
        if (typeof attr.value === 'object' && attr.value !== null && 'label' in attr.value) {
          const label = (attr.value as { label: string }).label;
          if (label) attributes[attr.name].add(label);
        }
      } else if (typeof attr.value === 'string') {
        attributes[attr.name].add(attr.value);
      }
    });
  });

  return attributes;
}
