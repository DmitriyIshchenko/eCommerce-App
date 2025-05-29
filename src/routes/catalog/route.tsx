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
import canvasLqip from "../../assets/images/material-canvas-lqip.webp";
import canvas from "../../assets/images/material-canvas.png";
import gicleeLqip from "../../assets/images/material-giclee-lqip.webp";
import giclee from "../../assets/images/material-giclee.webp";
import photoragLqip from "../../assets/images/material-photorag-lqip.webp";
import photorag from "../../assets/images/material-photorag.webp";
import CustomBreadcrumb, {
	type Link,
} from "../../components/ui/breadcrumbs/custom";
import CustomButton from "../../components/ui/buttons/custom";
import FilterButton from "../../components/ui/buttons/filter";
import RangeInputField from "../../components/ui/input-field/range";
import Pagination from "../../components/ui/pagination";
import ImageSwatchPicker from "../../components/ui/swatch-picker/image";
import LargeSwatchPicker from "../../components/ui/swatch-picker/large";
import DismissWithInteractionTags, {
	type TagProps,
} from "../../components/ui/tags/dismiss-with-interaction";
import StyledTooltip from "../../components/ui/tooltips/styled";
import { kebabCaseToPascalSpacedString } from "../../lib/utils/camel-case-to-pascale-spaced-string";
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
	const links: Link[] = pathname
		.split("/")
		.slice(1)
		.reduce((a: Link[], v) => {
			const current: Link = {
				text: kebabCaseToPascalSpacedString(v),
				to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
			};
			// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
			return [...a, current];
		}, []);

	const handleMinMaxChange = (min: number, max: number) => {
		setTags([
			...tags.filter((t) => t.value !== "1"),
			{ value: "1", children: `$${min} - $${max}` },
		]);
		void navigate({
			search: {
				...search,
				"min-price": min,
				"max-price": max,
				page: 1,
			},
		});
	};
	const handleColorChange = (color: string) => {
		setTags([
			...tags.filter((t) => t.value !== "2"),
			{ value: "2", children: `${color}` },
		]);
		void navigate({
			search: {
				...search,
				color,
				page: 1,
			},
		});
	};
	const handleMaterialChange = (material: string) => {
		setTags([
			...tags.filter((t) => t.value !== "3"),
			{ value: "3", children: `${material}` },
		]);
		void navigate({
			search: {
				...search,
				material,
				page: 1,
			},
		});
	};
	const colors = [
		{ color: "#FF1921", value: "red", "aria-label": "red" },
		{ color: "#FF7A00", value: "orange", "aria-label": "orange" },
		{ color: "#90D057", value: "light-green", "aria-label": "light green" },
	];
	const images = [
		{
			swatchSrc: canvasLqip,
			value: "canvas",
			label: "canvas",
			fullImageSrc: canvas,
		},
		{
			swatchSrc: gicleeLqip,
			value: "giclee",
			label: "giclee",
			fullImageSrc: giclee,
		},
		{
			swatchSrc: photoragLqip,
			value: "photorag",
			label: "photorag",
			fullImageSrc: photorag,
		},
	];

	const flatTree = useHeadlessFlatTree_unstable(items, {
		defaultOpenItems: ["first", "second", "third"],
		selectionMode: "single",
	});
	const restoreFocusTargetAttributes = useRestoreFocusTarget();
	const restoreFocusSourceAttributes = useRestoreFocusSource();
	const [category, setCategory] = useState("all");

	const [tags, setTags] = useState<TagProps[]>([]);

	return (
		<main style={{ padding: 20 }}>
			<CustomBreadcrumb links={links} />
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
					modalType="modal"
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
						<div style={{minHeight: 24}}>
							<DismissWithInteractionTags tags={tags} />
						</div>
						<CustomButton
							style={{ width: "fit-content" }}
							onClick={() => {
								setTags([]);
								void navigate({
									search: {
										page: 1,
									},
								});
							}}
							disabled={tags.length === 0}
							shape="circular"
							size="small"
						>
							RESET ALL
						</CustomButton>
					</DrawerHeader>
					<DrawerBody style={{ paddingRight: 15, scrollbarGutter: "stable" }}>
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
						<RangeInputField onChange={debounce(handleMinMaxChange, 200)} />
						<div style={{ marginTop: 20 }}>
							<Label>Colors</Label>
						</div>
						<LargeSwatchPicker colors={colors} onChange={handleColorChange} />
						<div style={{ marginTop: 20 }}>
							<Label>Materials</Label>
						</div>
						<ImageSwatchPicker
							images={images}
							onChange={handleMaterialChange}
						/>
					</DrawerBody>
				</Drawer>
			</div>
		</main>
	);
}
