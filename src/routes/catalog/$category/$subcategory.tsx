import { createFileRoute, useLocation } from "@tanstack/react-router";
import { InternalLink } from "../../../components/ui/links/fui-tanstack";

export const Route = createFileRoute("/catalog/$category/$subcategory")({
	component: RouteComponent,
	validateSearch: (search) =>
		search as {
			page: number;
			minPrice: number;
		},
	loaderDeps: ({ search: { page, minPrice } }) => ({
		page,
	}),
	loader: ({ deps: { page }, params: { category, subcategory, minPrice } }) =>
		[...Array(190).keys()]
			.map((i) => ({ category, subcategory, card: i + 1, minPrice }))
			.slice((page - 1) * 10, page * 10),
});

function RouteComponent() {
	const d = Route.useLoaderData();
	const {pathname} = useLocation();
	const links = pathname.split("/").slice(1);
	return (
		<div
			style={{
				display: "flex",
				gap: 20,
				flexWrap: "wrap",
				width: 1000,
				margin: "0 auto",
			}}
		>
			{d.map((v) => (
				<div
					key={v.card}
					style={{
						padding: 10,
						border: "1px solid blue",
						width: 200,
						height: 200,
					}}
				>
					<div>Category {v.category}</div>
					<div>Subcategory {v.subcategory}</div>
					<div>Card № {v.card}</div>
					<div>min price {v.minPrice}</div>
				</div>
			))}
		</div>
	);
}
