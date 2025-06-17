import {
  Button,
  LargeTitle,
  Link,
  makeStyles,
  tokens,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { createLink, useLocation, useNavigate, useRouteContext } from '@tanstack/react-router';
import { useUser } from '../../hooks/use-user';
import { useState, useEffect } from 'react';
import SearchButton from '../ui/buttons/search';
import BurgerButton from '../ui/buttons/burger';
import SplitLinkMenu from '../ui/menu/split-link';
import adaptCategoriesToSplitLinkMenuItemProp from '../../lib/utils/adapt-categories';
import { InternalLink } from '../ui/links/fui-tanstack';
import { CatalogTree } from '../../features/catalog-tree';
import SearchDrawer from '../../features/search-drawer';
import CartLink from '../ui/cart/link';
import { useCart } from '../../hooks/use-cart';

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
});

export function Header() {
  const CustomLink = createLink(Link);
  const classes = useClasses();
  const { authorized, logout } = useUser();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const { cart, cartLoading } = useCart();

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
    void logout();
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

  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <CustomLink className={classes.title} aria-label="Celestia Art - Home" to="/">
          <LargeTitle className={classes.title}>Celestia Art</LargeTitle>
        </CustomLink>

        <div style={{ display: 'flex' }}>
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
          </ul>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SearchButton onClick={() => setIsSearchDrawerOpen(true)} />

            <CartLink
              to="/cart"
              loading={cartLoading}
              size={30}
              goods={cart?.totalLineItemQuantity}
            />

            <BurgerButton
              className={classes.burgerButton}
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
            />
          </div>
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
              <li>
                <CatalogTree />
              </li>
              <li>
                <InternalLink
                  aria-label={about.ariaLabel}
                  to={about.to}
                  appearance="straight"
                  inline
                  active={about.to === pathname.split('/').slice(0, 2).join('/')}
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
            </ul>
          </DrawerBody>
        </Drawer>

        <SearchDrawer open={isSearchDrawerOpen} onOpenChange={setIsSearchDrawerOpen} />
      </div>
    </header>
  );
}
