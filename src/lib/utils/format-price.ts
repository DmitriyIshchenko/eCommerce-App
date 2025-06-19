import type { TypedMoney } from '@commercetools/platform-sdk';

export default function formatPrice(price?: TypedMoney): string {
  if (!price?.centAmount) return '';
  const formattedPrice = new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(price.centAmount / 100);
  return formattedPrice;
}
