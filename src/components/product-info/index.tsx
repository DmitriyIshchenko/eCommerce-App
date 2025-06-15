import {
  Button,
  Image,
  makeStyles,
  Select,
  SpinButton,
  Text,
  tokens,
  useFocusFinders,
  useId,
  useModalAttributes,
} from '@fluentui/react-components';
import type { ProductInfoProps } from '../../lib/types';
import { ProductCarousel } from '../carousel';
import { useEffect, useRef, useState } from 'react';
import { DismissRegular } from '@fluentui/react-icons';
import findProductVariationAttributes from '../../lib/utils/find-product-attributes';

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
    cursor: 'pointer',
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
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightHero800,
  },
  productSubtitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightMedium,
  },
  productText: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase500,
  },
  selectContainer: {
    display: 'flex',
    gap: '1rem',
  },
  selectBlock: {
    flexGrow: '1',
    width: '100%',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '20px',
    borderRadius: tokens.borderRadiusMedium,
    width: '80%',
    maxWidth: '900px',
    maxHeight: '95vh',
    overflow: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
  },
  modalCarousel: {
    width: '100%',
    height: '100%',
  },
  base: {
    display: 'flex',
    width: '100%',
    maxBlockSize: '100%',
    flexDirection: 'column',
    fontSize: tokens.fontSizeBase400,

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
  selectButton: {
    textAlign: 'center',
  },
});

export function ProductInfo(props: ProductInfoProps | null) {
  const styles = useStyles();
  const selectId = useId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { triggerAttributes, modalAttributes } = useModalAttributes({
    legacyTrapFocus: true,
    trapFocus: true,
  });
  const { findFirstFocusable } = useFocusFinders();
  const triggerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => {
    if (props?.images && props.images.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    triggerRef.current?.focus();
  };

  const onModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  const productVariationAttributes = findProductVariationAttributes(props?.variants);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      document.body.style.overflow = 'hidden';
      findFirstFocusable(modalRef.current)?.focus();
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen, findFirstFocusable]);

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImg} ref={triggerRef} {...triggerAttributes}>
        {props?.images && props?.images.length > 1 ? (
          <ProductCarousel images={props.images} onImageClick={handleImageClick} />
        ) : (
          <Image className={styles.img} src={props?.image} onClick={handleImageClick} />
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
          {Object.entries(productVariationAttributes)?.map(([key, values]) => {
            return (
              <div key={`select-block-${key}`} className={styles.selectBlock}>
                <label htmlFor={`${selectId}-${key}`}>Select {key}</label>
                <Select id={`${selectId}-${key}`} size="large">
                  {Array.from(values).map((value, index) => (
                    <option key={`${key}-option-${index}`} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
            );
          })}
        </div>
        <div className={styles.base}>
          <SpinButton
            className={styles.selectButton}
            size="medium"
            defaultValue={1}
            min={0}
            max={20}
            id={selectId}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            ref={modalRef}
            {...modalAttributes}
            aria-modal="true"
            role="dialog"
            aria-label="Product image gallery"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onModalKeyDown}
          >
            <Button
              className={styles.closeButton}
              appearance="transparent"
              onClick={handleCloseModal}
              aria-label="Close gallery"
              icon={<DismissRegular />}
            />
            <div className={styles.modalCarousel}>
              <ProductCarousel images={props?.images ?? []} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
