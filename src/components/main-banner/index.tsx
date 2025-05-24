import { makeStyles, Title2 } from '@fluentui/react-components';

export const useClasses = makeStyles({
  main: {
    minHeight: `calc(100vh - 100px)`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    </main>
  );
}
