import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import CustomButton from '../../components/ui/buttons/custom';

const useClasses = makeStyles({
  errorPageContainer: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '1440px',
    height: '100vh',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `0 ${tokens.spacingHorizontalXXL}`,
    boxSizing: 'border-box',
    '@media(width<620px)': {
      flexDirection: 'column',
      padding: '40px',
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
    height: '100%',
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

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={classes.errorPageContainer}>
      <div className={classes.textBlock}>
        <LargeTitle align="center" as="h1">
          Unexpected Error
        </LargeTitle>
      </div>
      <div className={classes.divider}></div>
      <div className={`${classes.textBlock} ${classes.errorWrapper}`}>
        <p className={classes.text}>
          We&apos;re sorry, but it looks like something went wrong while processing your request.
        </p>
        <CustomButton shape="circular" size="large" onClick={handleClick}>
          Try Again
        </CustomButton>
      </div>
    </div>
  );
}
