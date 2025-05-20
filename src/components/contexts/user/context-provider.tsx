import { useState, type ReactNode } from 'react';
import { UserContext } from './context';
import { AUTHORIZED_KEY } from '../../../lib/constants';

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [authorized, setAuthorizedState] = useState(() => {
    return localStorage.getItem(AUTHORIZED_KEY) === 'true';
  });
  const [isLoading, setIsLoading] = useState(false);

  const setAuthorized = (value: boolean) => {
    setAuthorizedState(value);
    if (value) {
      localStorage.setItem(AUTHORIZED_KEY, 'true');
    } else {
      localStorage.removeItem(AUTHORIZED_KEY);
    }
  };

  return (
    <UserContext.Provider value={{ authorized, setAuthorized, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}
