import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import type { ReactNode } from 'react';

const useStyles = makeStyles({
  page: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',

    '@media(width<768px)': {
      gridTemplateColumns: '1fr',
    },
  },

  title: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',

    display: 'grid',
    placeContent: 'center',

    padding: tokens.spacingVerticalXXXL,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,

    '@media(width<768px)': {
      position: 'static',
      height: 'auto',
      minHeight: '35vh',
      borderRight: 'none',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
  },

  content: {
    padding: tokens.spacingHorizontalXXXL,

    '@media(width<768px)': {
      overflowY: 'visible',
      padding: tokens.spacingHorizontalM,
      border: 'none',
    },
  },
});

interface Props {
  children: ReactNode;
}

export default function AccountPage({ children }: Props) {
  const styles = useStyles();

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <LargeTitle as="h1" align="center">
          Account
        </LargeTitle>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
