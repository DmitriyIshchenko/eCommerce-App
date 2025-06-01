import { ColorSwatch, SwatchPicker } from "@fluentui/react-components";
import { useState } from "react";
import StyledTooltip from "../tooltips/styled";

export default function LargeSwatchPicker({
	colors,
	onChange,
	value,
}: {
	colors: { color: string; value: string; "aria-label": string }[];
	onChange?: (value: string | null) => void;
	value?: string;
}) {
	return (
		<SwatchPicker
			aria-label="SwatchPicker large size"
			size="large"
			selectedValue={value}
			onSelectionChange={(_, d) => {
				const v = d.selectedValue === value ? null : d.selectedValue;
				if (onChange) onChange(v);
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
