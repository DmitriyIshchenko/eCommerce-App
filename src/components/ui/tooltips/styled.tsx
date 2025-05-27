import {
	Tooltip,
	type TooltipProps,
	makeStyles,
	tokens,
} from "@fluentui/react-components";

interface Props extends Partial<TooltipProps> {
	text: string;
}

const useCss = makeStyles({
	tooltip: {
		paddingBottom: tokens.spacingHorizontalXS,
		borderRadius: tokens.borderRadiusCircular,
	},
});

export default function StyledTooltip(props: Props) {
	const css = useCss();
	return (
		<Tooltip
			{...props}
			content={{ children: props.text, className: css.tooltip }}
			relationship="label"
			showDelay={100}
			hideDelay={100}
		>
			{props.children}
		</Tooltip>
	);
}
