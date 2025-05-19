import { Button, type ButtonProps } from "@fluentui/react-components";
import type { ReactNode } from "react";
import { useCss } from "./css";

export default function DarkButton({ children, type, shape }: { children: ReactNode, type?: "button" | "reset" | "submit", shape?: ButtonProps["shape"] }) {
	const css = useCss();
	return <Button appearance="primary" className={css.tertiary} type={type} shape={shape}>{children}</Button>;

}
