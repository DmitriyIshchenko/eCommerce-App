import {
	Spinner,
	type TooltipProps,
	makeStyles,
	tokens,
} from "@fluentui/react-components";
import BagCartIcon from "../ui/icons/bag-cart";
import { InternalLink } from "../ui/links/fui-tanstack";
import StyledTooltip from "../ui/tooltips/styled";

const useCss = makeStyles({
	spinner: {
		"> span": {
			width: "12px",
			height: "12px",
			color: tokens.colorPaletteRoyalBlueBorderActive,
		},
	},
});

export default function Cart({
	goods = 0,
	size = 24,
	to,
	loading,
	tooltipPositioning,
}: {
	goods?: number;
	size?: number;
	to: string;
	loading?: boolean;
	tooltipPositioning?: TooltipProps["positioning"];
}) {
	const css = useCss();
	return (
		<StyledTooltip text="Cart" positioning={tooltipPositioning}>
			<div style={{ padding: 5 }}>
				<InternalLink to={to}>
					<div
						style={{
							display: "grid",
							gridTemplateAreas: "common",
						}}
					>
						<BagCartIcon
							style={{ gridArea: "common" }}
							width={size}
							height={size}
						/>
						{goods > 0 && (
							<span
								style={{
									gridArea: "stack",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									paddingTop: size * 0.14,
									fontWeight: 550,
									height: size,
									width: size,
									fontSize: size / 2.7,
								}}
							>
								{!loading && goods}{" "}
								{loading && (
									<Spinner size="extra-tiny" className={css.spinner} />
								)}
							</span>
						)}
					</div>
				</InternalLink>
			</div>
		</StyledTooltip>
	);
}
