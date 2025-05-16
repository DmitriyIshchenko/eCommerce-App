import { makeStyles, tokens } from "@fluentui/react-components";
import Link from "../ui/links/fui";
import { useUser } from "../../hooks/use-user";

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
	const {authorized} = useUser();

	return (
		<div className={classes.header}>
			{!authorized && <Link to="/login">Login</Link>}
			{!authorized && <Link to="/registration">Registration</Link>}
		</div>
	);
}
