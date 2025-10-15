import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import RegisterForm from '../../features/register-form';

const useStyles = makeStyles({
  page: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',

    '@media(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },

  title: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',

    display: 'grid',
    placeContent: 'center',

    padding: tokens.spacingVerticalXXXL,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,

    '@media(max-width: 768px)': {
      position: 'static',
      height: 'auto',
      minHeight: '35vh',
      borderRight: 'none',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
  },

  content: {
    padding: '60px',

    '@media(max-width: 768px)': {
      overflowY: 'visible',
      padding: '40px',
      border: 'none',
    },
  },
});

export default function RegisterPage() {
  const styles = useStyles();

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <LargeTitle as="h1" align="center">
          Create an account
        </LargeTitle>
      </div>
      <div className={styles.content}>
        <RegisterForm />
      </div>
    </div>
  );
}
