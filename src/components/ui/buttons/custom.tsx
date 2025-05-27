import {
	Button,
	type ButtonProps,
	mergeClasses,
} from "@fluentui/react-components";
import { useCustomButtonCss } from "./css";

export type CustomButtonProps = Omit<
	ButtonProps,
	"appearance" | "as" | "size"
> &
	Omit<React.ComponentPropsWithoutRef<"button">, "type"> &
	Partial<{
		as: "button";
		type: "button" | "submit" | "reset";
		appearance: "straight" | "inverted" | "subtle";
	}>;

export default function CustomButton(props: CustomButtonProps) {
	const css = useCustomButtonCss();
	const { className, appearance, children, ...rest } = props;

	return (
		<Button
			as="button"
			appearance={"primary"}
			size="large"
			className={mergeClasses(
				css.base,
				appearance === "inverted" && css.inverted,
				appearance === "subtle" && css.subtle,
				className,
			)}
			{...rest}
		>
			{children}
		</Button>
	);
}
