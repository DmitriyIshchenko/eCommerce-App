import {
  Body1Strong,
  Caption1,
  Card,
  CardFooter,
  CardPreview,
  Image,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import type { ProductCardProps } from '../../lib/types';
import CustomInfoLabel from '../ui/buttons/custom-info-label';
import CartButton from '../ui/cart/button';
import { InternalLink } from '../ui/links/fui-tanstack';
import CustomSpinner from '../ui/spinners/custom';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    width: '100%',
    aspectRatio: 0.725,
    borderRadius: 0,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    gap: '0',
    containerType: 'inline-size',
    padding: '0',
  },
  info: {
    '> button': {
      position: 'relative',
      zIndex: 1,
      justifySelf: 'center',
      padding: 'clamp(6px, 2cqw, 20px)',
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      width: 'clamp(24px, 9cqw, 68px)',
    },
    lineHeight: '1.2',
    fontSize: 'clamp(14px, 4cqw, 24px)',
  },
});

export function ProductCard(props: ProductCardProps) {
  const styles = useStyles();

  const [loading, setLoading] = useState(false);
  useEffect(() => setLoading(false), [props.cartGoods]);

  const imageTransitionName = `product-image-${props.id}`;
  const priceTransitionName = `product-price-${props.id}`;
  const nameTransitionName = `product-name-${props.id}`;

  const [imageTransition, setImageTransition] = useState('');
  const [priceTransition, setPriceTransition] = useState('');
  const [nameTransition, setNameTransition] = useState('');

  return (
    <Card className={styles.card}>
      <InternalLink
        to="/catalog/$category/$subcategory/$id"
        appearance="stickless"
        viewTransition
        params={{
          id: props.id,
          category: props.category,
          subcategory: props.subCategory,
        }}
        style={{
          position: 'absolute',
          display: 'block',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        onClick={() => {
          setImageTransition(imageTransitionName);
          setNameTransition(nameTransitionName);
          setPriceTransition(priceTransitionName);
        }}
      />
      <CardPreview
        style={{
          aspectRatio: 1,
          margin: 0,
          padding: '8%',
          backgroundColor: tokens.colorNeutralBackground1,
        }}
      >
        <Image
          src={props.image}
          alt={props.value.split('-').join(' ')}
          block
          style={{ viewTransitionName: imageTransition }}
        />
      </CardPreview>
      <CardFooter
        style={{
          display: 'grid',
          gridTemplateColumns: '5fr 1fr',
          alignContent: 'space-between',
          padding: '8%',
          columnGap: '8%',
        }}
      >
        <Body1Strong
          style={{
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4em',
            fontSize: 'clamp(16px, 4.5cqw, 32px)',
            lineHeight: 1.15,
            viewTransitionName: nameTransition,
          }}
        >
          {props.name}
        </Body1Strong>
        <CustomInfoLabel
          info={`${props.description?.split(/[.!]/)[0].slice(0, 200)}...`}
          className={styles.info}
        />
        <div style={{ viewTransitionName: priceTransition }}>
          {props.discount ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1ch' }}>
              <Caption1 style={{ fontSize: 'clamp(16px, 4.5cqw, 32px)' }}>From </Caption1>
              <Caption1 style={{ fontSize: 'clamp(16px, 4.5cqw, 32px)' }}>
                {props.discount}
              </Caption1>
              <Caption1 strikethrough style={{ fontSize: 'clamp(16px, 4.5cqw, 32px)' }}>
                {props.price}
              </Caption1>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Caption1 style={{ fontSize: 'clamp(16px, 4.5cqw, 32px)' }}>
                From {props.price}
              </Caption1>
            </div>
          )}
        </div>
        <div style={{ width: 'clamp(24px, 9cqw, 68px)', justifySelf: 'end' }}>
          <CartButton
            onClick={() => {
              if (props.onCartClick) {
                props.onCartClick(props.id);
              }
              setLoading(true);
            }}
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              aspectRatio: 1,
            }}
            tooltipContent={
              <div style={{ display: 'flex', gap: 4 }}>
                Add to Cart{' '}
                <span style={{ minWidth: 20, marginRight: -6, fontSize: 20 }}>
                  {loading && <CustomSpinner />}
                </span>
              </div>
            }
            loading={loading}
            goods={props.cartGoods}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
