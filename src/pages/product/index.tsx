import type { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { ProductInfo } from '../../components/product-info';
import formatPrice from '../../lib/utils/format-price';
import CustomBreadcrumb from '../../components/ui/breadcrumb';
import { tokens } from '@fluentui/react-components';
import type { Link } from '../../lib/types';
import { kebabToCapitalizedSpacedString } from '../../lib/utils/kebab-to-capitalized-spaced-string';
import { useLocation } from '@tanstack/react-router';
import { keyLabelSchema } from '../../lib/schemas/user';
import { useCart } from '../../hooks/use-cart';
import { useEffect, useState } from 'react';

export default function ProductPage({
  product,
  inCart = 0,
}: {
  product: ProductProjection;
  inCart?: number;
}) {
  const { cart, addItemToCart, deleteItemByProductId } = useCart();
  const [cartGoods, setCartGoods] = useState<Record<string, number>>({});
  const [, setLoading] = useState(false);

  const images =
    product?.masterVariant.images?.map((img) => ({
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

  function getCartGoodsMap(cart: Cart) {
    const goodsMap: Record<string, number> = {};
    if (cart.lineItems) {
      for (const item of cart.lineItems) {
        if (item.productId && item.quantity) {
          goodsMap[item.productId] = item.quantity;
        }
      }
    }
    return goodsMap;
  }

  useEffect(() => {
    if (cart) {
      setCartGoods(getCartGoodsMap(cart));
    }
  }, [cart]);

  const findVariantId = (
    size: string | null,
    color: string | null,
    material: string | null,
  ): number => {
    return (
      product.variants.find((v) => {
        const sizeMatch = !size || v.attributes?.some((a) => a.name === 'size' && a.value === size);
        const colorMatch =
          !color || v.attributes?.some((a) => a.name === 'color' && a.value === color);
        const materialMatch =
          !material ||
          v.attributes?.some((a) => {
            if (a.name !== 'material') return false;
            const value = keyLabelSchema.safeParse(a.value);
            return value.success && value.data.key === material;
          });

        return sizeMatch && colorMatch && materialMatch;
      })?.id ?? 1
    );
  };

  const handleCartClick = async (
    id: string,
    quantity: number,
    size: string | null,
    color: string | null,
    material: string | null,
  ) => {
    setLoading(true);
    try {
      const variantId = findVariantId(size, color, material);

      if (quantity === 0) {
        await deleteItemByProductId(id, variantId);
      } else {
        await addItemToCart(id, variantId, quantity);
      }
    } catch (error) {
      console.error('Failed to update cart', error);
    } finally {
      setLoading(false);
    }
  };

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
            inCart={cartGoods[product.id] ?? inCart}
            variants={product.variants}
            onCartClick={handleCartClick}
          />
        )}
      </main>
    </>
  );
}
