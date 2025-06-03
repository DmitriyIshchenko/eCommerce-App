import { LargeTitle, makeStyles } from '@fluentui/react-components';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/product-card';
import formatPrice from '../../lib/utils/format-price';

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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
  },
  spinner: {
    paddingBottom: '54px',
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
  return categoryTitle + ' - ' + subcategoryTitle;
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
  const title = getTitle(categoryName, subcategoryName);

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.titleContainer}>
        <LargeTitle align="center" as="h1">
          {title}
        </LargeTitle>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.list}>
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              value={product.slug?.['en-US']}
              name={product.name?.['en-US']}
              description={product.description?.['en-US']}
              price={formatPrice(product.masterVariant.prices?.at(0)?.value)}
              discount={formatPrice(product.masterVariant.prices?.at(0)?.discounted?.value)}
              image={product.masterVariant.images?.at(0)?.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
