import type { Category } from '@commercetools/platform-sdk';
import { createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import './styles/globals.css';
import ThemeProvider from './components/contexts/theme/provider';
import App from './components/app';

interface RouterContext {
  categories: Category[];
}

export const router = createRouter({
  routeTree,
  context: {} as RouterContext,
  defaultViewTransition: true,
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
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
