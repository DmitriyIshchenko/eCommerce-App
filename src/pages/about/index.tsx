import { LargeTitle } from '@fluentui/react-components';
import { useClasses } from '../../components/main-banner';

export default function AboutPage() {
  const classes = useClasses();
  return (
    <main className={classes.main}>
      <LargeTitle as="h1">About Page</LargeTitle>
    </main>
  );
}
