import {
	Slider,
	SpinButton,
	makeStyles,
	tokens,
	useId,
} from "@fluentui/react-components";
import { useState } from "react";

const useStyles = makeStyles({
	wrapper: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		paddingLeft: "10px",
		paddingRight: "10px",
	},
	maxSlider: {
		"--fui-Slider__progress--color": tokens.colorPaletteRoyalBlueForeground2,
		"--fui-Slider__rail--color": tokens.colorNeutralForeground4,
		"--fui-Slider__thumb--color": tokens.colorPaletteRoyalBlueForeground2,
		":hover": {
			"--fui-Slider__progress--color": tokens.colorPaletteRoyalBlueForeground2,
			"--fui-Slider__rail--color": tokens.colorNeutralForeground4,
			"--fui-Slider__thumb--color": tokens.colorPaletteRoyalBlueForeground2,
			":active": {
				"--fui-Slider__progress--color":
					tokens.colorPaletteRoyalBlueForeground2,
				"--fui-Slider__rail--color": tokens.colorNeutralForeground4,
				"--fui-Slider__thumb--color": tokens.colorPaletteRoyalBlueForeground2,
			},
		},
		width: "100%",
		gridTemplateColumns: "0 1fr 0",
		"> div:nth-child(2)": {
			marginLeft: "-3px",
		},
		"> div:nth-child(3)": {
			"--fui-Slider__thumb--position":
				"clamp(0px, var(--fui-Slider--progress), 100%)",
			zIndex: "2",
		},
	},
	minSlider: {
		"--fui-Slider__progress--color": tokens.colorNeutralForeground4,
		"--fui-Slider__rail--color": tokens.colorPaletteRoyalBlueForeground2,
		"--fui-Slider__thumb--color": tokens.colorPaletteRoyalBlueForeground2,
		":hover": {
			"--fui-Slider__progress--color": tokens.colorNeutralForeground4,
			"--fui-Slider__rail--color": tokens.colorPaletteRoyalBlueForeground2,
			"--fui-Slider__thumb--color": tokens.colorPaletteRoyalBlueForeground2,
			":active": {
				"--fui-Slider__progress--color": tokens.colorNeutralForeground4,
				"--fui-Slider__rail--color": tokens.colorPaletteRoyalBlueForeground2,
				"--fui-Slider__thumb--color": tokens.colorPaletteRoyalBlueForeground2,
			},
		},
		width: "100%",
		gridTemplateColumns: "0 1fr 0",
		"> div:nth-child(2)": {
			marginRight: "-3px",
		},
		"> div:nth-child(3)": {
			"--fui-Slider__thumb--position":
				"clamp(0px, var(--fui-Slider--progress), 100%)",
			zIndex: "2",
		},
	},
	spin: {
		":before": { borderRadius: "0" },
		"::after": {
			borderBottomLeftRadius: "0",
			borderBottomRightRadius: "0",
		},
	},
	fieldset: {
		padding: "2px 10px 5px 10px",
		border: `1px solid ${tokens.colorNeutralStroke1}`,
	},
});

export default function MinMaxDoubleSlider({
	defaultMinValue = 0,
	defaultMaxValue = 100,
	min = 0,
	max = 100,
	onChange,
}: {
	defaultMinValue?: number;
	defaultMaxValue?: number;
	min?: number;
	max?: number;
	onChange?: (min: number, max: number) => void;
}) {
	const [minValue, setMinValue] = useState(defaultMinValue);
	const [maxValue, setMaxValue] = useState(defaultMaxValue);
	const styles = useStyles();
	const minSliderId = useId();
	const maxSliderId = useId();
	const minId = useId();
	const maxId = useId();
	const average = min + max / 2;

	return (
		<fieldset className={styles.fieldset}>
			<legend style={{ padding: "0 4px" }}>Price</legend>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ display: "flex", gap: 20, padding: 5 }}>
					<SpinButton
						value={minValue}
						min={min}
						max={average}
						id={minId}
						displayValue={`from:  ${minValue}`}
						onChange={(_, d) => setMinValue(d.value ?? defaultMinValue)}
						className={styles.spin}
					/>
					<SpinButton
						value={maxValue}
						min={average}
						max={max}
						id={maxId}
						displayValue={`  to:  ${maxValue}`}
						onChange={(_, d) => setMaxValue(d.value ?? defaultMaxValue)}
						className={styles.spin}
					/>
				</div>
				<div className={styles.wrapper}>
					<Slider
						min={min}
						max={average}
						value={minValue}
						id={minSliderId}
						className={styles.minSlider}
						onChange={(_, d) => {
							setMinValue(d.value);
							if (onChange) onChange(d.value, maxValue);
						}}
					/>
					<Slider
						min={average}
						max={max}
						value={maxValue}
						id={maxSliderId}
						className={styles.maxSlider}
						onChange={(_, d) => {
							setMaxValue(d.value);
							if (onChange) onChange(minValue, d.value);
						}}
					/>
				</div>
			</div>
		</fieldset>
	);
}
