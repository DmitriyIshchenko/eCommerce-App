import { createFileRoute, useLocation } from '@tanstack/react-router';
import { productSearchSchema, type ProductSearchSchema } from '../../lib/schemas/products-search';
import { getCategoryProductsFacets, getProductsBySearch } from '../../lib/api/get-products';
import { getCategoryBySlug } from '../../lib/api/get-categories';
import { formatString } from '../../lib/utils/format-string';
import {
  Body2,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Label,
  makeStyles,
  Select,
  Subtitle2,
  tokens,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import CategoryPage from '../../pages/category';
import FilterButton from '../../components/ui/buttons/filter';
import { useEffect, useState } from 'react';
import StyledTooltip from '../../components/ui/tooltips/styled';
import CustomButton from '../../components/ui/buttons/custom';
import { CheckmarkFilled, DismissFilled, DismissRegular } from '@fluentui/react-icons';
import DismissWithInteractionTags from '../../components/ui/tags/dismiss-with-interaction';
import RangeInputField from '../../components/ui/input-field/range';
import SingleSwatchPicker from '../../components/ui/swatch-picker/single';
import SingleImageSwatchPicker from '../../components/ui/swatch-picker/single-image';
import Pagination from '../../components/ui/pagination';
import { PRODUCTS_LIMIT } from '../../lib/constants';
import { isStringifyEqual } from '../../lib/utils/isStringifyEqual';
import { sortOptions } from '../../lib/sort-options';

type Filter = ProductSearchSchema;

const useStyles = makeStyles({
  breadContainer: {
    width: '100%',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  treeItem: {
    '& .fui-Radio__indicator::after': {
      backgroundColor: tokens.colorPaletteRoyalBlueForeground2,
    },
  },
  filter: {
    position: 'fixed',
    insetBlockStart: 'anchor(end)',
    positionAnchor: '--headerAnchor',
    insetInlineStart: 'anchor(self-end)',
    marginLeft: '-60px',
    marginTop: '23px',
    zIndex: 99,
  },
});

export const Route = createFileRoute('/catalog/$category/$')({
  component: RouteComponent,
  validateSearch: productSearchSchema,
  loaderDeps: ({ search: { page, q, colors, materials, maxPrice, minPrice, sort } }) => ({
    page,
    q,
    colors,
    materials,
    minPrice,
    maxPrice,
    sort,
  }),
  loader: async ({
    deps: { page, q, colors, materials, maxPrice, minPrice, sort },
    params: { category, _splat },
    context: { categories },
  }) => {
    try {
      const categorySlug = _splat && _splat.length > 0 ? _splat : category;
      const categoryResponse = await getCategoryBySlug(categorySlug);
      const categoryId = categoryResponse ? categoryResponse.id : undefined;

      const filteredProductsResponse = await getProductsBySearch(
        categoryId,
        page,
        q,
        colors,
        materials,
        minPrice,
        maxPrice,
        sort,
      );

      const filteredProducts = filteredProductsResponse.body.results;
      const filteredProductsCount = filteredProductsResponse.body.total ?? 0;

      const allProductsCount = (await getProductsBySearch(categoryId)).body.total;

      const {
        categoryColors,
        categoryMaterials,
        maxCategoryPrice,
        minCategoryPrice,
        total: categoryTotal,
      } = await getCategoryProductsFacets(categoryId);

      const resultResponse = {
        filteredProducts,
        filteredProductsCount,
        allProductsCount,
        categories,
        categoryColors,
        categoryMaterials,
        minCategoryPrice,
        maxCategoryPrice,
        categoryTotal,
        categoryId,
      };
      return resultResponse;
    } catch {
      return {
        filteredProducts: [],
        filteredProductsCount: 0,
        allProductsCount: 0,
        categories: [],
        categoryColors: [],
        categoryMaterials: [],
        minCategoryPrice: 0,
        maxCategoryPrice: 0,
        categoryTotal: 0,
        categoryId: undefined,
      };
    }
  },
});

function RouteComponent() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  const {
    filteredProducts,
    filteredProductsCount,
    allProductsCount,
    categoryColors,
    categoryMaterials,
    minCategoryPrice,
    maxCategoryPrice,
  } = Route.useLoaderData();

  const { category, _splat } = Route.useParams();

  const totalPages = Math.ceil(filteredProductsCount / PRODUCTS_LIMIT);

  const search = Route.useSearch();

  const productsSearchFilter = productSearchSchema.parse(search);
  const initialFilter: Filter = {
    ...productsSearchFilter,
  };

  const [filter, setFilter] = useState<Filter>(initialFilter);

  useEffect(() => {
    if (search.q !== undefined) {
      setFilter((prev) => ({ ...prev, q: search.q }));
    }
  }, [search.q]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      sort: undefined,
    }));
  }, [category, _splat]);

  const navigate = Route.useNavigate();

  const { pathname } = useLocation();

  const categoryName = formatString(category);
  const subcategoryName = _splat ? formatString(_splat) : undefined;

  const handleMinMaxChange = (minPrice: number, maxPrice: number) => {
    setFilter({ ...filter, minPrice, maxPrice });
  };

  const handleColorChange = (color: string) => {
    const i = filter.colors?.findIndex((v) => v === color);
    const newColor =
      typeof i === 'number' && i !== -1
        ? filter.colors?.toSpliced(i, 1)
        : [...(filter?.colors ?? []), color];
    setFilter({ ...filter, colors: newColor });
  };

  const handleMaterialChange = (material: string) => {
    const i = filter.materials?.findIndex((v) => v === material);
    const newMaterial =
      typeof i === 'number' && i !== -1
        ? filter.materials?.toSpliced(i, 1)
        : [...(filter?.materials ?? []), material];
    setFilter({ ...filter, materials: newMaterial });
  };

  const handleSortChange = (sort: string) => {
    if (!sort) {
      setFilter((prev) => ({ ...prev, sort: undefined }));

      void navigate({
        search: (prev: ProductSearchSchema) => ({
          ...prev,
          sort: undefined,
        }),
      });

      return;
    }

    setFilter({ ...filter, sort });

    void navigate({
      search: (prev: ProductSearchSchema) => ({
        ...prev,
        sort,
      }),
    });
  };

  const handleDismissFilter = (name: string, value: string | number) => {
    if (name === 'colors' && typeof value === 'string') {
      setFilter((prev) => ({ ...prev, colors: filter.colors?.filter((v) => v !== value) }));
    }
    if (name === 'materials' && typeof value === 'string') {
      setFilter((prev) => ({ ...prev, materials: filter.materials?.filter((v) => v !== value) }));
    }
    if (name === 'price') {
      setFilter((prev) => ({
        ...prev,
        minPrice: undefined,
        maxPrice: undefined,
      }));
    }
  };

  const applyFilter = () => {
    const { ...search } = filter;

    void navigate({
      to: '/catalog/$category/$',
      params: {
        category,
        _splat,
      },
      search: { ...search, page: 1 },
    });
  };

  const isFiltered = () => {
    return Object.entries(search).some(
      ([key, value]) => value !== undefined && value !== '' && key !== 'page' && key !== 'sort',
    );
  };

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttribute = useRestoreFocusSource();

  return (
    <main>
      <CategoryPage
        products={filteredProducts}
        categoryName={categoryName}
        subcategoryName={subcategoryName}
      />
      <div className={styles.paginationContainer}>
        <Pagination total={totalPages} searchParamName="page" />
      </div>
      <div className={styles.filter} style={{ position: 'fixed', top: 110, right: 20 }}>
        {pathname !== '/catalog' && (
          <>
            <FilterButton
              onClick={() => {
                setOpen(true);
                document.body.style.overflowY = 'clip';
              }}
              {...restoreFocusTargetAttributes}
            />
            <Drawer
              separator
              open={open}
              position="end"
              {...restoreFocusSourceAttribute}
              onOpenChange={(_, { open }) => {
                setOpen(open);
                document.body.style.overflowY = open ? 'clip' : '';
              }}
              style={{ padding: '5px 0' }}
            >
              <DrawerHeader style={{ padding: 0, gap: 0 }}>
                <DrawerHeaderTitle
                  style={{ padding: '8px 20px', height: 54 }}
                  action={
                    <StyledTooltip contentChildren="Close" positioning={'before'}>
                      <div>
                        <CustomButton
                          appearance="subtle"
                          aria-label="Close"
                          shape="circular"
                          icon={<DismissRegular />}
                          onClick={() => {
                            setOpen(false);
                            document.body.style.overflowY = '';
                          }}
                        />
                      </div>
                    </StyledTooltip>
                  }
                >
                  Refine results
                </DrawerHeaderTitle>

                <div>
                  <Divider />
                  <div style={{ padding: '16px 20px' }}>
                    <Body2>
                      {isFiltered() && `${filteredProductsCount} of `}
                      {allProductsCount} products
                    </Body2>
                  </div>
                  <Divider />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                    padding: '12px 20px',
                    scrollbarGutter: 'stable',
                    overflowY: 'auto',
                  }}
                >
                  <Subtitle2>SORT BY:</Subtitle2>
                  <div>
                    <Select
                      size="large"
                      value={filter.sort}
                      onChange={(_, data) => handleSortChange(data.value)}
                    >
                      {sortOptions.map((v) => (
                        <option key={v.option} value={v.value}>
                          {v.option}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <Divider />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div style={{ padding: '12px 20px 0' }}>
                    <Subtitle2>FILTER</Subtitle2>
                  </div>

                  <div style={{ maxHeight: 53, overflowY: 'auto', padding: '0 20px' }}>
                    <DismissWithInteractionTags tags={filter} onDismiss={handleDismissFilter} />
                  </div>

                  <div style={{ display: 'flex', gap: '20px', padding: '5px 20px 12px' }}>
                    <CustomButton
                      onClick={() => {
                        applyFilter();
                      }}
                      shape="circular"
                      size="medium"
                      icon={<CheckmarkFilled />}
                      disabled={
                        filteredProductsCount === 0 || isStringifyEqual(initialFilter, filter)
                      }
                    >
                      Apply
                    </CustomButton>
                    <CustomButton
                      onClick={() => {
                        setFilter({});
                      }}
                      shape="circular"
                      size="medium"
                      appearance="inverted"
                      icon={<DismissFilled />}
                      disabled={!Object.keys(filter).length}
                    >
                      Reset
                    </CustomButton>
                  </div>
                </div>
              </DrawerHeader>

              <DrawerBody
                style={{
                  padding: '10px 20px',
                  scrollbarGutter: 'stable',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <div>
                  <RangeInputField
                    onChange={handleMinMaxChange}
                    prefix="$"
                    min={minCategoryPrice}
                    max={maxCategoryPrice}
                    values={[
                      filter.minPrice ?? minCategoryPrice,
                      filter.maxPrice ?? maxCategoryPrice,
                    ]}
                  />
                </div>

                <div>
                  <div>
                    <Label>Colors</Label>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 6.7,
                      flexWrap: 'wrap',
                      minHeight: 72,
                      marginTop: 5,
                    }}
                  >
                    {categoryColors.map((v) => (
                      <SingleSwatchPicker
                        value={filter.colors?.find((c) => c === v.value)}
                        color={v}
                        key={v.value}
                        onChange={handleColorChange}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div>
                    <Label>Materials</Label>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      width: '100%',
                      marginTop: 5,
                    }}
                  >
                    {categoryMaterials.map((v) => (
                      <SingleImageSwatchPicker
                        key={v.value}
                        value={filter.materials?.find((m) => m === v.value)}
                        image={v}
                        onChange={handleMaterialChange}
                        ariaLabel={v.label}
                      />
                    ))}
                  </div>
                </div>
              </DrawerBody>
            </Drawer>
          </>
        )}
      </div>
    </main>
  );
}
