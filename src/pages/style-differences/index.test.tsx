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
import StyleDifferencesPage from '.';

describe('Ensure that page exists', () => {
  let titleElement: HTMLHeadingElement;

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
                <StyleDifferencesPage />
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
    titleElement = screen.getByText(/Differences Between Our Clean and Worn Styles/i);
  });

  test('Title exist', () => {
    expect(titleElement).toBeInTheDocument();
  });
});
