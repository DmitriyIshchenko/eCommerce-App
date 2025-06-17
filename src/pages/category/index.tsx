import type { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import { ProductCard } from '../../components/product-card';
import formatPrice from '../../lib/utils/format-price';
import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/use-cart';

const useStyles = makeStyles({
  separate: {
    display: 'flex',
    '@media(max-width: 1024px)': {
      flexDirection: 'column',
    },
  },
  wrapper: {
    viewTransitionName: 'main-content',
    containerType: 'inline-size',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '50%',
    boxShadow: tokens.shadow4,
    maxHeight: '100dvh',
    position: 'sticky',
    top: 0,
    '@media(max-width: 1024px)': {
      position: 'static',
      height: '35dvh',
      flexBasis: 'auto',
    },
  },
  head: {
    display: 'grid',
    flexBasis: '50%',
    gridTemplateColumns: '1fr 1fr',
    '@media(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  tail: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    '@media(max-width: 1024px)': {
      gridTemplateColumns: '1fr 1fr',
    },
    '@media(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

function getTitle(categoryName: string, subcategoryName?: string) {
  const defaultTitle = 'Products';

  if (categoryName === 'All') {
    return defaultTitle;
  }

  const categoryTitle = categoryName;
  if (!subcategoryName) {
    return categoryTitle;
  }

  const subcategoryTitle = subcategoryName;
  return `${categoryTitle} - ${subcategoryTitle}`;
}

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

export default function CategoryPage({
  products,
  categoryName,
  subcategoryName,
}: {
  products: ProductProjection[] | null;
  categoryName: string;
  subcategoryName?: string;
}) {
  const styles = useStyles();
  const { cart, addItemToCart } = useCart();
  const [cartGoods, setCartGoods] = useState<Record<string, number>>({});

  const title = getTitle(categoryName, subcategoryName);

  useEffect(() => {
    if (cart) {
      setCartGoods(getCartGoodsMap(cart));
    }
  }, [cart]);

  const handleCartClick = async (id: string) => {
    try {
      const updatedCart = await addItemToCart(id);
      setCartGoods(getCartGoodsMap(updatedCart));
    } catch {
      console.error('Failed to add to cart');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.separate}>
        <div className={styles.title}>
          <LargeTitle style={{ padding: '0 20px' }} as="h1">
            {title}
          </LargeTitle>
        </div>
        <div className={styles.head}>
          {products
            ?.slice(0, 4)
            .map((product) => (
              <ProductCard
                id={product.id}
                key={product.id}
                onCartClick={(id) => void handleCartClick(id)}
                value={product.slug?.['en-US']}
                name={product.name?.['en-US']}
                description={product.description?.['en-US']}
                price={formatPrice(product.masterVariant.prices?.at(0)?.value)}
                discount={formatPrice(product.masterVariant.prices?.at(0)?.discounted?.value)}
                image={product.masterVariant.images?.at(0)?.url}
                cartGoods={cartGoods[product.id] ?? 0}
              />
            ))}
        </div>
      </div>
      <div className={styles.tail}>
        {products
          ?.slice(4)
          .map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              onCartClick={(id) => void handleCartClick(id)}
              value={product.slug?.['en-US']}
              name={product.name?.['en-US']}
              description={product.description?.['en-US']}
              price={formatPrice(product.masterVariant.prices?.at(0)?.value)}
              discount={formatPrice(product.masterVariant.prices?.at(0)?.discounted?.value)}
              image={product.masterVariant.images?.at(0)?.url}
              cartGoods={cartGoods[product.id] ?? 0}
            />
          ))}
      </div>
    </div>
  );
}
