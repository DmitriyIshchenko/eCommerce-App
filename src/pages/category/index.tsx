import { LargeTitle, makeStyles, Spinner } from '@fluentui/react-components';
import { getProducts, getProductsByCategoryId } from '../../lib/api/get-products';
import { useEffect, useState } from 'react';
import type { Category, ProductProjection, TypedMoney } from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/product-card';

const useStyles = makeStyles({
  titleContainer: {
    width: '100%',
    minHeight: '35vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '75px 56px',
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  spinner: {
    paddingBottom: '54px',
  },
});

function formatPrice(price?: TypedMoney): string {
  if (!price) return '';
  return `$${(price.centAmount / 100).toFixed(2)}`;
}

export default function CategoryPage({ category }: { category: Category | null }) {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const title = category?.name['en-US'] ?? 'Products';

  useEffect(() => {
    setLoading(true);
    const productsData = category ? getProductsByCategoryId(category.id) : getProducts();
    productsData
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.titleContainer}>
        <LargeTitle as="h1">{title}</LargeTitle>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.list}>
          {loading ? (
            <Spinner size="large" className={styles.spinner} />
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                value={product.slug?.['en-US']}
                name={product.name?.['en-US']}
                price={formatPrice(product.masterVariant.prices?.at(0)?.value)}
                image={product.masterVariant.images?.at(0)?.url}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
