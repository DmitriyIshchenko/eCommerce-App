import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import ButtonLink from '../../components/ui/links/button';
import { ArrowRightFilled } from '@fluentui/react-icons';

const useClasses = makeStyles({
  pageContainer: {
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
  wrapper: {
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
    fontSize: '1.1rem',
  },
});

export default function NotFoundPage() {
  const classes = useClasses();

  return (
    <div className={classes.pageContainer}>
      <div className={classes.textBlock}>
        <LargeTitle align="center" as="h1">
          Page not found
        </LargeTitle>
      </div>
      <div className={classes.divider}></div>
      <div className={`${classes.textBlock} ${classes.wrapper}`}>
        <p className={classes.text}>The page you are looking for cannot be found</p>
        <ButtonLink text="GO TO HOME PAGE" to="/" icon={<ArrowRightFilled />} />
      </div>
    </div>
  );
}
