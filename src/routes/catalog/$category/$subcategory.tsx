import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/catalog/$category/$subcategory")({
	component: RouteComponent,
	validateSearch: (search) =>
		search as {
			page?: number;
			"min-price"?: number;
		},
	loaderDeps: ({ search }) => ({
		page: search.page,
		"min-price": search["min-price"],
	}),
	loader: ({ deps, params: { category, subcategory } }) =>
		[...Array(190).keys()]
			.map((i) => ({ category, subcategory, card: i + 1, "min-price": deps["min-price"] }))
			.slice(((deps.page ?? 1) - 1) * 10, (deps.page ?? 1) * 10),
});

function RouteComponent() {
	const d = Route.useLoaderData();

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
					<div>min price {v["min-price"]}</div>
				</div>
			))}
		</div>
	);
}
