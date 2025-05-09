import type { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";

const ExampleContext = createContext<{ a: number; b: number; c: string; setA: React.Dispatch<React.SetStateAction<number>>; setB: React.Dispatch<React.SetStateAction<number>>; setC: React.Dispatch<React.SetStateAction<string>>; } | null>(null);

export function ExampleContextProvider({children}: {children: ReactNode}) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [c, setC] = useState("c");

  return (
    <ExampleContext.Provider value={{a,b,c,setA, setB, setC}}>
      {children}
    </ExampleContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useExample() {
  const contextValue = useContext(ExampleContext);
  if (!contextValue) throw new Error("must be used within a provider")
  return contextValue;
}