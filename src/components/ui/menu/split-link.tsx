import {
	Button,
	Menu,
	MenuItem,
	MenuList,
	MenuPopover,
	MenuSplitGroup,
	MenuTrigger,
	makeStyles,
} from "@fluentui/react-components";
import { ChevronDownFilled } from "@fluentui/react-icons";
import type { ReactNode } from "react";
import type { Category } from "../../../lib/schemas/product";
import { InternalLink } from "../links/fui-tanstack";

const useCss = makeStyles({
	item: {
		":hover": {
			backgroundColor: "transparent",
			cursor: "auto",
			":active": {
				backgroundColor: "transparent",
			},
		},
	},
});

const fakeCategories: Category[] = [
	{ id: "1", ancestors: [], name: "first" },
	{ id: "2", parent: { id: "1" }, ancestors: [{ id: "1" }], name: "first" },
	{ id: "3", parent: { id: "1" }, ancestors: [{ id: "1" }], name: "second" },
	{ id: "4", ancestors: [], name: "second" },
	{ id: "5", parent: { id: "4" }, ancestors: [{ id: "4" }], name: "first" },
	{ id: "6", parent: { id: "4" }, ancestors: [{ id: "4" }], name: "second" },
	{ id: "7", ancestors: [], name: "third" },
	{
		id: "8",
		parent: { id: "7" },
		ancestors: [{ id: "7" }],
		name: "first",
	},
	{
		id: "9",
		parent: { id: "8" },
		ancestors: [{ id: "7" }, { id: "8" }],
		name: "first",
	},
	{
		id: "10",
		parent: { id: "8" },
		ancestors: [{ id: "7" }, { id: "8" }],
		name: "second",
	},
];

interface ItemBase {
	name: string;
	to: string;
	params: Record<string, string>;
}

interface ChildItem extends ItemBase {
	type: "child";
}
interface ParentItem extends ItemBase {
	type: "parent";
	children: MenuItemUnion[];
}
export type MenuItemUnion = ParentItem | ChildItem;

const Parent = ({
	to,
	params,
	ariaLabel,
	children,
	name,
}: {
	to: string;
	params?: object;
	ariaLabel?: string;
	children: ReactNode;
	name: string;
}) => {
	const css = useCss();
	return (
		<Menu>
			<MenuSplitGroup>
				<MenuItem className={css.item}>
					<InternalLink to={to} params={params}>
						{name}
					</InternalLink>
				</MenuItem>
				<MenuTrigger disableButtonEnhancement>
					<MenuItem aria-label={ariaLabel} />
				</MenuTrigger>
			</MenuSplitGroup>
			<MenuPopover>
				<MenuList>{children}</MenuList>
			</MenuPopover>
		</Menu>
	);
};
const Child = ({
	to,
	params,
	name,
}: { to: string; params?: object; name: string }) => {
	const css = useCss();
	return (
		<MenuItem className={css.item}>
			<InternalLink to={to} params={params}>
				{name}
			</InternalLink>
		</MenuItem>
	);
};

const renderItem = (item: MenuItemUnion): ReactNode => {
	if (item.type === "child") {
		return <Child to={item.to} name={item.name} params={item.params} />;
	}
	if (item.type === "parent") {
		return (
			<Parent to={item.to} name={item.name} params={item.params}>
				{item.children.map(renderItem)}
			</Parent>
		);
	}
};

export default function SplitLinkMenu({
	to,
	name,
	active,
	items,
}: {
	to: string;
	name: string;
	active?: boolean;
	items: MenuItemUnion[];
}) {
	return (
		<Menu>
			<div style={{ display: "flex", alignItems: "center" }}>
				<InternalLink to={to} active={active}>
					{name}
				</InternalLink>
				<MenuTrigger disableButtonEnhancement>
					<Button icon={<ChevronDownFilled />} appearance="transparent" />
				</MenuTrigger>
			</div>
			<MenuPopover>
				<MenuList>{items.map(renderItem)}</MenuList>
			</MenuPopover>
		</Menu>
	);
}
