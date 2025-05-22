import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  LargeTitle,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { DismissRegular, NavigationRegular } from '@fluentui/react-icons';
import { createLink, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useUser } from "../../hooks/use-user";
import Link from "../ui/links/fui";

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
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  menuLink: {
    textDecoration: 'none',
    color: tokens.colorNeutralForeground1,
    '&:hover': {
      textDecoration: 'underline',
      color: tokens.colorNeutralForeground1Hover,
    },
  },
  burgerButton: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'block',
    },
  },
  drawerMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalL,
    listStyle: 'none',
    margin: 0,
    paddingLeft: 0,
  },
  drawerMenuItem: {
    fontSize: '1.2rem',
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuItems = [
    {
      name: 'About',
      to: '/about',
      ariaLabel: 'Learn more about our company',
    },
    {
      name: 'Catalog',
      to: '/catalog',
      ariaLabel: 'Browse our product catalog',
    },
    {
      name: 'Login',
      to: authorized ? '/' : '/login',
      ariaLabel: 'Login to your account',
    },
    {
      name: 'Sign Up',
      to: authorized ? '/' : '/register',
      ariaLabel: 'Create new account',
    },
  ];

  const handleLogout = () => {
    setAuthorized(false);
    setIsDrawerOpen(false);
    void navigate({ to: '/login' });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600 && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isDrawerOpen]);

  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <CustomLink className={classes.title} aria-label="Celestia Art - Home" to="/">
          <LargeTitle className={classes.title}>Celestia Art</LargeTitle>
        </CustomLink>

        <ul className={classes.menu}>
          {menuItems.map((item) => (
            <li key={item.name}>
              <CustomLink className={classes.menuLink} aria-label={item.ariaLabel} to={item.to}>
                {item.name}
              </CustomLink>
            </li>
          ))}
          {authorized && (
            <li>
              <Button shape="circular" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          )}
        </ul>

        <Button
          className={classes.burgerButton}
          appearance="transparent"
          icon={<NavigationRegular />}
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open navigation menu"
        />

        <Drawer
          modalType="modal"
          type="overlay"
          separator
          open={isDrawerOpen}
          onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
          position="end"
          size="small"
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<DismissRegular />}
                  onClick={() => setIsDrawerOpen(false)}
                />
              }
            >
              Menu
            </DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody>
            <ul className={classes.drawerMenu}>
              {menuItems.map((item) => (
                <li key={item.name}>
                  <CustomLink
                    className={classes.drawerMenuItem}
                    aria-label={item.ariaLabel}
                    to={item.to}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    {item.name}
                  </CustomLink>
                </li>
              ))}
              {authorized && (
                <li>
                  <Button shape="circular" onClick={handleLogout}>
                    Logout
                  </Button>
                </li>
              )}
            </ul>
          </DrawerBody>
        </Drawer>
      </div>
    </header>
  );
}
