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

import PersonalEditForm from './personal-edit-form';
import { UserContextProvider } from '../../components/contexts/user/context-provider';
import { LoadingContextProvider } from '../../components/contexts/loading/context-provider';
import { CartContextProvider } from '../../components/contexts/cart/context-provider';

describe('PersonalEditForm validation tests', () => {
  let emailField: HTMLInputElement;
  let firstNameField: HTMLInputElement;
  let lastNameField: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  const preFillWithValid = async () => {
    const fields = [emailField, firstNameField, lastNameField];

    for (const field of fields) {
      await userEvent.clear(field);
    }

    await userEvent.type(emailField, 'valid@example.com');
    await userEvent.type(firstNameField, 'John');
    await userEvent.type(lastNameField, 'Doe');
  };

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
                <PersonalEditForm />
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

    emailField = screen.getByPlaceholderText(/email@example.com/i);
    firstNameField = screen.getByPlaceholderText(/Walter/i);
    lastNameField = screen.getByPlaceholderText(/White/i);
    submitButton = screen.getByRole('button', { name: /Save/i });

    await preFillWithValid();
  });

  describe('Email field validation', () => {
    test('should show error for empty email', async () => {
      await userEvent.clear(emailField);
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Required field/i);
      expect(emailField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for email with leading whitespace', async () => {
      await userEvent.clear(emailField);
      await userEvent.type(emailField, '  invalid@example.com');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must not contain leading whitespace/i);
      expect(emailField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for email with trailing whitespace', async () => {
      await userEvent.clear(emailField);
      await userEvent.type(emailField, 'invalid@example.com  ');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must not contain trailing whitespace/i);
      expect(emailField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for email missing @ symbol', async () => {
      await userEvent.clear(emailField);
      await userEvent.type(emailField, 'invalid.example.com');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must contain a separating "@" symbol/i);
      expect(emailField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for email missing domain', async () => {
      await userEvent.clear(emailField);
      await userEvent.type(emailField, 'invalid@');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must contain a domain name/i);
      expect(emailField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });
  });

  describe('First name field validation', () => {
    test('should show error for empty first name', async () => {
      await userEvent.clear(firstNameField);
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Required field/i);
      expect(firstNameField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for first name with special characters', async () => {
      await userEvent.clear(firstNameField);
      await userEvent.type(firstNameField, 'John!');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must contain no special characters/i);
      expect(firstNameField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for first name with numbers', async () => {
      await userEvent.clear(firstNameField);
      await userEvent.type(firstNameField, 'John1');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must contain no numbers/i);
      expect(firstNameField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for first name with non-English letters', async () => {
      await userEvent.clear(firstNameField);
      await userEvent.type(firstNameField, 'Jöhn');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must contain only English letters/i);
      expect(firstNameField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });
  });

  describe('Last name field validation', () => {
    test('should show error for empty last name', async () => {
      await userEvent.clear(lastNameField);
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Required field/i);
      expect(lastNameField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for last name with special characters', async () => {
      await userEvent.clear(lastNameField);
      await userEvent.type(lastNameField, 'Doe!');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must contain no special characters/i);
      expect(lastNameField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for last name with numbers', async () => {
      await userEvent.clear(lastNameField);
      await userEvent.type(lastNameField, 'Doe1');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must contain no numbers/i);
      expect(lastNameField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });

    test('should show error for last name with non-English letters', async () => {
      await userEvent.clear(lastNameField);
      await userEvent.type(lastNameField, 'Döe');
      await userEvent.click(submitButton);
      const errorMessage = screen.getByText(/Must contain only English letters/i);
      expect(lastNameField).toBeInvalid();
      expect(errorMessage).toBeVisible();
    });
  });
});
