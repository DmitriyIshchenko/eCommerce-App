import { createFileRoute } from "@tanstack/react-router";
import { InternalLink } from "../../components/ui/links/fui-tanstack";

export const Route = createFileRoute("/catalog/")({
	component: RouteComponent,
});
function RouteComponent() {
	return (
		<main
			style={{
				padding: 20,
				display: "flex",
				flexDirection: "column",
				gap: 10,
				alignItems: "center",
			}}
		>
			<InternalLink
				to="/catalog/$category"
				params={{ category: "first" }}
			>
				First Category
			</InternalLink>
			<InternalLink
				to="/catalog/$category"
				params={{ category: "second" }}
			>
				Second Category
			</InternalLink>
			<InternalLink
				to="/catalog/$category"
				params={{ category: "third" }}
			>
				Third Category
			</InternalLink>
			<InternalLink
				to="/catalog/$category"
				params={{ category: "fourth" }}
			>
				Fourth Category
			</InternalLink>
			<InternalLink
				to="/catalog/$category"
				params={{ category: "all" }}
			>
				All Products
			</InternalLink>
		</main>
	);
}
