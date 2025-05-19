import { useState, type ReactNode } from 'react';
import { UserContext } from './context';

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <UserContext.Provider value={{ authorized, setAuthorized, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}
