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
import { getCategoryById } from '../../lib/api/get-categories';

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
  const [value, setValue] = useState('');
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [categoriesCache, setCategoriesCache] = useState<
    Record<string, { category: string; subCategory: string }>
  >({});

  const onChange = async (_ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    const searchText = data.value;
    setValue(searchText);

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

  const getProductCategories = async (product: ProductProjection) => {
    try {
      const mainCategoryId = product.categories?.[0]?.id;
      const mainCategory = mainCategoryId ? await getCategoryById(mainCategoryId) : null;

      const subCategoryId = product.categories?.[1]?.id;
      const subCategory = subCategoryId ? await getCategoryById(subCategoryId) : null;

      return {
        category: mainCategory?.slug?.['en-US'] ?? 'all',
        subCategory: subCategory?.slug?.['en-US'] ?? 'whole',
      };
    } catch {
      return {
        category: 'all',
        subCategory: 'whole',
      };
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
