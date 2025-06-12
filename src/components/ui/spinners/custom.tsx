import {
	Spinner,
	type SpinnerProps,
	makeStyles,
	tokens,
} from "@fluentui/react-components";

const useCss = makeStyles({
	spinner: {
		"> span": {
			color: tokens.colorPaletteRoyalBlueBorderActive,
			width: "1em",
			height: "1em",
			"--fui-Spinner--strokeWidth": "0.125em"
		},
	},
});

export default function CustomSpinner(props: SpinnerProps) {
	const css = useCss();
	return <Spinner {...props} className={css.spinner} />;
}
