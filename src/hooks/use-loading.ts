import { useContext } from "react";
import { LoadingContext } from "../components/contexts/loading/context";

export function useLoading() {
	const value = useContext(LoadingContext);
	if (!value) throw new Error("must be within a loading provider");
	return value;
}
