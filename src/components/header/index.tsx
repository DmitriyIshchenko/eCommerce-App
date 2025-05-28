import {
	Button,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerHeaderTitle,
	makeStyles,
	mergeClasses,
	tokens,
} from "@fluentui/react-components";
import { DismissRegular, NavigationRegular } from "@fluentui/react-icons";
import { createLink, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/use-user";
import { styleConstants } from "../../lib/style-constants";
import Cart from "../cart";
import BurgerButton from "../ui/buttons/burger";
import SearchButton from "../ui/buttons/search";
import { InternalLink } from "../ui/links/fui-tanstack";

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

	const menuItems = [
		{
			name: "About",
			to: "/about",
			ariaLabel: "Learn more about our company",
		},
		{
			name: "Catalog",
			to: "/catalog/all",
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

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 600 && isDrawerOpen) {
				setIsDrawerOpen(false);
			}
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isDrawerOpen]);

	useEffect(() => {
		if (isDrawerOpen) {
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = "";
			};
		}
	}, [isDrawerOpen]);

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
							>
								{item.name}
							</InternalLink>
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
				<BurgerButton tooltipPositioning={"before"} />
				<SearchButton tooltipPositioning={"before"} />
				<Cart
					goods={99}
					size={30}
					to="/cart"
					loading
					tooltipPositioning={"before"}
				/>
				<Button
					className={classes.burgerButton}
					appearance="transparent"
					icon={<NavigationRegular />}
					onClick={() => setIsDrawerOpen(true)}
					aria-label="Open navigation menu"
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
								<Button
									appearance="subtle"
									aria-label="Close"
									icon={<DismissRegular />}
									onClick={() => setIsDrawerOpen(false)}
								/>
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
