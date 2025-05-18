import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import { Link as RouterLink } from '@tanstack/react-router';

const useClasses = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${tokens.spacingVerticalXXL}`,
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  titleLink: {
    textDecoration: 'none',
  },
  title: {
    fontFamily: 'Gloock, sans-serif',
    fontWeight: tokens.fontWeightRegular,
    fontSize: '2rem',
    color: tokens.colorNeutralForeground1,
  },
  headerContainer: {
    width: '100%',
    maxWidth: '1440px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menu: {
    display: 'flex',
    gap: '1rem',
    listStyle: 'none',
    fontSize: '1.2rem',
    textDecoration: 'none',
  },
  menuLink: {
    textDecoration: 'none',
    color: tokens.colorNeutralForeground1,
    '&:hover': {
      textDecoration: 'underline',
      color: tokens.colorNeutralForeground1Hover,
    },
  },
});

export function Header() {
  const classes = useClasses();
  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <RouterLink className={classes.titleLink} aria-label="Celestia Art - Home" to="/">
          <LargeTitle className={classes.title}>Celestia Art</LargeTitle>
        </RouterLink>
        <ul className={classes.menu}>
          <li>
            {' '}
            <RouterLink className={classes.menuLink} aria-label="Login to your account" to="/login">
              Login
            </RouterLink>
          </li>
          <li>
            {' '}
            <RouterLink className={classes.menuLink} aria-label="Create new account" to="/register">
              Sign Up
            </RouterLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
