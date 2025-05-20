import { Button, LargeTitle, Link, makeStyles, tokens } from '@fluentui/react-components';
import { createLink, useNavigate } from '@tanstack/react-router';
import { useUser } from '../../hooks/use-user';

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
  title: {
    marginRight: tokens.spacingHorizontalMNudge,
    fontFamily: 'Gloock, sans-serif',
    fontWeight: tokens.fontWeightRegular,
    fontSize: '2rem',
    color: tokens.colorNeutralForeground1,
    '&:hover': {
      textDecoration: 'none',
    },
    '&:active': {
      textDecoration: 'none',
    },
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
    flexWrap: 'wrap',
    alignItems: 'center',
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
  const CustomLink = createLink(Link);
  const classes = useClasses();
  const { authorized, setAuthorized } = useUser();
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <CustomLink className={classes.title} aria-label="Celestia Art - Home" to="/">
          <LargeTitle className={classes.title}>Celestia Art</LargeTitle>
        </CustomLink>
        <ul className={classes.menu}>
          <li>
            {' '}
            <CustomLink
              className={classes.menuLink}
              aria-label="Login to your account"
              to={authorized ? '/' : '/login'}
            >
              Login
            </CustomLink>
          </li>
          <li>
            {' '}
            <CustomLink
              className={classes.menuLink}
              aria-label="Create new account"
              to={authorized ? '/' : '/register'}
            >
              Sign Up
            </CustomLink>
          </li>
          {authorized && (
            <li>
              <Button
                shape="circular"
                onClick={() => {
                  setAuthorized(false);
                  void navigate({ to: '/login' });
                }}
              >
                Logout
              </Button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
