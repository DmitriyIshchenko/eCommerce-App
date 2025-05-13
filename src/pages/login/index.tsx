import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import LoginForm from '../../features/login-form';

const useClasses = makeStyles({
  login: {
    maxWidth: '1440px',
    margin: '0 auto',
    height: '100vh',
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

export default function LoginPage() {
  const classes = useClasses();

  return (
    <div className={classes.login}>
      <div className={classes.loginContainer}>
        <div className={classes.titleContainer}>
          <LargeTitle as="h1">Customer Login</LargeTitle>
        </div>
        <div className={classes.formContainer}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
