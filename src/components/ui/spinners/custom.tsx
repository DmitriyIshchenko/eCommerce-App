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
		},
	},
});

export default function CustomSpinner(props: SpinnerProps) {
	const css = useCss();
	return <Spinner {...props} className={css.spinner} />;
}
