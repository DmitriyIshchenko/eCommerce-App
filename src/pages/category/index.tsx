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
  if (!price?.centAmount) return '';
  const formattedPrice = new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(price.centAmount / 100);
  return formattedPrice;
}

function getTitle(category: Category, subcategory?: Category) {
  const defaultTitle = 'Products';

  if (!category) {
    return defaultTitle;
  }

  const categoryTitle = category.name['en-US'];
  if (!subcategory) {
    return categoryTitle;
  }

  const subcategoryTitle = subcategory.name['en-US'];
  return categoryTitle + ' - ' + subcategoryTitle;
}

export default function CategoryPage({
  products,
  category,
  subcategory,
}: {
  products: ProductProjection[] | null;
  category: Category;
  subcategory?: Category;
}) {
  const styles = useStyles();
  const title = getTitle(category, subcategory);

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
