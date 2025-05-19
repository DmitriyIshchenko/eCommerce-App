import {
	Button,
	mergeClasses,
	type ButtonProps,
} from "@fluentui/react-components";
import { useCss } from "./css";

type Props = Omit<ButtonProps, "appearance" | "as"> &
	Omit<React.ComponentPropsWithoutRef<"button">, "type"> & {
		as?: "button";
		type?: "button" | "submit" | "reset";
		appearance?: ButtonProps["appearance"] | "tertiary";
	};

export default function CustomButton(props: Props) {
	const css = useCss();
	const { className, appearance, children, ...rest } = props;

	return (
		<Button
			as="button"
			appearance={appearance === "tertiary" ? "primary" : appearance}
			className={mergeClasses(className, appearance === "tertiary" && css.tertiary)}
			{...rest}
		>
			{children}
		</Button>
	);
}
