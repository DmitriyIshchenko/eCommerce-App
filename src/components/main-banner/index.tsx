import { makeStyles, Subtitle1, Title2 } from '@fluentui/react-components';

export const useClasses = makeStyles({
  main: {
    minHeight: `calc(100vh - 100px)`,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
    maxWidth: '1440px',
    boxSizing: 'border-box',
    margin: '0 auto',
  },
});

export function MainBanner() {
  const classes = useClasses();

  return (
    <main className={classes.main}>
      <Title2>🐱‍💻 Main Page 🐱‍💻</Title2>
      <Subtitle1 align="center">
        Hey! We&apos;re still wrapping up our project - would it be okay if you review it on the
        last day? Thanks a lot and good luck! 🙏
      </Subtitle1>
    </main>
  );
}
