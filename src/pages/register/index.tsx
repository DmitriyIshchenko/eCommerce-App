import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import RegisterForm from '../../features/register-form';

// const useStyles = makeStyles({
//   page: {
//     maxWidth: '1440px',
//     margin: '0 auto',
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',

//     '@media(width<768px)': {
//       gridTemplateColumns: '1fr',
//     },
//   },

//   title: {
//     position: 'sticky',
//     top: 0,
//     height: '100vh',
//     overflowY: 'auto',

//     display: 'grid',
//     placeContent: 'center',

//     padding: tokens.spacingVerticalXXXL,
//     borderRight: `1px solid ${tokens.colorNeutralStroke1}`,

//     '@media(width<768px)': {
//       position: 'static',
//       height: 'auto',
//       borderRight: 'none',
//       borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
//     },
//   },

//   content: {
//     padding: tokens.spacingHorizontalXXXL,

//     '@media(width<768px)': {
//       overflowY: 'visible',
//       padding: tokens.spacingHorizontalM,
//       border: 'none',
//     },
//   },
// });

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
});

export default function RegisterPage() {
  const styles = useStyles();

  return (
    <div>
      <div className={styles.left}>
        <LargeTitle as="h1" align="center">
          Create an account
        </LargeTitle>
      </div>
      <div className={styles.right}>
        <RegisterForm />
      </div>
    </div>
  );
}
