import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import Header from '.';
import Login from '../../features/login';
import { useUser } from '../../hooks/use-user';
import { UserContextProvider } from '../contexts/user/context-provider';
import Registration from '../../features/registration';

const Wrapper = ({ isAuthorized, children }: { isAuthorized: boolean; children: ReactNode }) => {
  useUser().setAuthorized(isAuthorized);

  return <div data-testid="is-rendered">{children}</div>;
};

describe('Navigation to Login and Registration Pages for Unauthorized Users (15 points)', () => {
  beforeEach(async () => {
    const rootRoute = createRootRoute();
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => {
        return (
          <UserContextProvider>
            <Wrapper isAuthorized={false}>
              <Header />
            </Wrapper>
          </UserContextProvider>
        );
      },
    });
    const loginRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/login',
      component: () => {
        return (
          <UserContextProvider>
            <Wrapper isAuthorized={false}>
              <Header />
              <Login />
            </Wrapper>
          </UserContextProvider>
        );
      },
    });
    const registrationRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/registration',
      component: () => {
        return (
          <UserContextProvider>
            <Wrapper isAuthorized={false}>
              <Header />
              <Registration />
            </Wrapper>
          </UserContextProvider>
        );
      },
    });
    const testRouter = createRouter({
      routeTree: rootRoute.addChildren([indexRoute, loginRoute, registrationRoute]),
      history: createMemoryHistory({
        initialEntries: ['/'],
      }),
    });
    render(<RouterProvider router={testRouter} />);

    await waitFor(() => {
      expect(screen.getByTestId('is-rendered')).toBeInTheDocument();
    });
  });

  test('A clear and visible link for the login page is present for unauthorized users.', () => {
    const link = screen.getByRole('link', { name: 'Login' });
    expect(link).toBeVisible();
  });
  test('Clicking the link takes the user to the login page.', async () => {
    const link = screen.getByRole('link', { name: 'Login' });
    await userEvent.click(link);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText(/email/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/password/i)).toBeVisible();
  });
  test('A clear and visible link for the registration page is present for unauthorized users.', () => {
    const link = screen.getByRole('link', { name: 'Registration' });
    expect(link).toBeVisible();
  });
  test('Clicking the link takes the user to the registration page.', async () => {
    const link = screen.getByRole('link', { name: 'Registration' });
    await userEvent.click(link);
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText(/email/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/password/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/first name/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/last name/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/birth date/i)).toBeVisible();
  });
});
