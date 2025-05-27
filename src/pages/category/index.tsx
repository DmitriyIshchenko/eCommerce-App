import { LargeTitle, makeStyles } from '@fluentui/react-components';
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

export default function CategoryPage({
  products,
  category,
}: {
  products: ProductProjection[] | null;
  category: Category;
}) {
  const styles = useStyles();

  const title = category ? category.name['en-US'] : 'Products';

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.titleContainer}>
        <LargeTitle as="h1">{title}</LargeTitle>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.list}>
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              value={product.slug?.['en-US']}
              name={product.name?.['en-US']}
              price={formatPrice(product.masterVariant.prices?.at(0)?.value)}
              image={product.masterVariant.images?.at(0)?.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
