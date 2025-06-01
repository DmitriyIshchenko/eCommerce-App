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
		paddingBottom: tokens.spacingVerticalS,
		paddingTop: tokens.spacingVerticalS,
		borderRadius: tokens.borderRadiusCircular,
		fontSize: tokens.fontSizeBase300
	},
});

export default function StyledTooltip(props: Props) {
	const css = useCss();
	return (
		<Tooltip
			{...props}
			content={{ children: props.text, className: css.tooltip }}
			relationship="label"
			showDelay={90}
			hideDelay={90}
		>
			{props.children}
		</Tooltip>
	);
}
