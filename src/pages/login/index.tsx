import { makeStyles, Text, tokens, typographyStyles } from '@fluentui/react-components';
import LoginForm from '../../features/login-form';

const useStyles = makeStyles({
  left: {
    padding: '40px',
    width: '50%',
    minHeight: '100vh',
    float: 'left',
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    gap: '16px',
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    '@media (max-width: 768px)': {
      position: 'static',
      width: '100%',
      float: 'unset',
      minHeight: '35vh',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
      borderRight: 0,
    },
  },
  right: {
    width: '50%',
    marginLeft: '50%',
    padding: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    '@media (max-width: 768px)': {
      width: '100%',
      marginLeft: 0,
      minHeight: '35vh',
      padding: '40px',
    },
  },
  title: typographyStyles.largeTitle,
});

export default function LoginPage() {
  const styles = useStyles();

  return (
    <div>
      <div className={styles.left}>
        <Text align="center" as="h2" className={styles.title}>
          Customer Login
        </Text>
      </div>
      <div className={styles.right}>
        <div style={{ width: '100%' }}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
