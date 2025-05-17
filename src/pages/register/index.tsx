import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import RegisterForm from '../../features/register-form';

const useStyles = makeStyles({
  page: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '100vh',

    '@media(width<768px)': {
      gridTemplateColumns: '1fr',
    },
  },

  title: {
    display: 'grid',
    placeContent: 'center',

    padding: tokens.spacingVerticalXXXL,

    borderRight: `1px solid ${tokens.colorBrandBackground2Hover}`,

    '@media(width<768px)': {
      borderRight: 'none',
      borderBottom: `1px solid ${tokens.colorBrandBackground2Hover}`,
    },
  },

  content: {
    padding: tokens.spacingHorizontalXXXL,
    overflowY: 'scroll',

    '@media(width<768px)': {
      overflowY: 'visible',
      padding: tokens.spacingHorizontalM,
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
