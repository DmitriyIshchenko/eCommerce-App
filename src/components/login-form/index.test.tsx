import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';
import Login from '../../features/login';
import { UserContextProvider } from '../contexts/user/context-provider';

describe('Ensure that input validation checks are performed in real-time when the user enters their information.', () => {
  let emailField: HTMLInputElement;
  let passwordField: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  beforeEach(async () => {
    const rootRoute = createRootRoute();
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => (
        <div data-testid="is-rendered">
          <UserContextProvider>
            <Login />
          </UserContextProvider>
        </div>
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
    emailField = screen.getByPlaceholderText(/email/i); // пользователь смотрит на экран и видит инпут с плейсхолдером  содержащим email
    passwordField = screen.getByPlaceholderText(/password/i);
    submitButton = screen.getByRole('button', { name: /submit/i }); // аналогично пользователь определяет кнопку по надписи содержащей submit
  });
  test('A properly formatted email address', async () => {
    await userEvent.click(emailField); // кликаем на инпут
    await userEvent.keyboard('  askdfjlk'); // печатаем невалидную строку
    await userEvent.click(submitButton); // кликаем на кнопку сабмит
    const errorMessage = screen.getByText(/leading whitespace/i); // ожидаем найти в форме сообщение об ошибке, содержающую фразу leading whitespace
    expect(emailField).toBeInvalid(); // проверяем доступность - поле должно быть инвалидно
    expect(errorMessage).toBeVisible(); // проверяем что пользователь видит сообщение
    await userEvent.clear(emailField); // очищаем инпут
    // проверяем остальные условия
  });
  test('Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number', async () => {
    await userEvent.click(passwordField); // кликаем на инпут
    await userEvent.keyboard('a');
    await userEvent.click(submitButton);
    const errorMessage = screen.getByText(/at least 8 characters/i);
    expect(passwordField).toBeInvalid();
    expect(errorMessage).toBeVisible();
    await userEvent.clear(passwordField);
    // проверяем остальные условия
  });
  test('next required condition', async () => {
    // играемся дальше по аналогии, сильно увлекаться не обязательно ;)
  });
});
