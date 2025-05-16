import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import RegisterForm from '../../features/register-form';

const useClasses = makeStyles({
  login: {
    maxWidth: '1440px',
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    width: '100%',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '125px',
  },
  titleContainer: {
    flexGrow: 1,
    textAlign: 'center',
  },
  formContainer: {
    flexGrow: 1,
  },
});

export default function RegisterPage() {
  const styles = useClasses();

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <div className={styles.titleContainer}>
          <LargeTitle as="h1">Create an account</LargeTitle>
        </div>
        <div className={styles.formContainer}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
