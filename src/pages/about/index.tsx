import { LargeTitle } from "@fluentui/react-components";
import { useMainClasses } from "../../components/main-banner";

export default function AboutPage() {
	const classes = useMainClasses();
	return (
		<main className={classes.main}>
			<LargeTitle as="h1">About Page</LargeTitle>
		</main>
	);
}
