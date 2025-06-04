import { createFileRoute, useLocation } from '@tanstack/react-router';
import { productSearchSchema, type ProductSearchSchema } from '../../lib/schemas/products-search';
import { getProductsBySearch } from '../../lib/api/get-products';
import { getCategoryBySlug } from '../../lib/api/get-categories';
import type { Link } from '../../lib/types';
import { formatString } from '../../lib/utils/format-string';
import CustomBreadcrumb from '../../components/ui/breadcrumb';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Label,
  makeStyles,
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
import canvasLqip from '../../assets/images/material-canvas-lqip.webp';
import canvas from '../../assets/images/material-canvas.png';
import gicleeLqip from '../../assets/images/material-giclee-lqip.webp';
import giclee from '../../assets/images/material-giclee.webp';
import photoragLqip from '../../assets/images/material-photorag-lqip.webp';
import photorag from '../../assets/images/material-photorag.webp';

const DRAWER_TITLE = 'Filters';
const DRAWER_SUBTITLE_FOR_COLORS = 'Colors';
const DRAWER_SUBTITLE_FOR_MATERIALS = 'Materials';
const APPLY_BUTTON_TEXT = 'Apply';
const RESET_BUTTON_TEXT = 'Reset';

type Filter = ProductSearchSchema;

const useStyles = makeStyles({
  breadContainer: {
    width: '100%',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  treeItem: {
    '& .fui-Radio__indicator::after': {
      backgroundColor: tokens.colorPaletteRoyalBlueForeground2,
    },
  },
});

const colors = [
  { color: '#F9F9F9', value: 'Original', 'aria-label': 'Original' },
  { color: '#F9F9F9', value: 'White', 'aria-label': 'White' },
  { color: '#FFFFF0', value: 'Ivory', 'aria-label': 'Ivory' },
  { color: '#E3DAC9', value: 'Natural', 'aria-label': 'Natural' },
  { color: '#4B4B5A', value: 'Raven', 'aria-label': 'Raven' },
  { color: '#000080', value: 'Navy', 'aria-label': 'Navy' },
  { color: '#2C2C2C', value: 'Black', 'aria-label': 'Black' },
];

const images = [
  {
    swatchSrc: canvasLqip,
    value: 'canvas',
    label: 'canvas',
    fullImageSrc: canvas,
  },
  {
    swatchSrc: gicleeLqip,
    value: 'giclee',
    label: 'giclee',
    fullImageSrc: giclee,
  },
  {
    swatchSrc: photoragLqip,
    value: 'photo-rag',
    label: 'photo-rag',
    fullImageSrc: photorag,
  },
];

export const Route = createFileRoute('/catalog/$category/$')({
  component: RouteComponent,
  validateSearch: productSearchSchema,
  loaderDeps: ({ search: { q, color, material, maxPrice, minPrice } }) => ({
    q,
    color,
    material,
    minPrice,
    maxPrice,
  }),
  loader: async ({
    deps: { q, color, material, maxPrice, minPrice },
    params: { category, _splat },
    context: { categories },
  }) => {
    const categorySlug = _splat && _splat.length > 0 ? _splat : category;
    const categoryResponse = await getCategoryBySlug(categorySlug);
    const categoryId = categoryResponse ? categoryResponse.id : undefined;

    const filteredProducts = (
      await getProductsBySearch(q, color, material, minPrice, maxPrice, categoryId)
    ).body.results;

    const resultResponse = {
      currentCategoryId: categoryId,
      filteredProducts,
      categories,
      minPrice: 0,
      maxPrice: 1728,
    };
    return resultResponse;
  },
});

function RouteComponent() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  const data = Route.useLoaderData();

  const { category, _splat } = Route.useParams();

  const { filteredProducts, minPrice, maxPrice } = data;

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

  const navigate = Route.useNavigate();

  const { pathname } = useLocation();

  const categoryName = formatString(category);
  const subcategoryName = _splat ? formatString(_splat) : undefined;

  const pathnames = pathname.split('/').slice(1);
  const links: Link[] = pathnames.reduce((a: Link[], v) => {
    const current: Link = {
      text: formatString(v),
      to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
    };
    return [...a, current];
  }, []);

  const handleMinMaxChange = (minPrice: number, maxPrice: number) => {
    setFilter({ ...filter, minPrice, maxPrice });
  };

  const handleColorChange = (color: string) => {
    setFilter({ ...filter, color });
  };

  const handleMaterialChange = (material: string) => {
    setFilter({ ...filter, material });
  };

  const handleDismissFilter = (name: string, value: string | number) => {
    if (name === 'color' && typeof value === 'string') {
      setFilter((prev) => ({ ...prev, color: undefined }));
    }
    if (name === 'material' && typeof value == 'string') {
      setFilter((prev) => ({ ...prev, material: undefined }));
    }
    if (name === 'price') {
      setFilter((prev) => ({ ...prev, minPrice: undefined, maxPrice: undefined }));
    }
  };

  const applyFilter = () => {
    const { ...search } = filter;
    setOpen(false);

    void navigate({
      to: '/catalog/$category/$',
      params: {
        category,
        _splat,
      },
      search,
    });
  };

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttribute = useRestoreFocusSource();

  return (
    <main>
      <div className={styles.breadContainer}>
        <CustomBreadcrumb links={links} />
      </div>
      <CategoryPage
        products={filteredProducts}
        categoryName={categoryName}
        subcategoryName={subcategoryName}
      />
      <div style={{ position: 'fixed', top: 110, right: 20 }}>
        {pathname !== '/catalog' && (
          <>
            <FilterButton onClick={() => setOpen(true)} {...restoreFocusTargetAttributes} />
            <Drawer
              separator
              open={open}
              position="end"
              {...restoreFocusSourceAttribute}
              onOpenChange={(_, { open }) => setOpen(open)}
            >
              <DrawerHeader>
                <DrawerHeaderTitle
                  action={
                    <StyledTooltip text="Close" positioning={'before'}>
                      <div>
                        <CustomButton
                          appearance="subtle"
                          aria-label="Close"
                          shape="circular"
                          icon={<DismissRegular />}
                          onClick={() => setOpen(false)}
                        />
                      </div>
                    </StyledTooltip>
                  }
                >
                  {DRAWER_TITLE}
                </DrawerHeaderTitle>
                <DismissWithInteractionTags tags={filter} onDismiss={handleDismissFilter} />
                <div style={{ display: 'flex', gap: '20px' }}>
                  <CustomButton
                    onClick={() => {
                      applyFilter();
                    }}
                    shape="circular"
                    size="medium"
                    icon={<CheckmarkFilled />}
                  >
                    {APPLY_BUTTON_TEXT}
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
                    {RESET_BUTTON_TEXT}
                  </CustomButton>
                </div>
              </DrawerHeader>

              <DrawerBody style={{ paddingRight: 5, paddingLeft: 22, scrollbarGutter: 'stable' }}>
                <div style={{ marginTop: 20 }}>
                  <RangeInputField
                    onChange={handleMinMaxChange}
                    prefix="$"
                    min={minPrice}
                    max={maxPrice}
                    values={[filter.minPrice ?? minPrice, filter.maxPrice ?? maxPrice]}
                  />
                </div>

                <div style={{ marginTop: 20 }}>
                  <Label>{DRAWER_SUBTITLE_FOR_COLORS}</Label>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {colors.map((v) => (
                    <SingleSwatchPicker
                      value={filter.color}
                      color={v}
                      key={v.value}
                      onChange={handleColorChange}
                    />
                  ))}
                </div>

                <div style={{ marginTop: 20 }}>
                  <Label>{DRAWER_SUBTITLE_FOR_MATERIALS}</Label>
                </div>
                <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                  {images.map((v) => (
                    <SingleImageSwatchPicker
                      key={v.value}
                      value={filter.material}
                      image={v}
                      onChange={handleMaterialChange}
                      ariaLabel={v.label}
                    />
                  ))}
                </div>
              </DrawerBody>
            </Drawer>
          </>
        )}
      </div>
    </main>
  );
}
