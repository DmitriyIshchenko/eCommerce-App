import {
	Button,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerHeaderTitle,
	Switch,
	makeStyles,
	mergeClasses,
	tokens,
} from "@fluentui/react-components";
import {
	DismissRegular,
	WeatherMoonRegular,
	WeatherSunnyRegular,
} from "@fluentui/react-icons";
import {
	createLink,
	useLocation,
	useNavigate,
	useRouteContext,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import useMatchMediaQuery from "../../hooks/use-match-media";
import { useUser } from "../../hooks/use-user";
import type { Category } from "../../lib/schemas/product";
import { styleConstants } from "../../lib/style-constants";
import { useThemeContext } from "../contexts/theme/context";
import BurgerButton from "../ui/buttons/burger";
import CustomButton from "../ui/buttons/custom";
import SearchButton from "../ui/buttons/search";
import Cart from "../ui/cart";
import { InternalLink } from "../ui/links/fui-tanstack";
import SplitLinkMenu, { type MenuItemUnion } from "../ui/menu/split-link";
import StyledTooltip from "../ui/tooltips/styled";

function adaptCategoriesToSplitLinkMenuItemProp(
	categories: Category[],
	base: string,
): MenuItemUnion[] {
	const byId = new Map(categories.map((cat) => [cat.id, cat]));

	const getAncestorChain = (category: Category): Category[] => {
		return category.ancestors
			.map((a) => byId.get(a.id))
			.filter((c): c is Category => Boolean(c));
	};

	const buildMenuItem = (category: Category): MenuItemUnion => {
		const children = categories
			.filter((c) => c.parent?.id === category.id)
			.map(buildMenuItem);

		const ancestors = getAncestorChain(category);
		const root = ancestors[0] ?? category;

		const params: Record<string, string> = {
			category: root.name,
		};

		if (children.length > 0) {
			return {
				type: "parent",
				name: category.name,
				to: base,
				params,
				children,
			};
		}
		const splatParts = [
			...ancestors.slice(1).map((a) => a.name),
			category.name,
		];
		params._splat = splatParts.join("/");
		return {
			type: "child",
			name: category.name,
			to: base,
			params,
		};
	};

	return categories.filter((cat) => !cat.parent).map(buildMenuItem);
}

const useClasses = makeStyles({
	header: {
		display: "flex",
		justifyContent: "center",
		padding: `${tokens.spacingVerticalXXL}`,
		width: "100%",
		margin: "0 auto",
		boxSizing: "border-box",
		borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
	},
	headerContainer: {
		width: "100%",
		maxWidth: styleConstants.containerMaxWidth,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	menu: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: "1rem",
		listStyle: "none",
		textDecoration: "none",
		"@media (max-width: 600px)": {
			display: "none",
		},
	},
	menuLink: {
		textDecoration: "none",
		color: tokens.colorNeutralForeground1,
		"&:hover": {
			textDecoration: "underline",
			color: tokens.colorNeutralForeground1Hover,
		},
	},
	burgerButton: {
		display: "none",
		"@media (max-width: 600px)": {
			display: "block",
		},
	},
	drawerMenu: {
		display: "flex",
		flexDirection: "column",
		gap: tokens.spacingVerticalL,
		padding: tokens.spacingVerticalL,
		listStyle: "none",
		margin: 0,
		paddingLeft: 0,
	},
	drawerMenuItem: {
		textDecoration: "none",
		color: tokens.colorNeutralForeground1,
		"&:hover": {
			textDecoration: "underline",
			color: tokens.colorNeutralForeground1Hover,
		},
	},
});

export function Header() {
	const CustomLink = createLink(InternalLink);
	const classes = useClasses();
	const { authorized, setAuthorized } = useUser();
	const navigate = useNavigate();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { pathname } = useLocation();
	const { categories } = useRouteContext({
		from: "__root__",
	});
	const catalogMenuItems = adaptCategoriesToSplitLinkMenuItemProp(
		categories,
		"/catalog/$category/$",
	);

	const menuItems = [
		{
			name: "About",
			to: "/about",
			ariaLabel: "Learn more about our company",
		},
		{
			name: "Catalog",
			to: "/catalog",
			ariaLabel: "Browse our product catalog",
		},
		{
			name: "Login",
			to: authorized ? "/" : "/login",
			ariaLabel: "Login to your account",
		},
		{
			name: "Sign Up",
			to: authorized ? "/" : "/register",
			ariaLabel: "Create new account",
		},
	];

	const handleLogout = () => {
		setAuthorized(false);
		setIsDrawerOpen(false);
		void navigate({ to: "/login" });
	};

	const matchMedia = useMatchMediaQuery("(min-width: 640px)");
	useEffect(() => {
		if (matchMedia) setIsDrawerOpen(false);
	}, [matchMedia]);

	useEffect(() => {
		if (isDrawerOpen) {
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = "";
			};
		}
	}, [isDrawerOpen]);

	const { mode, setMode } = useThemeContext();

	return (
		<header className={mergeClasses(classes.header, "container")}>
			<div className={classes.headerContainer}>
				<ul className={classes.menu}>
					{menuItems.map((item) => (
						<li key={item.name}>
							<InternalLink
								aria-label={item.ariaLabel}
								to={item.to}
								appearance="straight"
								inline
								active={item.to === pathname.split("/").slice(0, 2).join("/")}
							>
								{item.name}
							</InternalLink>
						</li>
					))}
					<InternalLink
						to="/catalog/$category/$"
						params={{ category: "first", _splat: "first/second" }}
						appearance="straight"
						inline
					>
						Test
					</InternalLink>
					{authorized && (
						<li>
							<Button shape="circular" onClick={handleLogout}>
								Logout
							</Button>
						</li>
					)}
				</ul>
				<SearchButton tooltipPositioning={"before"} />
				<Switch
					onChange={(_, d) => {
						setMode(d.checked ? "dark" : "light");
					}}
					checked={mode === "dark"}
					indicator={
						<div
							style={{
								display: "flex",
								alignItems: "center",
								padding: 1.5,
								fontSize: 16,
							}}
						>
							{mode === "dark" ? (
								<WeatherMoonRegular />
							) : (
								<WeatherSunnyRegular />
							)}
						</div>
					}
				/>
				<Cart
					goods={99}
					size={30}
					to="/cart"
					loading
					tooltipPositioning={"before"}
				/>
				<BurgerButton
					tooltipPositioning={"before"}
					onClick={() => setIsDrawerOpen(true)}
				/>
				<SplitLinkMenu
					name="Catalog"
					to="/catalog"
					items={catalogMenuItems}
					active={pathname.split("/").slice(0, 2).join("/") === "/catalog"}
				/>
				<Drawer
					modalType="modal"
					type="overlay"
					separator
					open={isDrawerOpen}
					onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
					position="end"
					size="small"
				>
					<DrawerHeader>
						<DrawerHeaderTitle
							action={
								<StyledTooltip text="Close" positioning={"before"}>
									<div>
										<CustomButton
											appearance="subtle"
											aria-label="Close"
											shape="circular"
											icon={<DismissRegular />}
											onClick={() => setIsDrawerOpen(false)}
										/>
									</div>
								</StyledTooltip>
							}
						>
							Menu
						</DrawerHeaderTitle>
					</DrawerHeader>

					<DrawerBody>
						<ul className={classes.drawerMenu}>
							{menuItems.map((item) => (
								<li key={item.name}>
									<CustomLink
										className={classes.drawerMenuItem}
										aria-label={item.ariaLabel}
										to={item.to}
										onClick={() => setIsDrawerOpen(false)}
									>
										{item.name}
									</CustomLink>
								</li>
							))}
							{authorized && (
								<li>
									<Button shape="circular" onClick={handleLogout}>
										Logout
									</Button>
								</li>
							)}
						</ul>
					</DrawerBody>
				</Drawer>
			</div>
		</header>
	);
}
