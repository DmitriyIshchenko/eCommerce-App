import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { FluentProvider } from '@fluentui/react-components';
import './styles/globals.css';

import { routeTree } from './routeTree.gen';
import { customTheme } from './styles/theme';

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
      <RouterProvider router={router} />
    </FluentProvider>
  </StrictMode>,
);
