import { createContext } from 'react';

export const UserContext = createContext<{
  authorized: boolean;
  setAuthorized: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);
