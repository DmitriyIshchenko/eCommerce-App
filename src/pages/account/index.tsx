import { LargeTitle } from '@fluentui/react-components';
import type { ReactNode } from 'react';
import { useColumnsStyles } from '../../styles/columns-layout';

interface Props {
  children: ReactNode;
}

export default function AccountPage({ children }: Props) {
  const styles = useColumnsStyles();

  return (
    <div>
      <div className={styles.left}>
        <LargeTitle as="h1" align="center">
          Account
        </LargeTitle>
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
}
