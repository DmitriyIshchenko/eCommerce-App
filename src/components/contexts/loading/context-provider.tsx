import { type ReactNode, useState } from "react";
import { LoadingProvider } from "./provider";

export function LoadingContextProvider({ children }: { children: ReactNode }) {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingProvider value={{ loading, setLoading }}>
			{children}
		</LoadingProvider>
	);
}
