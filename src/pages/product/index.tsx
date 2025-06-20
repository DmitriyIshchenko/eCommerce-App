import type { ProductProjection } from '@commercetools/platform-sdk';
import { ProductInfo } from '../../components/product-info';
import { keyLabelSchema } from '../../lib/schemas';
import formatPrice from '../../lib/utils/format-price';

export default function ProductPage({
  product,
  inCart = 0,
}: {
  product: ProductProjection;
  inCart?: number;
}) {
  const images =
    product.masterVariant.images?.map((img) => ({
      url: img.url,
    })) ?? [];

  const sizes = [
    ...new Set(
      product.variants
        .map((v) => {
          const s = v.attributes?.find((v) => v.name === 'size');
          return typeof s?.value === 'string' ? s.value : '';
        })
        .filter((v) => v !== ''),
    ),
  ];

  const colors = [
    ...new Set(
      product.variants
        .map((v) => {
          const c = v.attributes?.find((v) => v.name === 'color');
          return typeof c?.value === 'string' ? c.value : '';
        })
        .filter((v) => v !== ''),
    ),
  ];

  const materials = [
    ...new Set(
      product.variants
        .map((v) => {
          const m = v.attributes?.find((v) => v.name === 'material');
          if (m === undefined) return '';
          const value = keyLabelSchema.parse(m?.value);

          return value.key;
        })
        .filter((v) => v !== ''),
    ),
  ];

  return (
    <>
      {product && (
        <ProductInfo
          id={product.id}
          key={product.id}
          name={product.name?.['en-US']}
          description={product.description?.['en-US']}
          price={formatPrice(product.masterVariant.prices?.[0]?.value)}
          discount={formatPrice(product.masterVariant.prices?.[0]?.discounted?.value)}
          image={product.masterVariant.images?.[0]?.url}
          images={images}
          sizes={sizes}
          materials={materials}
          colors={colors}
          inCart={inCart} // общее количество из контекста корзины по id
          variants={product.variants}
        />
      )}
    </>
  );
}
