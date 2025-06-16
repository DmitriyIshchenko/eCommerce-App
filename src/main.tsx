import type { Category } from '@commercetools/platform-sdk';
import { FluentProvider, Toaster } from '@fluentui/react-components';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LoadingContextProvider } from './components/contexts/loading/context-provider';
import { UserContextProvider } from './components/contexts/user/context-provider';
import { lightTheme } from './components/theme/light';
import { TOASTER_ID } from './lib/constants/constants';
import { routeTree } from './routeTree.gen';
import './styles/globals.css';

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
    <FluentProvider theme={lightTheme}>
      <UserContextProvider>
        <LoadingContextProvider>
          <RouterProvider router={router} />
          <Toaster toasterId={TOASTER_ID} />
        </LoadingContextProvider>
      </UserContextProvider>
    </FluentProvider>
  </StrictMode>,
);
