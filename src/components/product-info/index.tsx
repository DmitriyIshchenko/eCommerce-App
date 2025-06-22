import {
  Divider,
  Label,
  Menu,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  makeStyles,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import useMatchMediaQuery from '../../hooks/use-match-media';
import { allColors, allMaterials } from '../../lib/constants/constants';
import type { ProductInfoProps } from '../../lib/types';
import { ProductFancyCarousel } from '../carousel/fancy';
import CustomButton from '../ui/buttons/custom';
import CustomSpinButton from '../ui/buttons/custom-spin';
import FacebookIcon from '../ui/icons/facebook';
import PinterestIcon from '../ui/icons/pinterest';
import XIcon from '../ui/icons/x';
import { ExternalLink } from '../ui/links/fui-tanstack';
import CustomSpinner from '../ui/spinners/custom';
import ImageSwatchPicker from '../ui/swatch-picker/image';
import LargeSwatchPicker from '../ui/swatch-picker/large';
import { AccordionProductInfo } from './accordion';

const BASE_URL = 'https://celestia-art.netlify.app';

const useStyles = makeStyles({
  left: {
    display: 'inline-block',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    width: '50%',
    position: 'sticky',
    top: 0,
    padding: '24px',
    overflowX: 'hidden',
    '@media (max-width: 1024px)': {
      width: '100%',
      position: 'static',
      maxHeight: 'none',
    },
  },
  right: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '50%',
    padding: '40px',
    containerName: 'right',
    containerType: 'inline-size',
    minHeight: '100vh',
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    '@media (max-width: 1024px)': {
      padding: '24px',
      width: '100%',
      borderLeft: `0px solid ${tokens.colorNeutralStroke1}`,
      borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
      minHeight: 'unset',
    },
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXL,
    maxWidth: '720px',
    '@media (max-width: 1024px)': {
      margin: '0 auto',
    },
  },
  productTitle: {
    ...typographyStyles.title2,
  },
  productSubtitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightMedium,
  },
  productText: {
    ...typographyStyles.body1,
    marginTop: tokens.spacingVerticalM,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  cartButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalXL,
    '@container right (max-width: 512px)': {
      flexDirection: 'column',
    },
  },
  mobileHeading: {
    display: 'flex',
    gap: tokens.spacingVerticalL,
    flexDirection: 'column',
    width: '100%',
  },
  desktopHeading: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
});

export function ProductInfo({
  id,
  description,
  discount,
  images,
  materials,
  name,
  price,
  sizes,
  colors,
  inCart = 0,
  variants,
}: ProductInfoProps) {
  const styles = useStyles();
  const [currentSize, setCurrentSize] = useState<string | null>(sizes?.[0] ?? null);
  const [currentColor, setCurrentColor] = useState<string | null>(colors?.[0] ?? null);
  const [currentMaterial, setCurrentMaterial] = useState<string | null>(materials?.[0] ?? null);
  const [quantity, setQuantity] = useState(Math.max(1, inCart ?? 0));
  const [addLoading, setAddLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const variantId =
    variants?.find(
      (v) =>
        (v.attributes?.[0]?.value?.key === currentMaterial || currentMaterial === null) &&
        (v.attributes?.[1]?.value === currentSize || currentSize === null) &&
        (v.attributes?.[2]?.value === currentColor || currentColor === null),
    )?.id ?? 1;
  const addToCart = () => {
    setAddLoading(true);
    setTimeout(() => {
      console.log('add to cart prod id', id, 'variant id', variantId);
      setAddLoading(false);
    }, 2000);
  };
  const removeFromToCart = () => {
    setRemoveLoading(true);
    setTimeout(() => {
      console.log('remove from cart all variants prod id', id);
      setQuantity(1);
      setRemoveLoading(false);
    }, 2000);
  };
  const location = useLocation();
  const matchMobileWidth = useMatchMediaQuery('(max-width: 1024px)');

  return (
    <div>
      <div className={styles.left}>
        {matchMobileWidth && (
          <div className={styles.mobileHeading}>
            <Text
              as="h2"
              className={styles.productTitle}
              style={{ viewTransitionName: `product-name-${id}` }}
            >
              {name}
            </Text>
            <p
              style={{
                display: 'flex',
                gap: tokens.spacingHorizontalS,
                viewTransitionName: `product-price-${id}`,
              }}
            >
              {discount && <Text className={styles.productSubtitle}>{discount}</Text>}
              <Text
                className={styles.productSubtitle}
                strikethrough={!!discount}
                style={{ marginRight: '5px' }}
              >
                {price}
              </Text>
            </p>
            <Divider style={{ width: '200%', marginLeft: '-50%' }} />
          </div>
        )}
        <ProductFancyCarousel
          images={images}
          style={{ width: '100%', position: 'relative' }}
          id={id}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.productInfo}>
          {!matchMobileWidth && (
            <div className={styles.desktopHeading}>
              <Text
                as="h2"
                className={styles.productTitle}
                style={{ viewTransitionName: `product-name-${id}` }}
              >
                {name}
              </Text>
              <p
                style={{
                  display: 'flex',
                  gap: tokens.spacingHorizontalS,
                  viewTransitionName: `product-price-${id}`,
                }}
              >
                {discount && <Text className={styles.productSubtitle}>{discount}</Text>}
                <Text
                  className={styles.productSubtitle}
                  strikethrough={!!discount}
                  style={{ marginRight: '5px' }}
                >
                  {price}
                </Text>
              </p>
            </div>
          )}
          <div>
            <Text className={styles.productSubtitle}>About the Artwork</Text>
            <p className={styles.productText}>{description}</p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            {!!materials?.length && (
              <div>
                <Label style={{ fontSize: tokens.fontSizeBase400 }}>Materials</Label>
                <ImageSwatchPicker
                  images={allMaterials.filter((m) => materials?.includes(m.value))}
                  value={currentMaterial ?? undefined}
                  onChange={(v) => setCurrentMaterial(v)}
                />
              </div>
            )}
            {!!colors?.length && (
              <div>
                <Label style={{ fontSize: tokens.fontSizeBase400 }}>Colors</Label>
                <LargeSwatchPicker
                  colors={allColors.filter((c) => colors?.includes(c.value))}
                  onChange={(v) => setCurrentColor(v)}
                  value={currentColor ?? undefined}
                />
              </div>
            )}
            {!!sizes?.length && (
              <div>
                <Label style={{ fontSize: tokens.fontSizeBase400 }}>Sizes</Label>
                <Menu
                  defaultCheckedValues={{ size: [sizes[0]] }}
                  onCheckedValueChange={(_, d) => setCurrentSize(d.checkedItems[0])}
                >
                  <MenuTrigger disableButtonEnhancement>
                    <div>
                      <CustomButton
                        appearance="transparent"
                        outlined
                        shape="square"
                        icon={<ChevronDownRegular />}
                        iconPosition="after"
                        style={{
                          minWidth: 138,
                          justifyContent: 'space-between',
                          fontSize: tokens.fontSizeBase400,
                          height: 40,
                          paddingRight: 12,
                        }}
                      >
                        {currentSize}
                      </CustomButton>
                    </div>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      {sizes?.map((v) => (
                        <MenuItemRadio
                          key={v}
                          name="size"
                          value={v}
                          style={{ fontSize: tokens.fontSizeBase400 }}
                        >
                          {v}
                        </MenuItemRadio>
                      ))}
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </div>
            )}
            <div>
              <Label style={{ fontSize: tokens.fontSizeBase400 }}>Quantity</Label>
              {
                <CustomSpinButton
                  style={{ display: 'grid', fontSize: tokens.fontSizeBase400 }}
                  value={quantity}
                  onChange={(_, d) => setQuantity(d.value ?? 1)}
                  min={1}
                />
              }
            </div>
          </div>
          <div className={styles.cartButtons}>
            <CustomButton
              shape="circular"
              style={{
                flexBasis: '50%',
                position: 'relative',
                lineHeight: '26px',
                padding: 12,
              }}
              disabled={addLoading || removeLoading}
              onClick={addToCart}
            >
              {addLoading ? (
                <CustomSpinner
                  style={{
                    right: 8,
                    fontSize: 26,
                  }}
                />
              ) : (
                'ADD TO CART'
              )}
            </CustomButton>
            <CustomButton
              shape="circular"
              style={{
                flexBasis: '50%',
                position: 'relative',
                lineHeight: '26px',
                padding: 12,
              }}
              appearance="inverted"
              disabled={inCart === 0 || removeLoading || addLoading}
              onClick={removeFromToCart}
            >
              REMOVE FROM CART
              <CustomSpinner
                style={{
                  position: 'absolute',
                  right: 8,
                  fontSize: 26,
                  visibility: removeLoading ? 'visible' : 'hidden',
                }}
              />
            </CustomButton>
          </div>
          <AccordionProductInfo />
          <div
            style={{
              display: 'flex',
              gap: tokens.spacingHorizontalXS,
              alignItems: 'center',
            }}
          >
            <span style={{ lineHeight: 1, fontSize: tokens.fontSizeBase400 }}>Share:</span>
            <ExternalLink
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(name)}&url=${BASE_URL}${location.pathname}`}
              appearance="stickless"
              style={{ fontSize: tokens.fontSizeBase600, lineHeight: 1 }}
              target="_blank"
              asBlock
            >
              <XIcon />
            </ExternalLink>
            <ExternalLink
              href={`https://www.facebook.com/sharer.php?u=${BASE_URL}${location.pathname}`}
              appearance="stickless"
              style={{ fontSize: tokens.fontSizeBase600, lineHeight: 1 }}
              target="_blank"
              asBlock
            >
              <FacebookIcon />
            </ExternalLink>
            <ExternalLink
              href={`https://pinterest.com/pin/create/button/?url=${BASE_URL}${location.pathname}&media=${images?.[0].url}?description=${encodeURIComponent(name)}`}
              appearance="stickless"
              style={{ fontSize: tokens.fontSizeBase600, lineHeight: 1 }}
              target="_blank"
              asBlock
            >
              <PinterestIcon />
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}
