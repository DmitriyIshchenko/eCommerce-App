import { makeStyles, tokens } from "@fluentui/react-components";

const useClasses = makeStyles({
	header: {
		width: "100%",
		height: "3rem",
    padding: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorBackgroundOverlay,
	},
	"some-other-class": {
		color: "dimgray",
	}
});

export default function Header() {
	const classes = useClasses();

	return <div className={classes.header}>Header</div>;
}
