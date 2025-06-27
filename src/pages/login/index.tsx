import { LargeTitle } from '@fluentui/react-components';
import LoginForm from '../../features/auth-forms/login-form';
import { useColumnsStyles } from '../../styles/columns-layout';

export default function LoginPage() {
  const styles = useColumnsStyles();

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <LargeTitle align="center" as="h2">
          Customer Login
        </LargeTitle>
      </div>
      <div className={styles.right}>
        <LoginForm />
      </div>
    </div>
  );
}
