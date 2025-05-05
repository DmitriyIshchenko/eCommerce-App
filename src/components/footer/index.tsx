import { makeStyles, tokens } from "@fluentui/react-components";

const useClasses = makeStyles({
	header: {
		width: "100%",
		height: "6rem",
    padding: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorBackgroundOverlay,
	},
});

export default function Footer() {
	const classes = useClasses();

	return <div className={classes.header}>Footer</div>;
}