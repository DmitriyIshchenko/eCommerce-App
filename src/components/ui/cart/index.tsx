import type { TooltipProps } from "@fluentui/react-components";
import BagCartIcon from "../icons/bag-cart";
import { InternalLink } from "../links/fui-tanstack";
import ScalableSpinner from "../spinners/scalable";
import StyledTooltip from "../tooltips/styled";

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
									fontWeight: 550,
									height: size,
									width: size,
									fontSize: size / 2.7,
								}}
							>
								{loading ? <ScalableSpinner size={size * 0.4} /> : goods}
							</span>
						)}
					</div>
				</InternalLink>
			</div>
		</StyledTooltip>
	);
}
