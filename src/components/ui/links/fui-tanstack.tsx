import {
	Link as FluentLink,
	type LinkProps as FluentLinkProps,
	makeStyles,
	mergeClasses,
	tokens,
} from "@fluentui/react-components";
import { type LinkComponent, createLink } from "@tanstack/react-router";
import { forwardRef } from "react";

const useCss = makeStyles({
	base: {
		":hover": { textDecoration: "none" },
		":active": { textDecoration: "none" },
		fontSize: tokens.fontSizeBase400,
		textDecoration: "none",
		userSelect: "none",
	},
	stick: {
		"::after": {
			height: "1px",
			display: "block",
			content: '""',
			width: 0,
			transition: `width ${tokens.durationFast} linear`,
			alignSelf: "start",
		},
		":hover::after": { width: "100%" },
	},
	straight: {
		"::after": {
			backgroundColor: tokens.colorNeutralForeground3Hover,
		},
		color: tokens.colorNeutralForeground1,
		":hover": {
			color: tokens.colorNeutralForeground3Hover,
		},
		":active": { color: tokens.colorNeutralForeground4 },
	},
	inverted: {
		"::after": {
			backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
		},
		color: tokens.colorBrandBackgroundInvertedPressed,
		":hover": {
			color: tokens.colorBrandBackgroundInvertedSelected,
		},
		":active": { color: tokens.colorBrandBackgroundInvertedHover },
	},
	muted: {
		color: tokens.colorNeutralForeground4,
		":hover": {
			color: tokens.colorNeutralForeground3Hover,
		},
		":active": { color: tokens.colorNeutralForeground1 },
	},
	accent: {
		fontWeight: tokens.fontWeightMedium,
	},
	notInteractive: {
		pointerEvents: "none",
	},
	block: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: tokens.spacingHorizontalS,
		paddingRight: tokens.spacingHorizontalS,
		height: "32px",
		minWidth: "32px",
		lineHeight: "1",
		paddingTop: "1px",
	},
	disabled: {
		opacity: 0.5,
	},
});

type StyledLinkProps = Omit<FluentLinkProps, "appearance" | "as"> &
	Omit<React.ComponentPropsWithoutRef<"a">, "type"> &
	Partial<{
		appearance: "straight" | "inverted" | "muted";
		as: "a";
		accent: boolean;
		asBlock: boolean;
		notInteractive: boolean;
	}>;

export const ExternalLink = forwardRef<HTMLAnchorElement, StyledLinkProps>(
	(
		{
			appearance = "straight",
			accent,
			asBlock,
			notInteractive,
			disabled,
			...props
		},
		ref,
	) => {
		const css = useCss();

		return (
			<FluentLink
				{...props}
				ref={ref}
				as="a"
				appearance="default"
				disabled={disabled}
				className={mergeClasses(
					css.base,
					appearance === "straight" && css.straight,
					appearance === "straight" && css.stick,
					appearance === "inverted" && css.inverted,
					appearance === "inverted" && css.stick,
					appearance === "muted" && css.muted,
					asBlock && css.block,
					accent && css.accent,
					notInteractive && css.notInteractive,
					disabled && css.disabled,
					props.className
				)}
			>
				{props.children}
			</FluentLink>
		);
	},
);

ExternalLink.displayName = "FluentLink";

const CreatedLinkComponent = createLink(ExternalLink);

export const InternalLink: LinkComponent<typeof ExternalLink> = (props) => {
	return <CreatedLinkComponent preload="intent" {...props} />;
};
