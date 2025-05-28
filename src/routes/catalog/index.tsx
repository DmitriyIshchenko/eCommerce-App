import { createFileRoute } from "@tanstack/react-router";
import { InternalLink } from "../../components/ui/links/fui-tanstack";

export const Route = createFileRoute("/catalog/")({
	component: RouteComponent,
});
function RouteComponent() {
	return (
		<main style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
			<InternalLink to="/catalog/$category" params={{ category: "first" }} search={{page: 1}}>
				First Category
			</InternalLink>
			<InternalLink to="/catalog/$category" params={{ category: "second" }} search={{page: 2}}>
				Second Category
			</InternalLink>
			<InternalLink to="/catalog/$category" params={{ category: "third" }} search={{page: 3}}>
				Third Category
			</InternalLink>
			<InternalLink to="/catalog/$category" params={{ category: "fourth" }} search={{page: 4}}>
				Fourth Category
			</InternalLink>
		</main>
	);
}
