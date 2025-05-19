import { type ReactNode, useState } from "react";
import { UserProvider } from "./provider";

export function UserContextProvider({ children }: { children: ReactNode }) {
	const [authorized, setAuthorized] = useState(false);

	return (
		<UserProvider value={{ authorized, setAuthorized }}>
			{children}
		</UserProvider>
	);
}
