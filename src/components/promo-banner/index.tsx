import { makeStyles, Text, tokens } from '@fluentui/react-components';
import CopyButton from '../ui/buttons/copy';
import { useState } from 'react';
import { PROMO_CODES } from '../../lib/constants';

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
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
    color: tokens.colorNeutralForegroundInverted,
    fontSize: tokens.fontSizeBase200,
    cursor: 'default',
  },
  promoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  promoCode: {
    paddingRight: tokens.spacingHorizontalSNudge,
    color: tokens.colorNeutralForegroundInverted,
    fontSize: tokens.fontSizeBase200,
    cursor: 'default',
  },
  divider: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
    color: tokens.colorNeutralForegroundInverted,
    cursor: 'default',
  },
});

export function PromoBanner() {
  const styles = useStyles();
  const [copyTotal, setCopyTotal] = useState(false);
  const [copyBigPrice, setCopyBigPrice] = useState(false);

  const handleCopy = async (
    text: string,
    setCopy: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
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
        <CopyButton
          onClick={() => void handleCopy(PROMO_CODES.TOTAL, setCopyTotal)}
          copy={copyTotal}
        />
        <Text className={styles.promoCode}>{PROMO_CODES.TOTAL}</Text>
      </div>

      <Text className={styles.divider} size={200} align="center">
        |
      </Text>

      <Text className={styles.text} size={200} align="center">
        Curate over $1000 in art, get rewarded:
      </Text>

      <div className={styles.promoContainer}>
        <CopyButton
          onClick={() => void handleCopy(PROMO_CODES.BIG_PRICE, setCopyBigPrice)}
          copy={copyBigPrice}
        />
        <Text className={styles.promoCode}>{PROMO_CODES.BIG_PRICE}</Text>
      </div>
    </div>
  );
}
