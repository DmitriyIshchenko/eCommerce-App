import type { ProductProjection } from '@commercetools/platform-sdk';
import { tokens } from '@fluentui/react-components';
import { useLocation } from '@tanstack/react-router';
import { ProductInfo } from '../../components/product-info';
import CustomBreadcrumb from '../../components/ui/breadcrumb';
import { keyLabelSchema } from '../../lib/schemas';
import type { Link } from '../../lib/types';
import formatPrice from '../../lib/utils/format-price';
import { kebabToCapitalizedSpacedString } from '../../lib/utils/kebab-to-capitalized-spaced-string';

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

  const links: Link[] = useLocation()
    .pathname.split('/')
    .slice(1)
    .filter((v) => v !== 'whole')
    .reduce((a: Link[], v, i, arr) => {
      const text =
        i === arr.length - 1 ? product.name?.['en-US'] : kebabToCapitalizedSpacedString(v);

      const current: Link = {
        text,
        to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
      };
      return [...a, current];
    }, []);

  return (
    <>
      <div
        style={{
          padding: 20,
          borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
          borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
        }}
      >
        <CustomBreadcrumb links={links} truncate={10} />
      </div>
      <main>
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
      </main>
    </>
  );
}
