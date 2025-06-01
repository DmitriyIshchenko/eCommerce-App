import {
	Toaster,
} from "@fluentui/react-components";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { UserContextProvider } from "../components/contexts/user/context-provider";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import CustomSpinner from "../components/ui/spinners/custom";
import useDebounceLoading from "../hooks/use-debounce-loading";
import { TOASTER_ID } from "../lib/constants";
import type { Category } from "../lib/schemas/product";

interface RouterContext {
	categories: Category[];
}

const fakeCategories: Category[] = [
	{ id: "1", ancestors: [{ id: "2" }, { id: "3" }], name: "first" },
	{ id: "2", parent: { id: "1" }, ancestors: [], name: "first" },
	{ id: "3", parent: { id: "1" }, ancestors: [], name: "second" },
	{ id: "4", ancestors: [{ id: "5" }, { id: "6" }], name: "second" },
	{ id: "5", parent: { id: "4" }, ancestors: [], name: "first" },
	{ id: "6", parent: { id: "4" }, ancestors: [], name: "second" },
	{ id: "7", ancestors: [{ id: "8" }], name: "third" },
	{
		id: "8",
		parent: { id: "7" },
		ancestors: [{ id: "9" }, { id: "10" }],
		name: "first",
	},
	{ id: "9", parent: { id: "8" }, ancestors: [], name: "first" },
	{ id: "10", parent: { id: "8" }, ancestors: [], name: "second" },
];

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	beforeLoad: () => ({ categories: fakeCategories }),
});

function RootComponent() {
	const isLoading = useDebounceLoading();
	return (
		<div style={{ position: "relative" }}>
			<UserContextProvider>
				{isLoading && (
					<CustomSpinner
						style={{
							position: "fixed",
							right: "50%",
							bottom: "50%",
							zIndex: 100,
							transform: "translateX(50%) translateY(50%)",
						}}
					/>
				)}
				<Header />
				<Outlet />
				<Footer />
			</UserContextProvider>
			<Toaster toasterId={TOASTER_ID} />
		</div>
	);
}
