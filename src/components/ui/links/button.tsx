import {
	makeStyles,
	mergeClasses,
	shorthands,
	tokens,
} from "@fluentui/react-components";
import Link from "./fui";
import type { ReactNode } from "react";

const useCss = makeStyles({
	button: {
		padding: "1rem 2rem",
		borderRadius: "2rem",
		textTransform: "uppercase",
		display: "flex",
		alignItems: "center",
		fontWeight: "500",
		width: "fit-content",
		":hover": {
			textDecoration: "none",
			"&>div": {
				transform: "scaleX(1)",
				width: "28px",
				opacity: "1",
				paddingLeft: "0.5rem",
			},
		},
		":active": {
			textDecoration: "none",
		},
	},
	icon: {
		transform: "scaleX(0)",
		paddingLeft: "0",
		display: "flex",
		transition: `transform ${tokens.durationSlow}, width ${tokens.durationSlow}, opacity ${tokens.durationNormal}, padding-left ${tokens.durationSlow}`,
		width: "0",
		opacity: "0",
	},
	outline: {
		...shorthands.borderWidth("2px"),
		...shorthands.borderStyle("solid"),
	},
	outlineStraight: {
		color: tokens.colorNeutralForeground1,
		...shorthands.borderColor(tokens.colorNeutralForeground1),
		":hover": {
			color: tokens.colorNeutralForeground1,
		},
	},
	outlineInverted: {
		color: tokens.colorNeutralBackground1,
		...shorthands.borderColor(tokens.colorNeutralBackground1),
		":hover": {
			color: tokens.colorNeutralBackground1,
		},
	},
	filledStraight: {
		color: tokens.colorNeutralForeground1,
		backgroundColor: tokens.colorNeutralBackground1,
		":hover": {
			color: tokens.colorNeutralForeground1,
		},
		...shorthands.borderWidth("0"),
	},
	filledInverted: {
		color: tokens.colorNeutralBackground1,
		backgroundColor: tokens.colorNeutralForeground1,
		":hover": {
			color: tokens.colorNeutralBackground1,
		},
		...shorthands.borderWidth("0"),
	},
});

export default function ButtonLink({
	to,
	text,
	icon,
	appearance = "outline",
	color = "straight",
}: {
	to: string;
	text: string;
	icon?: ReactNode;
	appearance?: "outline" | "filled";
	color?: "straight" | "inverted";
}) {
	const css = useCss();
	return (
		<Link
			to={to}
			className={mergeClasses(
				css.button,
				css.outline,
				appearance === "filled" && color === "straight" && css.filledStraight,
				appearance === "filled" && color === "inverted" && css.filledInverted,
				appearance === "outline" && css.outline,
				appearance === "outline" && color === "straight" && css.outlineStraight,
				appearance === "outline" && color === "inverted" && css.outlineInverted,
			)}
		>
			<p style={{ margin: 0 }}>{text}</p>
			<div className={css.icon}>{icon}</div>
		</Link>
	);
}
