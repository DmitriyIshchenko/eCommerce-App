import { createContext } from 'react';

export const UserContext = createContext<{
  authorized: boolean;
  setAuthorized: (value: boolean) => void;
} | null>(null);
