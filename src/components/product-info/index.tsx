import { Image, makeStyles, Select, Text, useId } from '@fluentui/react-components';
import type { ProductInfoProps } from '../../lib/types';
import { ProductCarousel } from '../carousel';

const useStyles = makeStyles({
  productContainer: {
    display: 'flex',
    gap: '1rem',
    padding: '0 40px 40px',
    '@media (max-width: 950px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  productImg: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    maxWidth: '50%',
    '@media (max-width: 950px)': {
      maxWidth: '100%',
    },
    '@media (max-width: 1100px)': {
      maxWidth: '60%',
    },
  },
  img: {
    width: '100%',
    margin: '0 auto',
  },
  productInfo: {
    maxWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '5rem 0',
    '@media (max-width: 950px)': {
      maxWidth: '100%',
    },
  },
  productTitle: {
    fontSize: '2.5rem',
    fontWeight: '500',
    lineHeight: '1',
  },
  productSubtitle: {
    fontSize: '1.3rem',
    fontWeight: '500',
  },
  productText: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  selectContainer: {
    display: 'flex',
    gap: '1rem',
  },
  selectBlock: {
    flexGrow: '1',
  },
});

export function ProductInfo(props: ProductInfoProps | null) {
  const styles = useStyles();
  const selectId = useId();
  return (
    <div className={styles.productContainer}>
      <div className={styles.productImg}>
        {props?.images && props?.images.length > 1 ? (
          <ProductCarousel images={props.images} />
        ) : (
          <Image className={styles.img} src={props?.image} />
        )}
      </div>
      <div className={styles.productInfo}>
        <Text as="h2" className={styles.productTitle}>
          {props?.name}
        </Text>
        <div>
          {props?.discount ? (
            <div>
              <Text className={styles.productSubtitle} strikethrough style={{ marginRight: '5px' }}>
                {props.price}
              </Text>
              <Text className={styles.productSubtitle}>{props.discount}</Text>
            </div>
          ) : (
            <div>
              <Text className={styles.productSubtitle}>{props?.price}</Text>
            </div>
          )}
        </div>
        <Text className={styles.productSubtitle}>About the Artwork</Text>
        <div className={styles.productText}>{props?.description}</div>
        <div className={styles.selectContainer}>
          <div className={styles.selectBlock}>
            <label htmlFor={`${selectId}-large`}>Select Size</label>
            <Select id={`${selectId}-large`} size="large">
              <option>20x16</option>
              <option>30x24</option>
              <option>40x32</option>
              <option>50x40</option>
              <option>60x48</option>
            </Select>
          </div>
          <div className={styles.selectBlock}>
            <label htmlFor={`${selectId}-large`}>Select Material</label>
            <Select id={`${selectId}-large`} size="large">
              <option>Giclee</option>
              <option>Photo Rag</option>
              <option>Canvas</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
