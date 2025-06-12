import type { Category } from "@commercetools/platform-sdk";
import { Toaster } from "@fluentui/react-components";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { UserContextProvider } from "../components/contexts/user/context-provider";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import CustomSpinner from "../components/ui/spinners/custom";
import useDebounceLoading from "../hooks/use-debounce-loading";
import { getCategories } from "../lib/api/get-categories";
import ErrorPage from "../pages/error-page";
import { TOASTER_ID } from "../lib/constants/constants";

interface RouterContext {
	categories: Category[];
}

let categories: Category[] | undefined;

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,

	beforeLoad: async () => {
		categories ??= await getCategories();

		if (!categories) {
			throw new Error("Categories not found");
		}

		return { categories };
	},

	notFoundComponent: () => <ErrorPage />,
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
