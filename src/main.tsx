import './styles/globals.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { FluentProvider } from '@fluentui/react-components';
import { routeTree } from './routeTree.gen';
import { customTheme } from './styles/theme';
import { UserContextProvider } from './components/contexts/user/context-provider';

const router = createRouter({ routeTree });

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
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </FluentProvider>
  </StrictMode>,
);
