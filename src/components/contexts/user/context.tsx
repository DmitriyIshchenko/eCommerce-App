import { createContext } from "react";

export const UserContext = createContext<{ authorized: boolean; setAuthorized: React.Dispatch<React.SetStateAction<boolean>>; } | null>(null);


