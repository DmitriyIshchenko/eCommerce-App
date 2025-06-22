import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Switch,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { DismissRegular, WeatherMoonRegular, WeatherSunnyRegular } from '@fluentui/react-icons';
import { useLocation, useNavigate, useRouteContext } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { CatalogTree } from '../../features/catalog-tree';
import SearchDrawer from '../../features/search-drawer';
import useScrollDirection from '../../hooks/use-scroll-direction';
import { useUser } from '../../hooks/use-user';
import adaptCategoriesToSplitLinkMenuItemProp from '../../lib/utils/adapt-categories';
import { useThemeContext } from '../contexts/theme/context';
import BurgerButton from '../ui/buttons/burger';
import SearchButton from '../ui/buttons/search';
import LogoIcon from '../ui/icons/logo';
import { InternalLink } from '../ui/links/fui-tanstack';
import SplitLinkMenu from '../ui/menu/split-link';

const useClasses = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 20px',
    backgroundColor: tokens.colorNeutralBackground1,
    top: 0,
    zIndex: 10,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    position: 'sticky',
    transition: `transform ${tokens.durationSlow}`,
    willChange: 'transform',
    transformOrigin: 'top center',
    anchorName: '--headerAnchor',
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
    marginRight: tokens.spacingHorizontalMNudge,
    '@media (max-width: 768px)': {
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
    '@media (max-width: 768px)': {
      display: 'flex',
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
  logo: {
    filter: 'drop-shadow(3px 3px 1px rgba(0, 0, 0, 0.4))',
    transition: `stroke-width ${tokens.durationSlow}`,
    strokeWidth: '0',
    ':hover': {
      strokeWidth: '0.25px',
    },
  },
  themeSwitch: {
    '> .fui-Switch__indicator': {
      margin: 0,
    },
    '> .fui-switch-input': {
      width: 'auto',
    },
  },
});

export function Header() {
  const classes = useClasses();
  const { authorized, logout } = useUser();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);

  const { pathname } = useLocation();
  const { categories } = useRouteContext({
    from: '__root__',
  });
  const catalogMenuItems = adaptCategoriesToSplitLinkMenuItemProp(
    categories,
    '/catalog/$category/$',
  );

  const about = {
    name: 'About',
    to: '/about',
    ariaLabel: 'Learn more about our company',
  };

  const authMenu = [
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

  const account = {
    name: 'Account',
    to: '/account',
    ariaLabel: 'Customer account',
  };

  const handleLogout = () => {
    logout();
    setIsDrawerOpen(false);
    void navigate({ to: '/login' });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isDrawerOpen) {
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

  const { mode, setMode } = useThemeContext();
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={classes.header}
      style={{
        transform: scrollDirection === 'down' ? 'scale(1, 0)' : 'scale(1, 1)',
      }}
    >
      <InternalLink to="/" appearance="stickless">
        <LogoIcon className={classes.logo} />
      </InternalLink>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ul className={classes.menu}>
          <li>
            <SplitLinkMenu
              name="Catalog"
              to="/catalog"
              items={catalogMenuItems}
              active={pathname.split('/').slice(0, 2).join('/') === '/catalog'}
            />
          </li>
          <li>
            <InternalLink
              aria-label={about.ariaLabel}
              to={about.to}
              appearance="straight"
              inline
              active={about.to === pathname.split('/').slice(0, 2).join('/')}
              viewTransition={{ types: ['warp'] }}
            >
              {about.name}
            </InternalLink>
          </li>
          {!authorized &&
            authMenu.map((item) => (
              <li key={item.name}>
                <InternalLink
                  aria-label={item.ariaLabel}
                  to={item.to}
                  appearance="straight"
                  inline
                  active={item.to === pathname.split('/').slice(0, 2).join('/')}
                >
                  {item.name}
                </InternalLink>
              </li>
            ))}
          {authorized && (
            <>
              <li key={account.name}>
                <InternalLink
                  aria-label={account.ariaLabel}
                  to={account.to}
                  appearance="straight"
                  inline
                  active={account.to === pathname.split('/').slice(0, 2).join('/')}
                >
                  {account.name}
                </InternalLink>
              </li>
              <li>
                <Button size="large" shape="circular" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>
          )}
          <li>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacingHorizontalM,
                marginLeft: 12,
              }}
            >
              <SearchButton onClick={() => setIsSearchDrawerOpen(true)} />
              <Switch
                className={classes.themeSwitch}
                onChange={(_, d) => {
                  setMode(d.checked ? 'dark' : 'light');
                }}
                checked={mode === 'dark'}
                indicator={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 1.5,
                      fontSize: 16,
                    }}
                  >
                    {mode === 'dark' ? <WeatherMoonRegular /> : <WeatherSunnyRegular />}
                  </div>
                }
              />
            </div>
          </li>
        </ul>
        <BurgerButton
          className={classes.burgerButton}
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open navigation menu"
        />
      </div>

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
            <li onClick={() => setIsDrawerOpen(false)}>
              <CatalogTree />
            </li>
            <li>
              <InternalLink
                aria-label={about.ariaLabel}
                to={about.to}
                appearance="straight"
                inline
                active={about.to === pathname.split('/').slice(0, 2).join('/')}
                viewTransition={{ types: ['warp'] }}
                onClick={() => setIsDrawerOpen(false)}
              >
                {about.name}
              </InternalLink>
            </li>

            {!authorized &&
              authMenu.map((item) => (
                <li key={item.name}>
                  <InternalLink
                    aria-label={item.ariaLabel}
                    to={item.to}
                    appearance="straight"
                    inline
                    active={item.to === pathname.split('/').slice(0, 2).join('/')}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    {item.name}
                  </InternalLink>
                </li>
              ))}
            {authorized && (
              <>
                <li key={account.name}>
                  <InternalLink
                    aria-label={account.ariaLabel}
                    to={account.to}
                    appearance="straight"
                    inline
                    active={account.to === pathname.split('/').slice(0, 2).join('/')}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    {account.name}
                  </InternalLink>
                </li>
                <li onClick={() => setIsDrawerOpen(false)}>
                  <Button size="large" shape="circular" onClick={handleLogout}>
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </DrawerBody>
      </Drawer>
      <SearchDrawer open={isSearchDrawerOpen} onOpenChange={setIsSearchDrawerOpen} />
    </header>
  );
}
