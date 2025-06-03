import { useState, type ReactNode } from 'react';
import { UserContext } from './context';

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [authorized, setAuthorized] = useState(false);

  return (
    <UserContext.Provider value={{ authorized, setAuthorized }}>{children}</UserContext.Provider>
  );
}
