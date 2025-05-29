import { ColorSwatch, SwatchPicker } from "@fluentui/react-components";
import StyledTooltip from "../tooltips/styled";

export default function LargeSwatchPicker({
	colors,
	onChange,
}: {
	colors: { color: string; value: string; "aria-label": string }[];
	onChange?: (value: string) => void;
}) {
	return (
		<SwatchPicker
			aria-label="SwatchPicker large size"
			size="large"
			defaultSelectedValue={colors[0].value}
			onSelectionChange={(_, d) => {
				if (onChange) onChange(d.selectedValue);
			}}
		>
			{colors.map((color) => {
				return (
					<StyledTooltip text={color["aria-label"]} key={color.value}>
						<ColorSwatch {...color} />
					</StyledTooltip>
				);
			})}
		</SwatchPicker>
	);
}
