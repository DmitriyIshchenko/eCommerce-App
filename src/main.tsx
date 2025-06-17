import './styles/globals.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { FluentProvider, Toaster } from '@fluentui/react-components';
import { routeTree } from './routeTree.gen';
import { customTheme } from './styles/theme';
import { UserContextProvider } from './components/contexts/user/context-provider';
import { TOASTER_ID } from './lib/constants';
import { LoadingContextProvider } from './components/contexts/loading/context-provider';
import type { Category } from '@commercetools/platform-sdk';
import { CartContextProvider } from './components/contexts/cart/context-provider';

interface RouterContext {
  categories: Category[];
}

const router = createRouter({
  routeTree,
  context: {} as RouterContext,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <FluentProvider theme={customTheme}>
      <CartContextProvider>
        <UserContextProvider>
          <LoadingContextProvider>
            <RouterProvider router={router} />
            <Toaster toasterId={TOASTER_ID} />
          </LoadingContextProvider>
        </UserContextProvider>
      </CartContextProvider>
    </FluentProvider>
  </StrictMode>,
);
