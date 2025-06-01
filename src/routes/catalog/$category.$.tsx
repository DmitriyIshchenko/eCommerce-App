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
import {
	CheckmarkFilled,
	DismissFilled,
	DismissRegular,
} from "@fluentui/react-icons";
import { createFileRoute, useLocation } from "@tanstack/react-router";
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
import SingleSwatchPicker from "../../components/ui/swatch-picker/single";
import SingleImageSwatchPicker from "../../components/ui/swatch-picker/single-image";
import DismissWithInteractionTags from "../../components/ui/tags/dismiss-with-interaction";
import StyledTooltip from "../../components/ui/tooltips/styled";
import { type FilterSchema, filterSchema } from "../../lib/schemas/filter";
import {
	type Category,
	fakeProductResponseSchema,
	fakeProducts,
} from "../../lib/schemas/product";
import { kebabCaseToPascalSpacedString } from "../../lib/utils/camel-case-to-pascal-spaced-string";

type CustomItem = HeadlessFlatTreeItemProps & { content: string };

export type NamedCategory =
	| {
			id: string;
			name: string;
	  }
	| undefined;

type Filter = FilterSchema & { category?: NamedCategory };

// const items: CustomItem[] = [
// 	{ value: "all", content: "All Products" },
// 	{ value: "first", content: "First Category", parentValue: "all" },
// 	{ value: "first/first", parentValue: "first", content: "1 Subcategory" },
// 	{ value: "first/second", parentValue: "first", content: "2 Subcategory" },
// 	{ value: "second", content: "Second Category", parentValue: "all" },
// 	{ value: "second/first", parentValue: "second", content: "1 Subcategory" },
// 	{ value: "second/second", parentValue: "second", content: "2 Subcategory" },
// 	{ value: "third", content: "Third Category", parentValue: "all" },
// 	{ value: "third/first", parentValue: "third", content: "1 Subcategory" },
// ];

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

const useCss = makeStyles({
	treeItem: {
		"& .fui-Radio__indicator::after": {
			backgroundColor: tokens.colorPaletteRoyalBlueForeground2,
		},
	},
});

const categoriesToTreeItems = (categories: Category[]): CustomItem[] =>
	categories.map((v) => {
		const o: CustomItem = {
			value: v.id,
			content: v.name,
		};
		if (v.parent) {
			o.parentValue = v.parent.id;
		}
		return o;
	});

export const Route = createFileRoute("/catalog/$category/$")({
	component: RouteComponent,
	validateSearch: filterSchema,
	loaderDeps: ({ search: { page, color, material, maxPrice, minPrice } }) => ({
		page,
		color,
		material,
		minPrice,
		maxPrice,
	}),
	loader: ({
		deps: { color, material, maxPrice, minPrice, page },
		params: { category, _splat },
		context: { categories },
	}) => {
		const filteredProducts = fakeProducts
			.filter((v) => v.category === category || category === "all")
			.filter((v) => (_splat ? v.subcategory === _splat : true))
			.filter((v) => (color ? color.some((c) => v.color === c) : true))
			.filter((v) => (material ? material.some((m) => v.material === m) : true))
			.filter((v) => (minPrice ? v.price >= minPrice : true))
			.filter((v) => (maxPrice ? v.price <= maxPrice : true));
		const response = {
			totalPages: Math.ceil(filteredProducts.length / 10),
			minPrice: 0,
			maxPrice: 5000,
			products: filteredProducts.slice(
				((page ?? 1) - 1) * 10,
				(page ?? 1) * 10,
			),
			categories,
		};
		return response;
	},
});

function RouteComponent() {
	const treeItemCss = useCss().treeItem;
	const [open, setOpen] = useState(false);
	const data = Route.useLoaderData();

	const { _splat, category } = Route.useParams();
	const subcategories = typeof _splat === "string" && !!_splat.length ? _splat.split("/") : [];

	const { products, totalPages, maxPrice, minPrice, categories } =
		fakeProductResponseSchema.parse(data);    
	const treeItems = categoriesToTreeItems(categories);
	const search = Route.useSearch();
	const combinedCategories = [category, ...subcategories];
  
	const currentCategoryId = combinedCategories.reduce(
		(a: string | undefined, v) => {
			const founded = categories.find(
				(item) =>
					item.name === v &&
					(a ? item.parent?.id === a : !item.parent),
			);
      
			return typeof founded?.id === "string" ? founded?.id : undefined;
		},
		undefined,
	);

	const currentCategoryName = categories.find(
		(v) => v.id === currentCategoryId,
	)?.name;
	const searchFilter = filterSchema.parse(search);
	const initialFilter: Filter = { ...searchFilter };
	if (currentCategoryId && currentCategoryName) {
		initialFilter.category = {
			id: currentCategoryId,
			name: currentCategoryName,
		};
	}
	const [filter, setFilter] = useState<Filter>(initialFilter);

	const navigate = Route.useNavigate();

	const { pathname } = useLocation();


	const pathnames = pathname.split("/").slice(1);
	const links: Link[] = pathnames.reduce((a: Link[], v) => {
		const current: Link = {
			text: kebabCaseToPascalSpacedString(v),
			to: a.length ? `${a.at(-1)?.to}/${v}` : `/${v}`,
		};
		// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
		return [...a, current];
	}, []);

	const handleMinMaxChange = (minPrice: number, maxPrice: number) => {
		setFilter({ ...filter, minPrice, maxPrice });
	};

	const handleColorChange = (color: string) => {
		const i = filter.color?.findIndex((v) => v === color);
		const newColor =
			typeof i === "number" && i !== -1
				? filter.color?.toSpliced(i, 1)
				: [...(filter?.color ?? []), color];
		setFilter({ ...filter, color: newColor });
	};

	const handleMaterialChange = (material: string) => {
		const i = filter.material?.findIndex((v) => v === material);
		const newMaterial =
			typeof i === "number" && i !== -1
				? filter.material?.toSpliced(i, 1)
				: [...(filter?.material ?? []), material];
		setFilter({ ...filter, material: newMaterial });
	};

	const handleCategoryChange = (id: string) => {
		const name = treeItems.find((v) => v.value === id)?.content;
		if (name) {
			setFilter({ ...filter, category: { id, name } });
		}
	};

	const handleDismissFilter = (name: string, value: string | number) => {
		if (name === "color" && typeof value === "string") handleColorChange(value);
		if (name === "material" && typeof value === "string")
			handleMaterialChange(value);
		if (name === "price") {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { minPrice, maxPrice, ...newFilter } = filter;
			setFilter(newFilter);
		}
		if (name === "category" && typeof value === "string") {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { category, ...newFilter } = filter;
			setFilter(newFilter);
		}
	};

	const applyFilter = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { category, ...search } = filter;
		setOpen(false);
		const combinedCategories: string[] = [];
		let current = categories.find((v) => v.id === filter.category?.id);
		while (current) {
			combinedCategories.unshift(current.name);
			current = categories.find((v) => v.id === current?.parent?.id);
		}
		const cat = combinedCategories.shift() ?? "all";
		const _splat = combinedCategories.join("/") || undefined;
		void navigate({
			to: "/catalog/$category/$",
			params: {
				category: cat,
				_splat,
			},
			search,
		});
	};

	const flatTree = useHeadlessFlatTree_unstable(treeItems, {
		selectionMode: "single",
	});
	const restoreFocusTargetAttributes = useRestoreFocusTarget();
	const restoreFocusSourceAttributes = useRestoreFocusSource();

	return (
		<main style={{ padding: 20 }}>
			<CustomBreadcrumb links={links} />

			<div style={{ minHeight: "calc(100vh - 344px)" }}>
				<div
					style={{
						display: "flex",
						gap: 20,
						flexWrap: "wrap",
						width: 1000,
						margin: "0 auto",
					}}
				>
					{products.map((v) => (
						<div
							key={v.id}
							style={{
								padding: 10,
								border: "1px solid blue",
								width: 200,
								height: 200,
							}}
						>
							<div>Category {v.category}</div>
							<div>Subcategory {v.subcategory}</div>
							<div>Color {v.color}</div>
							<div>Material {v.material}</div>
							<div>Price {v.price}</div>
							<div>Card № {v.id}</div>
						</div>
					))}
				</div>
			</div>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Pagination total={totalPages} searchParamName="page" />
			</div>
			<div style={{ position: "fixed", top: 110, right: 20 }}>
				{pathname !== "/catalog" && (
					<>
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
							<DrawerHeader style={{ padding: 22 }}>
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
								<DismissWithInteractionTags
									tags={filter}
									onDismiss={handleDismissFilter}
								/>
								<div style={{ display: "flex", gap: 20 }}>
									<CustomButton
										onClick={() => {
											applyFilter();
										}}
										shape="circular"
										size="medium"
										icon={<CheckmarkFilled />}
									>
										Apply
									</CustomButton>
									<CustomButton
										onClick={() => setFilter({})}
										shape="circular"
										size="medium"
										appearance="inverted"
										icon={<DismissFilled />}
										disabled={!Object.keys(filter).length}
									>
										Reset
									</CustomButton>
								</div>
							</DrawerHeader>
							<DrawerBody
								style={{
									paddingRight: 5,
									paddingLeft: 22,
									scrollbarGutter: "stable",
								}}
							>
								<div style={{ marginTop: 20 }}>
									<Label>Categories</Label>
								</div>
								<FlatTree
									{...flatTree.getTreeProps()}
									aria-label="Selection"
									checkedItems={[filter.category?.id ?? ""]}
									onCheckedChange={(_, d) => {
										handleCategoryChange(String(d.value));
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
								<div style={{ marginTop: 20 }}>
									<RangeInputField
										onChange={handleMinMaxChange}
										prefix="$"
										min={minPrice}
										max={maxPrice}
										values={[
											filter.minPrice ?? minPrice,
											filter.maxPrice ?? maxPrice,
										]}
									/>
								</div>
								<div style={{ marginTop: 20 }}>
									<Label>Colors</Label>
								</div>
								<div style={{ display: "flex", gap: 8 }}>
									{colors.map((v) => (
										<SingleSwatchPicker
											value={filter.color?.find((c) => c === v.value)}
											color={v}
											key={v.value}
											onChange={handleColorChange}
										/>
									))}
								</div>
								<div style={{ marginTop: 20 }}>
									<Label>Materials</Label>
								</div>
								<div style={{ display: "flex", gap: 8, width: "100%" }}>
									{images.map((v) => (
										<SingleImageSwatchPicker
											key={v.value}
											value={filter.material?.find((m) => m === v.value)}
											image={v}
											onChange={handleMaterialChange}
											ariaLabel={v.label}
										/>
									))}
								</div>
							</DrawerBody>
						</Drawer>
					</>
				)}
			</div>
		</main>
	);
}
