import {
  Body2,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Input,
  makeStyles,
  tokens,
  type InputOnChangeData,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { useState, type ChangeEvent } from 'react';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { MiniProductCard } from '../../components/mini-product-card';
import formatPrice from '../../lib/utils/format-price';
import { getProductsByText } from '../../lib/api/get-products';
import { getProductCategories } from '../../lib/api/get-categories';
import { Route } from '../../routes/catalog/$category.$';
import { useMatchRoute } from '@tanstack/react-router';
import type { ProductSearchSchema } from '../../lib/schemas/products-search';

const useStyles = makeStyles({
  header: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  body: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone}`,
  },
  input: {
    width: '100%',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  container: {
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
  },
});

interface SearchDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DRAWER_TITLE = 'Search';
const DRAWER_SUBTITLE = 'ALL PRODUCTS';

export default function SearchDrawer({ open, onOpenChange }: SearchDrawerProps) {
  const styles = useStyles();
  const matchRoute = useMatchRoute();
  const [value, setValue] = useState('');
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [categoriesCache, setCategoriesCache] = useState<
    Record<string, { category: string; subCategory: string }>
  >({});

  const navigateFromCategory = Route.useNavigate();
  const isCategory = matchRoute({ to: '/catalog/$category/$' });
  const navigate = isCategory && navigateFromCategory;

  const onChange = async (_ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    const searchText = data.value;
    setValue(searchText);

    if (navigate) {
      void navigate({
        search: (prev: ProductSearchSchema) => ({
          ...prev,
          q: searchText,
        }),
      });
    }

    try {
      const productResponse = await getProductsByText(searchText);
      setProducts(productResponse.body.results);

      setCategoriesCache({});

      const categoryPromises = productResponse.body.results.map(async (product) => {
        const categories = await getProductCategories(product);
        return { productId: product.id, categories };
      });

      const categoriesResults = await Promise.all(categoryPromises);

      setCategoriesCache((prev) => {
        const newCache = { ...prev };
        categoriesResults.forEach(({ productId, categories }) => {
          newCache[productId] = categories;
        });
        return newCache;
      });
    } catch {
      setProducts([]);
      setCategoriesCache({});
    }
  };

  return (
    <Drawer
      modalType="modal"
      type="overlay"
      separator
      open={open}
      onOpenChange={(_, { open }) => onOpenChange(open)}
      position="end"
    >
      <DrawerHeader className={styles.header}>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<DismissRegular />}
              onClick={() => onOpenChange(false)}
            />
          }
        >
          {DRAWER_TITLE}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.body}>
        <div>
          <Input
            className={styles.input}
            placeholder="Enter a keyword"
            appearance="underline"
            value={value}
            onChange={(ev, data) => void onChange(ev, data)}
          />
        </div>
        <div>
          {value && products.length > 0 && (
            <div>
              <div className={styles.container}>
                <Body2>{DRAWER_SUBTITLE}</Body2>
              </div>
              {products.map((product) => {
                const categories = categoriesCache[product.id] || {
                  category: 'all',
                  subCategory: 'whole',
                };

                return (
                  <MiniProductCard
                    onClick={() => onOpenChange(false)}
                    key={product.id}
                    value={product.slug?.['en-US']}
                    name={product.name?.['en-US']}
                    price={formatPrice(product.masterVariant.prices?.[0]?.value)}
                    discount={formatPrice(product.masterVariant.prices?.[0]?.discounted?.value)}
                    image={product.masterVariant.images?.[0]?.url}
                    id={product.id}
                    category={categories.category.toLowerCase().replace(/\s+/g, '-')}
                    subCategory={categories.subCategory.toLowerCase().replace(/\s+/g, '-')}
                  />
                );
              })}
            </div>
          )}
        </div>
      </DrawerBody>
    </Drawer>
  );
}
