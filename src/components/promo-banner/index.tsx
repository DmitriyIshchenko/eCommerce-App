import { makeStyles, Text, tokens } from '@fluentui/react-components';
import CopyButton from '../ui/buttons/copy';
import { useRef, useState } from 'react';
import { PROMO_CODE } from '../../lib/constants';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '35px',
    padding: '0 4px',
    backgroundColor: tokens.colorNeutralForeground1,
  },
  text: {
    color: 'white',
    fontSize: tokens.fontSizeBase200,
    cursor: 'default',
  },
  promoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  },
});

export function PromoBanner() {
  const styles = useStyles();
  const [copy, setCopy] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textRef?.current?.innerText ?? '');
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    } catch {
      console.error('Failed to copy text');
    }
  };

  return (
    <div className={styles.container}>
      <Text className={styles.text} size={200} align="center">
        New Artwork Uploaded Weekly | Get Inspired & Save 15% Today:{' '}
      </Text>
      <div className={styles.promoContainer}>
        <CopyButton onClick={() => void handleCopy()} copy={copy} />
        <Text className={styles.text} ref={textRef}>
          {PROMO_CODE}
        </Text>
      </div>
    </div>
  );
}
