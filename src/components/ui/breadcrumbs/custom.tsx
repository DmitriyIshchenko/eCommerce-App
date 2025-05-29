import {
	Breadcrumb,
	BreadcrumbDivider,
	BreadcrumbItem,
	makeStyles,
	tokens,
} from "@fluentui/react-components";
import { HomeRegular } from "@fluentui/react-icons";
import type { ToPathOption } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { InternalLink } from "../links/fui-tanstack";

export interface Link {
	to: ToPathOption;
	text: string;
}

interface Props {
	links?: Link[];
}

const useCss = makeStyles({
	divider: {
		color: tokens.colorNeutralForeground4,
	},
	breadcrumb: {
		"> ol": {
			flexWrap: "wrap",
		},
	},
});

export default function CustomBreadcrumb({ links }: Props) {
	const css = useCss();
	return (
		<Breadcrumb aria-label="Catalog Breadcrumb" className={css.breadcrumb}>
			<BreadcrumbItem>
				<InternalLink to="/" appearance="muted" asBlock>
					<HomeRegular style={{ fontSize: 20 }} />
				</InternalLink>
			</BreadcrumbItem>
			{links?.map((v, i, a) => {
				const isLast = i === a.length - 1;
				return (
					<Fragment key={v.to}>
						<BreadcrumbDivider className={css.divider} />
						<InternalLink
							to={v.to}
							appearance="muted"
							asBlock
							accent={isLast}
							notInteractive={isLast}
						>
							{v.text}
						</InternalLink>
					</Fragment>
				);
			})}
		</Breadcrumb>
	);
}
