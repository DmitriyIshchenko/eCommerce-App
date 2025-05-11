import { makeStyles, tokens } from "@fluentui/react-components";
import Link from "../ui/links/fui";

const useClasses = makeStyles({
	header: {
		width: "100%",
		height: "3rem",
		padding: tokens.spacingHorizontalS,
		backgroundColor: tokens.colorBackgroundOverlay,
	},
});

export default function Header() {
	const classes = useClasses();

	return (
		<div className={classes.header}>
			<Link to="/login">Login</Link>
		</div>
	);
}
