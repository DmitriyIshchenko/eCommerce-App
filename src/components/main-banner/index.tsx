import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerHeaderTitle,
	Label,
	makeStyles,
	tokens,
} from "@fluentui/react-components";
import { ArrowRightFilled, DismissRegular } from "@fluentui/react-icons";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import debounce from "../../lib/utils/debounce";
import Cart from "../cart";
import CustomButton from "../ui/buttons/custom";
import FilterButton from "../ui/buttons/filter";
import { CardExample } from "../ui/cards";
import DeliveryCarIcon from "../ui/icons/delivery-car";
import DispatchClock from "../ui/icons/dispatch-clock";
import StoreIcon from "../ui/icons/store";
import ButtonLink from "../ui/links/button";
import { InternalLink } from "../ui/links/fui-tanstack";
import Pagination from "../ui/pagination";
import MinMaxDoubleSlider from "../ui/sliders/min-max-double";
import LargeSwatchPicker from "../ui/swatch-picker";
import StyledTooltip from "../ui/tooltips/styled";

export const useMainClasses = makeStyles({
	main: {
		minHeight: "calc(100vh - 100px)",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		maxWidth: "1440px",
		boxSizing: "border-box",
		margin: "0 auto",
	},
	colorNeutralForeground1: {
		backgroundColor: tokens.colorNeutralForeground1,
	},
	colorNeutralForeground3Hover: {
		backgroundColor: tokens.colorNeutralForeground3Hover,
	},
	colorNeutralStrokeAccessibleHover: {
		backgroundColor: tokens.colorNeutralStrokeAccessibleHover,
	},
	colorNeutralForeground4: {
		backgroundColor: tokens.colorNeutralForeground4,
	},
	colorNeutralStencil1: {
		backgroundColor: tokens.colorNeutralStencil1,
	},
	colorStrokeFocus2: {
		backgroundColor: tokens.colorStrokeFocus2,
	},
	colorPaletteRoyalBlueForeground2: {
		backgroundColor: tokens.colorPaletteRoyalBlueForeground2,
	},
	colorPaletteRoyalBlueBorderActive: {
		backgroundColor: tokens.colorPaletteRoyalBlueBorderActive,
	},
	colorNeutralStroke1: {
		backgroundColor: tokens.colorNeutralStroke1,
	},
	colorNeutralStroke1Hover: {
		backgroundColor: tokens.colorNeutralStroke1Hover,
	},
	colorNeutralStroke1Pressed: {
		backgroundColor: tokens.colorNeutralStroke1Pressed,
	},
});

export function MainBanner() {
	const classes = useMainClasses();

	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const { search } = useLocation();

	const s = useSearch({ from: "/" });

	const handleMinMaxChange = (min: number, max: number) => {
		void navigate({
			search: {
				...search,
				minPrice: min,
				maxPrice: max,
				page: 1,
			},
		});
	};
	const handleColorChange = (color: string) => {
		void navigate({
			search: {
				...search,
				color,
				page: 1,
			},
		});
	};

	const colors = [
		{ color: "#FF1921", value: "red", "aria-label": "red" },
		{ color: "#FF7A00", value: "orange", "aria-label": "orange" },
		{ color: "#90D057", value: "lightGreen", "aria-label": "light green" },
	];

	const [cartQ, setCardQ] = useState(50);
	const [cartLoading, setCartLoading] = useState(false);

	return (
		<div>
			<div>
				<CardExample
					onClick={() => {
						setCartLoading(true);
						setTimeout(() => setCartLoading(false), 1000);
						setCardQ(cartQ + 1);
					}}
				/>
				<Cart
					goods={cartQ}
					size={40}
					to="/cart"
					loading={cartLoading}
					tooltipPositioning={"before"}
				/>
			</div>
			<main className={classes.main}>
				<Pagination total={20} searchParamName="page" />
				<div style={{ position: "fixed", top: 110, right: 20 }}>
					<FilterButton onClick={() => setOpen(true)} />
					<Drawer
						modalType="modal"
						type="overlay"
						separator
						open={open}
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
												onClick={() => setOpen(false)}
											/>
										</div>
									</StyledTooltip>
								}
							>
								Filters
							</DrawerHeaderTitle>
						</DrawerHeader>

						<DrawerBody>
							<MinMaxDoubleSlider
								onChange={debounce(handleMinMaxChange, 200)}
							/>
							<div style={{ marginTop: 20 }}>
								<Label>Colors</Label>
							</div>
							<LargeSwatchPicker colors={colors} onChange={handleColorChange} />
						</DrawerBody>
					</Drawer>
				</div>
			</main>
			<DeliveryCarIcon width={48} height={48} />
			<DispatchClock width={48} height={48} strokeWidth={0.6} />
			<StoreIcon width={48} height={48} strokeWidth={0.35} />
			<div
				style={{ display: "flex", gap: 4, padding: 4, alignItems: "center" }}
			>
				<ButtonLink
					to="/"
					text="link outline straight"
					icon={<ArrowRightFilled style={{ fontSize: 20 }} />}
				/>
				<ButtonLink
					to="/"
					text="link filled inverted"
					icon={<ArrowRightFilled style={{ fontSize: 20 }} />}
					appearance="filled"
					inverted
				/>
				<CustomButton shape="circular">Button Straight</CustomButton>
				<CustomButton shape="circular" appearance="inverted">
					Button Inverted
				</CustomButton>
			</div>
			<div
				style={{
					display: "flex",
					gap: 4,
					background: "black",
					padding: 4,
					alignItems: "center",
				}}
			>
				<ButtonLink
					to="/"
					text="link outline inverted"
					icon={<ArrowRightFilled style={{ fontSize: 20 }} />}
					inverted
				/>
				<ButtonLink
					to="/"
					text="link filled inverted"
					icon={<ArrowRightFilled style={{ fontSize: 20 }} />}
					appearance="filled"
				/>
				<CustomButton shape="circular" appearance="inverted">
					Button Inverted
				</CustomButton>
			</div>
			<InternalLink to="/" appearance="muted">
				muted link
			</InternalLink>
			<div style={{ color: "white" }} className={classes.colorStrokeFocus2}>
				colorStrokeFocus2
			</div>
			<div
				style={{ color: "white" }}
				className={classes.colorNeutralForeground1}
			>
				colorNeutralForeground1
			</div>
			<div
				style={{ color: "white" }}
				className={classes.colorNeutralForeground3Hover}
			>
				colorNeutralForeground3Hover
			</div>
			<div
				style={{ color: "white" }}
				className={classes.colorNeutralStrokeAccessibleHover}
			>
				colorNeutralStrokeAccessibleHover
			</div>
			<div
				style={{ color: "white" }}
				className={classes.colorNeutralForeground4}
			>
				colorNeutralForeground4
			</div>
			<div
				style={{ color: "white" }}
				className={classes.colorNeutralStroke1Pressed}
			>
				colorNeutralStroke1Pressed
			</div>
			<div
				style={{ color: "white" }}
				className={classes.colorNeutralStroke1Hover}
			>
				colorNeutralStroke1Hover
			</div>
			<div style={{ color: "white" }} className={classes.colorNeutralStroke1}>
				colorNeutralStroke1
			</div>

			<div style={{ color: "white" }} className={classes.colorNeutralStencil1}>
				colorNeutralStencil1
			</div>
			<div
				style={{ color: "white" }}
				className={classes.colorPaletteRoyalBlueForeground2}
			>
				colorPaletteRoyalBlueForeground2
			</div>
			<div
				style={{ color: "white" }}
				className={classes.colorPaletteRoyalBlueBorderActive}
			>
				colorPaletteRoyalBlueBorderActive
			</div>
		</div>
	);
}
