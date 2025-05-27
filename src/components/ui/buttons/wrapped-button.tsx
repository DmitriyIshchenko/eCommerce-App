import { Button, type ButtonProps } from "@fluentui/react-components";
import type { ReactNode } from "react";
import { useCustomButtonCss } from "./css";

export default function DarkButton({
	children,
	type,
	shape,
}: {
	children: ReactNode;
	type?: "button" | "reset" | "submit";
	shape?: ButtonProps["shape"];
}) {
	const css = useCustomButtonCss();
	return (
		<Button
			appearance="primary"
			className={css.inverted}
			type={type}
			shape={shape}
		>
			{children}
		</Button>
	);
}
