import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/catalog/$category/')({
	component: RouteComponent,
	validateSearch: (search) =>
		search as {
			page: number;
		},
	loaderDeps: ({ search: { page } }) => ({
		page,
	}),
	loader: ({ deps: { page },  params: { category} }) =>
		[...Array(190).keys()]
			.map((i) => ({ category, card: i + 1 }))
			.slice((page - 1) * 10, page * 10),
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
					<div>Card № {v.card}</div>
				</div>
			))}
		</div>
	);
}
