import { Button, LargeTitle, makeStyles, tokens } from '@fluentui/react-components';

const useClasses = makeStyles({
  errorPageContainer: {
    width: '100%',
    maxWidth: '1440px',
    height: '100vh',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacingHorizontalXXXL,
    boxSizing: 'border-box',
  },
  button: {
    padding: tokens.spacingVerticalL,
    fontSize: '0.8rem',
  },
  text: {
    margin: '0 auto',
  },
});

export default function ErrorPage() {
  const classes = useClasses();
  return (
    <div className={classes.errorPageContainer}>
      <div className={classes.text}>
        <LargeTitle as="h1">Page not found</LargeTitle>
      </div>
      <div className={classes.text}>
        <p>The page you are looking for cannot be found</p>
        <Button
          className={classes.button}
          type="button"
          size="large"
          appearance="primary"
          shape="circular"
        >
          GO TO HOMEPAGE
        </Button>
      </div>
    </div>
  );
}
