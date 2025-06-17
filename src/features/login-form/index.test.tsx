import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { beforeEach, describe, expect, test } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from './index';
import { UserContextProvider } from '../../components/contexts/user/context-provider';
import { LoadingContextProvider } from '../../components/contexts/loading/context-provider';
import { CartContextProvider } from '../../components/contexts/cart/context-provider';

describe('Ensure that input validation checks are performed in real-time when the user enters their information.', () => {
  let emailField: HTMLInputElement;
  let passwordField: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  const preFillWithValid = async () => {
    const fields = [emailField, passwordField];

    for (const field of fields) {
      await userEvent.clear(field);
    }

    await userEvent.type(emailField, 'user@example.com');
    await userEvent.type(passwordField, 'Password1!');
  };

  beforeEach(async () => {
    const rootRoute = createRootRoute();
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => (
        <CartContextProvider>
          <UserContextProvider>
            <LoadingContextProvider>
              <div data-testid="is-rendered">
                <LoginForm />
              </div>
            </LoadingContextProvider>
          </UserContextProvider>
        </CartContextProvider>
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

    emailField = screen.getByPlaceholderText(/you@example.com/i);
    passwordField = screen.getByPlaceholderText(/••••••••/i);
    submitButton = screen.getByRole('button', { name: /Login/i });

    await preFillWithValid();
  });
  test('Email: A properly formatted email address ', async () => {
    await userEvent.clear(emailField);
    await userEvent.click(emailField);
    await userEvent.keyboard('  askdfjlk');
    await userEvent.click(submitButton);
    let errorMessage = screen.getByText(/leading whitespace/i);
    expect(emailField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(emailField);

    await userEvent.click(emailField);
    await userEvent.keyboard('askdfjlk  ');
    await userEvent.click(submitButton);
    errorMessage = screen.getByText(/trailing whitespace/i);
    expect(emailField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(emailField);
  });
  test('Password: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number', async () => {
    await userEvent.clear(passwordField);
    await userEvent.click(passwordField);
    await userEvent.keyboard('a');
    await userEvent.click(submitButton);
    let errorMessage = screen.getByText(/at least 8 characters/i);
    expect(passwordField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(passwordField);

    await userEvent.click(passwordField);
    await userEvent.keyboard('aaaaaaaa');
    errorMessage = screen.getByText(/at least one uppercase letter/i);
    expect(passwordField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(passwordField);

    await userEvent.click(passwordField);
    await userEvent.keyboard('aaaaaaaaA');
    errorMessage = screen.getByText(/at least one digit/i);
    expect(passwordField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(passwordField);
  });
});
