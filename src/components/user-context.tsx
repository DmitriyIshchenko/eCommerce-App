import { createContext, useContext, useState, type ReactNode } from "react";

const UserContext = createContext<{ authorized: boolean; setAuthorized: React.Dispatch<React.SetStateAction<boolean>>; } | null>(null);

export function UserContextProvider({children}:{children: ReactNode}) {
  const [authorized, setAuthorized] = useState(false);
  return (
    <UserContext.Provider value={{authorized, setAuthorized}}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const value = useContext(UserContext);
  if (!value) throw new Error("must be within a provider");
  return value;
}