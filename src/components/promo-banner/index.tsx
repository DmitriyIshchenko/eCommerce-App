import { makeStyles, Text, tokens } from '@fluentui/react-components';
import CopyButton from '../ui/buttons/copy';
import { useRef, useState } from 'react';
import { PROMO_CODE_BIG_PRICE, PROMO_CODE_TOTAL } from '../../lib/constants';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: tokens.spacingVerticalXXXL,
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalXS}`,
    backgroundColor: tokens.colorNeutralForeground1,
  },
  text: {
    color: tokens.colorNeutralForegroundInverted,
    fontSize: tokens.fontSizeBase200,
    cursor: 'default',
  },
  promoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
    color: tokens.colorNeutralForegroundInverted,
  },
});

export function PromoBanner() {
  const styles = useStyles();
  const [copyTotal, setCopyTotal] = useState(false);
  const [copyBigPrice, setCopyBigPrice] = useState(false);

  const textRefTotal = useRef<HTMLSpanElement>(null);
  const textRefBigPrice = useRef<HTMLSpanElement>(null);

  const handleCopy = async (
    ref: React.RefObject<HTMLSpanElement>,
    setCopy: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      await navigator.clipboard.writeText(ref.current?.innerText ?? '');
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    } catch {
      console.error('Failed to copy text');
    }
  };

  return (
    <div className={styles.container}>
      <Text className={styles.text} size={200} align="center">
        Get Inspired & Save 15% Today:
      </Text>

      <div className={styles.promoContainer}>
        <CopyButton onClick={() => void handleCopy(textRefTotal, setCopyTotal)} copy={copyTotal} />
        <Text className={styles.text} ref={textRefTotal}>
          {PROMO_CODE_TOTAL}
        </Text>
      </div>

      <Text className={styles.divider} size={200} align="center">
        |
      </Text>

      <Text className={styles.text} size={200} align="center">
        Curate over $1000 in art, get rewarded:
      </Text>

      <div className={styles.promoContainer}>
        <CopyButton
          onClick={() => void handleCopy(textRefBigPrice, setCopyBigPrice)}
          copy={copyBigPrice}
        />
        <Text className={styles.text} ref={textRefBigPrice}>
          {PROMO_CODE_BIG_PRICE}
        </Text>
      </div>
    </div>
  );
}
