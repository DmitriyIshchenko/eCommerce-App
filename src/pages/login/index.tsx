import { Divider, LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import LoginForm from '../../features/login-form';

const useClasses = makeStyles({
  login: {
    position: 'relative',
    maxWidth: '1440px',
    margin: '0 auto',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9vw',
    '@media(width<690px)': {
      flexWrap: 'wrap',
    },
  },
  titleContainer: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
    flexGrow: 1,
    textAlign: 'center',
  },
  formContainer: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
    flexGrow: 1,
  },
  verticalDivider: {
    position: 'absolute',
    height: '100%',
    left: '50%',
    top: 0,
    '@media(width<690px)': {
      display: 'none',
    },
  },
  horizontalDivider: {
    display: 'none',
    '@media(width<690px)': {
      display: 'block',
    },
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
        <Divider className={classes.horizontalDivider}></Divider>
        <div className={classes.formContainer}>
          <LoginForm />
        </div>
      </div>
      <Divider className={classes.verticalDivider} vertical></Divider>
    </div>
  );
}
