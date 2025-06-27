export function getSumPrice(price1: string, price2: string) {
  const toNumber = (price: string) => parseFloat(price.replace(/[$,]/g, ''));

  const sum = (toNumber(price1) || 0) + (toNumber(price2) || 0);

  return `$${sum.toFixed(2)}`;
}
