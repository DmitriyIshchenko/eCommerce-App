import { LargeTitle } from "@fluentui/react-components";
import { useMainClasses } from "../../components/main-banner";

export default function CatalogPage() {
	const classes = useMainClasses();
	return (
		<main className={classes.main}>
			<LargeTitle as="h1">Catalog Page</LargeTitle>
		</main>
	);
}
