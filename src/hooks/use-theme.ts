import { useEffect, useState } from "react";
import type { ColorMode } from "../components/contexts/theme/context";
import useLs from "./use-ls";

export default function useTheme() {
	const { lsValue: savedMode, setLsValue: saveMode } = useLs("mode");

	let preferredMode: ColorMode = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches
		? "dark"
		: "light";

	if (!savedMode) saveMode(preferredMode);
	if (savedMode) preferredMode = savedMode === "dark" ? "dark" : "light";

	const [mode, setMode] = useState<ColorMode>(preferredMode);
	useEffect(() => {
		saveMode(mode);
	}, [mode, saveMode]);
	return { mode, setMode };
}
