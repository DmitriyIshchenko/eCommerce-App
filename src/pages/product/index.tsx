import type { ProductProjection } from '@commercetools/platform-sdk';
import { ProductInfo } from '../../components/product-info';
import formatPrice from '../../lib/utils/format-price';

export default function ProductPage(props: { product: ProductProjection } | null) {
  const images =
    props?.product?.masterVariant.images?.map((img) => ({
      url: img.url,
    })) ?? [];

  return (
    <main>
      {props?.product && (
        <ProductInfo
          id={props.product.id}
          key={props.product.id}
          value={props.product.slug?.['en-US']}
          name={props.product.name?.['en-US']}
          description={props.product.description?.['en-US']}
          price={formatPrice(props.product.masterVariant.prices?.[0]?.value)}
          discount={formatPrice(props.product.masterVariant.prices?.[0]?.discounted?.value)}
          image={props.product.masterVariant.images?.[0]?.url}
          images={images}
          variants={props.product.variants}
        />
      )}
    </main>
  );
}
