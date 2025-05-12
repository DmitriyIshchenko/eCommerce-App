import { makeStyles, tokens } from '@fluentui/react-components';
import LoginForm from '../../features/login-form';

const useClasses = makeStyles({
  login: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: tokens.colorNeutralForegroundInverted,
  },
  loginContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '125px',
  },
  titleContainer: {
    flexGrow: 1,
    padding: '0 60px',
  },
  formContainer: {
    flexGrow: 1,
    padding: '0 60px',
  },
  loginTitle: {
    fontSize: '50px',
    lineHeight: '1.1',
    margin: '0',
    textAlign: 'center',
  },
});

export default function LoginPage() {
  const classes = useClasses();

  return (
    <>
      <div className={classes.login}>
        <div className={classes.loginContainer}>
          <div className={classes.titleContainer}>
            <h1 className={classes.loginTitle}>Customer Login</h1>
          </div>

          <div className={classes.formContainer}>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
