import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerHeaderTitle,
	FlatTree,
	FlatTreeItem,
	type HeadlessFlatTreeItemProps,
	Label,
	TreeItemLayout,
	makeStyles,
	tokens,
	useHeadlessFlatTree_unstable,
	useRestoreFocusSource,
	useRestoreFocusTarget,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import {
	Outlet,
	createFileRoute,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import CustomButton from "../../components/ui/buttons/custom";
import FilterButton from "../../components/ui/buttons/filter";
import Pagination from "../../components/ui/pagination";
import MinMaxDoubleSlider from "../../components/ui/sliders/min-max-double";
import LargeSwatchPicker from "../../components/ui/swatch-picker";
import StyledTooltip from "../../components/ui/tooltips/styled";
import debounce from "../../lib/utils/debounce";

type CustomItem = HeadlessFlatTreeItemProps & { content: string };

const items: CustomItem[] = [
	{ value: "all", content: "All Products" },
	{ value: "first", content: "First Category", parentValue: "all" },
	{ value: "first/first", parentValue: "first", content: "1 Subcategory" },
	{ value: "first/second", parentValue: "first", content: "2 Subcategory" },
	{ value: "second", content: "Second Category", parentValue: "all" },
	{ value: "second/first", parentValue: "second", content: "1 Subcategory" },
	{ value: "second/second", parentValue: "second", content: "2 Subcategory" },
	{ value: "third", content: "Third Category", parentValue: "all" },
	{ value: "third/first", parentValue: "third", content: "1 Subcategory" },
];

const useCss = makeStyles({
	treeItem: {
		"& .fui-Radio__indicator::after": {
			backgroundColor: tokens.colorPaletteRoyalBlueForeground2,
		},
	},
});

export const Route = createFileRoute("/catalog")({
	component: RouteComponent,
});
function RouteComponent() {
	const treeItemCss = useCss().treeItem;
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const { search, pathname } = useLocation();
	console.log(pathname);

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
	const flatTree = useHeadlessFlatTree_unstable(items, {
		defaultOpenItems: ["all", "first", "second", "third"],
		selectionMode: "single",
	});
	const restoreFocusTargetAttributes = useRestoreFocusTarget();
	const restoreFocusSourceAttributes = useRestoreFocusSource();
	const [category, setCategory] = useState("all");

	return (
		<main style={{ padding: 20 }}>
			<div style={{ minHeight: "calc(100vh - 344px)" }}>
				<Outlet />
			</div>
			{pathname !== "/catalog" && (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Pagination total={20} searchParamName="page" />
				</div>
			)}
			<div style={{ position: "fixed", top: 110, right: 20 }}>
				<FilterButton
					onClick={() => setOpen(true)}
					{...restoreFocusTargetAttributes}
				/>
				<Drawer
					separator
					open={open}
					position="end"
					{...restoreFocusSourceAttributes}
					onOpenChange={(_, { open }) => setOpen(open)}
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
						<FlatTree
							{...flatTree.getTreeProps()}
							aria-label="Selection"
							checkedItems={[category]}
							onCheckedChange={(_, d) => {
								setCategory(String(d.value));
								const [category, subcategory] = String(d.value).split("/");
								if (subcategory) {
									void navigate({
										to: "/catalog/$category/$subcategory",
										params: {
											category,
											subcategory,
										},
										search,
									});
								} else {
									void navigate({
										to: "/catalog/$category",
										params: {
											category,
										},
										search,
									});
								}
							}}
						>
							{Array.from(flatTree.items(), (flatTreeItem) => {
								const { content, ...treeItemProps } =
									flatTreeItem.getTreeItemProps();
								return (
									<FlatTreeItem
										{...treeItemProps}
										key={flatTreeItem.value}
										className={treeItemCss}
									>
										<TreeItemLayout>{content}</TreeItemLayout>
									</FlatTreeItem>
								);
							})}
						</FlatTree>
						<MinMaxDoubleSlider onChange={debounce(handleMinMaxChange, 200)} />
						<div style={{ marginTop: 20 }}>
							<Label>Colors</Label>
						</div>
						<LargeSwatchPicker colors={colors} onChange={handleColorChange} />
					</DrawerBody>
				</Drawer>
			</div>
		</main>
	);
}
