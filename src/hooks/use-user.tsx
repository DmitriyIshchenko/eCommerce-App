import { useContext } from "react";
import { UserContext } from "../components/contexts/user/context";

export function useUser() {
	const value = useContext(UserContext);
	if (!value) throw new Error("must be within a provider");
	return value;
}
