import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { beforeEach, describe, expect, test } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { UserContextProvider } from '../../components/contexts/user/context-provider';
import { LoadingContextProvider } from '../../components/contexts/loading/context-provider';
import { CartContextProvider } from '../../components/contexts/cart/context-provider';
import CartPage from '.';

describe('Cart page', () => {
  let emptyCartMessage: HTMLHeadingElement;
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
                <CartPage />
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
    emptyCartMessage = screen.getByText(/is empty/i);
  });

  test('Empty cart message is shown for an empty cart', () => {
    expect(emptyCartMessage).toBeInTheDocument();
  });
});
