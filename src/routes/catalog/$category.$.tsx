import {
  Body2,
  Combobox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Label,
  Option,
  Subtitle2,
  makeStyles,
  tokens,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { CheckmarkFilled, DismissFilled, DismissRegular } from '@fluentui/react-icons';
import { createFileRoute, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import CustomBreadcrumb from '../../components/ui/breadcrumb';
import CustomButton from '../../components/ui/buttons/custom';
import FilterButton from '../../components/ui/buttons/filter';
import RangeInputField from '../../components/ui/input-field/range';
import Pagination from '../../components/ui/pagination';
import SingleSwatchPicker from '../../components/ui/swatch-picker/single';
import SingleImageSwatchPicker from '../../components/ui/swatch-picker/single-image';
import DismissWithInteractionTags from '../../components/ui/tags/dismiss-with-interaction';
import StyledTooltip from '../../components/ui/tooltips/styled';
import { getCategoryBySlug } from '../../lib/api/get-categories';
import { getCategoryProductsFacets, getProductsBySearch } from '../../lib/api/get-products';
import { sortOptions } from '../../lib/constants/sort-options';
import { type ProductSearchSchema, productSearchSchema } from '../../lib/schemas/products-search';
import type { Link } from '../../lib/types';
import debounce from '../../lib/utils/debounce';
import { isStringifyEqual } from '../../lib/utils/isStringifyEqual';
import { kebabToCapitalizedSpacedString } from '../../lib/utils/kebab-to-capitalized-spaced-string';
import CategoryPage from '../../pages/category';

type Filter = ProductSearchSchema;

const LIMIT_PER_PAGE = 8;

export const Route = createFileRoute('/catalog/$category/$')({
  component: RouteComponent,
  validateSearch: productSearchSchema,
  loaderDeps: ({ search: { q, colors, materials, maxPrice, minPrice, sort, page } }) => ({
    q,
    colors,
    materials,
    minPrice,
    maxPrice,
    sort,
    page,
  }),
  loader: async ({
    deps: { q, colors, materials, maxPrice, minPrice, sort, page },
    params: { category, _splat },
    context: { categories },
  }) => {
    const categorySlug = _splat && _splat.length > 0 ? _splat : category;
    const categoryResponse = await getCategoryBySlug(categorySlug);
    const categoryId = categoryResponse ? categoryResponse.id : undefined;
    const offset = ((page ?? 1) - 1) * LIMIT_PER_PAGE;

    const searchedProducts = (
      await getProductsBySearch(
        categoryId,
        q,
        colors,
        materials,
        minPrice,
        maxPrice,
        sort,
        offset,
        LIMIT_PER_PAGE,
      )
    ).body;

    const { total, results } = searchedProducts;

    const totalPages = Math.ceil((searchedProducts.total ?? 0) / searchedProducts.limit);

    const {
      categoryColors,
      categoryMaterials,
      maxCategoryPrice,
      minCategoryPrice,
      total: categoryTotal,
    } = await getCategoryProductsFacets(categoryId);

    return {
      results,
      minCategoryPrice,
      maxCategoryPrice,
      categoryColors,
      categoryMaterials,
      categories,
      totalPages,
      total,
      categoryTotal,
      categoryId,
    };
  },
});

function RouteComponent() {
  const [open, setOpen] = useState(false);

  const {
    results,
    total,
    totalPages,
    maxCategoryPrice,
    minCategoryPrice,
    categoryColors,
    categoryMaterials,
    categoryTotal,
    categoryId,
  } = Route.useLoaderData();

  const [filteredTotal, setFilteredTotal] = useState(total);

  const { category, _splat } = Route.useParams();

  const search = Route.useSearch();

  const productsSearchFilter = productSearchSchema.parse(search);
  const initialFilter: Filter = {
    ...productsSearchFilter,
  };

  const [comboInput, setComboInput] = useState(
    sortOptions.find((v) => v.value === initialFilter.sort)?.option ?? '',
  );

  const [filter, setFilter] = useState<Filter>(initialFilter);

  useEffect(() => {
    const getUpdatedTotal = async () => {
      const ft = (
        await getCategoryProductsFacets(
          categoryId,
          undefined,
          filter.colors,
          filter.materials,
          filter.minPrice,
          filter.maxPrice,
        )
      ).total;
      setFilteredTotal(ft);
    };
    const debouncedEffect = debounce(getUpdatedTotal, 500);

    try {
      debouncedEffect();
    } catch (e) {
      console.error(e);
    }
  }, [filter, categoryId]);

  useEffect(() => {
    if (search.q !== undefined) {
      setFilter((prev) => ({ ...prev, q: search.q }));
    }
  }, [search.q]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
    }));
  }, [category, _splat]);

  const navigate = Route.useNavigate();

  const { pathname } = useLocation();

  const categoryName = kebabToCapitalizedSpacedString(category);
  const subcategoryName = _splat ? kebabToCapitalizedSpacedString(_splat) : undefined;

  const pathnames = pathname.split('/').slice(1);
  const links: Link[] = pathnames.reduce((a: Link[], v) => {
    const current: Link = {
      text: kebabToCapitalizedSpacedString(v),
      to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
    };
    return [...a, current];
  }, []);

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

  const handleSortChange = (sort?: string) => {
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
      setFilter((prev) => ({
        ...prev,
        colors: filter.colors?.filter((v) => v !== value),
      }));
    }
    if (name === 'materials' && typeof value === 'string') {
      setFilter((prev) => ({
        ...prev,
        materials: filter.materials?.filter((v) => v !== value),
      }));
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
    setOpen(false);
    document.body.style.overflowY = '';

    void navigate({
      to: '/catalog/$category/$',
      params: {
        category,
        _splat,
      },
      search: { ...search, page: 1 },
    });
  };

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttribute = useRestoreFocusSource();

  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setComboInput(ev.target.value);
  };

  return (
    <main style={{ viewTransitionName: 'warp-content' }}>
      <CustomBreadcrumb links={links} />
      <div>
        <CategoryPage
          products={results}
          categoryName={categoryName}
          subcategoryName={subcategoryName}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 30 }}>
        <Pagination total={totalPages} searchParamName="page" />
      </div>
      <div style={{ position: 'fixed', top: 110, right: 20 }}>
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
                      {`${filteredTotal} of `}
                      {categoryTotal} products
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
                  <Combobox
                    style={{ borderRadius: 0 }}
                    placeholder="Select a sort"
                    value={comboInput}
                    clearable
                    freeform
                    selectedOptions={filter.sort ? [filter.sort] : []}
                    size="large"
                    onOptionSelect={(_, d) => {
                      handleSortChange(d.optionValue);
                      setComboInput(
                        sortOptions.find((v) => v.value === d.optionValue)?.option ?? '',
                      );
                    }}
                    onInput={onInput}
                  >
                    {sortOptions.map((v) => (
                      <Option
                        text={v.option}
                        key={v.value}
                        value={v.value}
                        style={{
                          minHeight: 38,
                          paddingLeft: 15,
                          borderRadius: 0,
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexGrow: 1,
                            paddingRight: 5,
                            paddingLeft: 5,
                          }}
                        >
                          {v.option} {v.icon}
                        </span>
                      </Option>
                    ))}
                  </Combobox>
                </div>
                <Divider />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div style={{ padding: '12px 20px 0' }}>
                    <Subtitle2>FILTER</Subtitle2>
                  </div>
                  <div style={{ height: 53, overflowY: 'auto', padding: '0 20px' }}>
                    <DismissWithInteractionTags tags={filter} onDismiss={handleDismissFilter} />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      padding: '12px 20px',
                    }}
                  >
                    <CustomButton
                      onClick={() => {
                        applyFilter();
                      }}
                      shape="circular"
                      size="medium"
                      icon={<CheckmarkFilled />}
                      disabled={filteredTotal === 0 || isStringifyEqual(initialFilter, filter)}
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
