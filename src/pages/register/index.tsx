import { LargeTitle } from '@fluentui/react-components';
import RegisterForm from '../../features/auth-forms/register-form';
import { useColumnsStyles } from '../../styles/columns-layout';

export default function RegisterPage() {
  const styles = useColumnsStyles();

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <LargeTitle as="h1" align="center">
          Create an account
        </LargeTitle>
      </div>
      <div className={styles.right}>
        <RegisterForm />
      </div>
    </div>
  );
}
