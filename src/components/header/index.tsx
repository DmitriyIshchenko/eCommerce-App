import { makeStyles, tokens } from "@fluentui/react-components";
import { Link } from "@tanstack/react-router";

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

	return <div className={classes.header}>Header<Link to={'/examples'}>Examples</Link></div>;
}
