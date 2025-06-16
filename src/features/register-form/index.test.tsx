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

import RegisterForm from './index';
import { UserContextProvider } from '../../components/contexts/user/context-provider';
import { LoadingContextProvider } from '../../components/contexts/loading/context-provider';
import { CartContextProvider } from '../../components/contexts/cart/context-provider';

describe('Ensure that input validation checks are performed in real-time when the user enters their information.', () => {
  let emailField: HTMLInputElement;
  let passwordField: HTMLInputElement;
  let firstNameField: HTMLInputElement;
  let lastNameField: HTMLInputElement;
  let streetField: HTMLInputElement[];
  let cityField: HTMLInputElement[];
  let postalCode: HTMLInputElement[];
  let submitButton: HTMLButtonElement;

  const preFillWithValid = async () => {
    const fields = [
      emailField,
      passwordField,
      firstNameField,
      lastNameField,
      streetField[0],
      postalCode[0],
      cityField[0],
    ];

    for (const field of fields) {
      await userEvent.clear(field);
    }

    await userEvent.type(emailField, 'email@example.com');
    await userEvent.type(passwordField, 'qqqQQQ111!!!');
    await userEvent.type(firstNameField, 'John');
    await userEvent.type(lastNameField, 'Doe');
    await userEvent.type(streetField[0], '23 Street');
    await userEvent.type(cityField[0], 'New York');
    await userEvent.type(postalCode[0], '12345');
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
                <RegisterForm />
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
    emailField = screen.getByPlaceholderText(/email/i);
    passwordField = screen.getByPlaceholderText(/password/i);
    firstNameField = screen.getByPlaceholderText(/Walter/i);
    lastNameField = screen.getByPlaceholderText(/White/i);

    cityField = screen.getAllByPlaceholderText(/Albuquerque/i);
    streetField = screen.getAllByPlaceholderText(/308 Negra Arroyo Lane/i);
    postalCode = screen.getAllByPlaceholderText(/Postal code/i);

    submitButton = screen.getByRole('button', { name: /Submit/i });

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

  test('First name: Must contain at least one character and no special characters or numbers', async () => {
    await userEvent.clear(firstNameField);
    await userEvent.click(firstNameField);
    await userEvent.keyboard('!');
    await userEvent.click(submitButton);
    let errorMessage = screen.getByText(/no special characters/i);
    expect(firstNameField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(firstNameField);

    await userEvent.click(firstNameField);
    await userEvent.keyboard('1');
    await userEvent.click(submitButton);
    errorMessage = screen.getByText(/no numbers/i);
    expect(firstNameField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(firstNameField);
  });

  test('Last name: Must contain at least one character and no special characters or numbers', async () => {
    await userEvent.clear(lastNameField);
    await userEvent.click(lastNameField);
    await userEvent.keyboard('!');
    await userEvent.click(submitButton);
    let errorMessage = screen.getByText(/no special characters/i);
    expect(lastNameField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(lastNameField);

    await userEvent.click(lastNameField);
    await userEvent.keyboard('1');
    await userEvent.click(submitButton);
    errorMessage = screen.getByText(/no numbers/i);
    expect(lastNameField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(lastNameField);
  });

  test('Street: Must contain at least one character', async () => {
    await userEvent.clear(streetField[0]);
    await userEvent.click(streetField[0]);
    await userEvent.click(submitButton);
    expect(streetField[0]).toBeInvalid();
    await userEvent.clear(streetField[0]);
  });

  test('City: Must contain at least one character and no special characters or numbers', async () => {
    await userEvent.clear(cityField[0]);
    await userEvent.click(cityField[0]);
    await userEvent.keyboard('!');
    await userEvent.click(submitButton);
    let errorMessage = screen.getByText(/no special characters/i);
    expect(cityField[0]).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(cityField[0]);

    await userEvent.click(cityField[0]);
    await userEvent.keyboard('1');
    await userEvent.click(submitButton);
    errorMessage = screen.getByText(/no numbers/i);
    expect(cityField[0]).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(cityField[0]);
  });
});
