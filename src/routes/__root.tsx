import { Spinner, Toaster } from "@fluentui/react-components";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { UserContextProvider } from "../components/contexts/user/context-provider";
import useDebounceLoading from "../hooks/use-debounce-loading";
import { TOASTER_ID } from "../lib/constants";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const isLoading = useDebounceLoading();
	return (
		<div style={{ position: "relative" }}>
			<UserContextProvider>
				{isLoading && (
					<Spinner
						style={{
							position: "absolute",
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
