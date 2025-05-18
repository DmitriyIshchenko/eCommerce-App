import { makeStyles } from '@fluentui/react-components';

const useClasses = makeStyles({
  main: {
    width: '100%',
    maxWidth: '1440px',
    boxSizing: 'border-box',
  },
});

export function MainBanner() {
  const classes = useClasses();
  return <main className={classes.main}></main>;
}
