import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { beforeEach, describe, expect, test } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import FormRedirectLink from '.';
import { LoadingContextProvider } from '../../../components/contexts/loading/context-provider';
import { UserContextProvider } from '../../../components/contexts/user/context-provider';
import { CartContextProvider } from '../../../components/contexts/cart/context-provider';

describe('Ensure that page exists', () => {
  let likElement: HTMLAnchorElement;
  beforeEach(async () => {
    const rootRoute = createRootRoute();
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => (
        <LoadingContextProvider>
          <CartContextProvider>
            <UserContextProvider>
              <div data-testid="is-rendered">
                <FormRedirectLink
                  messageText="Already have an account?"
                  linkText="Log in"
                  to="/login"
                />
                ;
              </div>
            </UserContextProvider>
          </CartContextProvider>
        </LoadingContextProvider>
      ),
    });
    const testRouter = createRouter({
      routeTree: rootRoute.addChildren([indexRoute]),
      history: createMemoryHistory({
        initialEntries: ['/'],
      }),
    });
    render(<RouterProvider router={testRouter} />);

    await waitFor(() => {
      expect(screen.getByTestId('is-rendered')).toBeInTheDocument();
    });
    likElement = screen.getByText(/Log in/i);
  });

  test('Link exist', () => {
    expect(likElement).toBeInTheDocument();
  });
});
