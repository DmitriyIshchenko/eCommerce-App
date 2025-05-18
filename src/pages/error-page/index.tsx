import { Button, LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import { useNavigate } from '@tanstack/react-router';

const useClasses = makeStyles({
  errorPageContainer: {
    width: '100%',
    maxWidth: '1440px',
    height: '100%',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `0 ${tokens.spacingHorizontalXXL}`,
    boxSizing: 'border-box',
    '@media(width<620px)': {
      flexDirection: 'column',
    },
  },
  errorWrapper: {
    display: 'flex',
    gap: '20px',
    flexDirection: 'column',
  },
  textBlock: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
    margin: '0 auto',
  },
  divider: {
    height: 'calc(100vh - 100px)',
    width: '1px',
    backgroundColor: tokens.colorNeutralStroke1,
    '@media(width<620px)': {
      height: '0',
    },
  },
  button: {
    padding: tokens.spacingVerticalL,
    fontSize: '0.8rem',
    width: '100%',
    maxWidth: '350px',
  },
  text: {
    textAlign: 'center',
    fontSize: `1.1rem`,
  },
});

export default function ErrorPage() {
  const classes = useClasses();
  const navigate = useNavigate();

  const handleGoHome = () => {
    void navigate({ to: '/' });
  };

  return (
    <div className={classes.errorPageContainer}>
      <div className={classes.textBlock}>
        <LargeTitle as="h1">Page not found</LargeTitle>
      </div>
      <div className={classes.divider}></div>
      <div className={`${classes.textBlock} ${classes.errorWrapper}`}>
        <p className={classes.text}>The page you are looking for cannot be found</p>
        <Button
          className={classes.button}
          type="button"
          size="large"
          appearance="primary"
          shape="circular"
          onClick={handleGoHome}
        >
          GO TO HOMEPAGE
        </Button>
      </div>
    </div>
  );
}
