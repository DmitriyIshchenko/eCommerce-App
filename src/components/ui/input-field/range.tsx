/* eslint-disable react/prop-types */
import { SpinButton, makeStyles, tokens } from "@fluentui/react-components";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const useStyles = makeStyles({
	spin: {
		":before": { borderRadius: "0" },
		"::after": {
			borderBottomLeftRadius: "0",
			borderBottomRightRadius: "0",
		},
	},
	fieldset: {
		padding: "2px 10px 4px 10px",
		border: `1px solid ${tokens.colorNeutralStroke1}`,
	},
});

export default function RangeInputField({
	values = [0, 100],
	step = 1,
	min = 0,
	max = 100,
	onChange,
	prefix,
}: {
	min?: number;
	max?: number;
	onChange?: (min: number, max: number) => void;
	values?: number[];
	step?: number;
	prefix?: string;
}) {
	const styles = useStyles();
	const minValue = Math.min(...values);
	const maxValue = Math.max(...values);

	return (
		<fieldset className={styles.fieldset}>
			<legend style={{ padding: "0 4px" }}>Price</legend>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ display: "flex", gap: 10, padding: 5 }}>
					<SpinButton
						value={minValue}
						min={min}
						max={maxValue}
						displayValue={`${prefix ?? ""}${minValue}`}
						onChange={(_, d) => {
							const value = d.value ?? min;
							if (onChange) onChange(value, maxValue);
						}}
						className={styles.spin}
					/>
					<div style={{ display: "flex", alignItems: "center" }}>to</div>
					<SpinButton
						value={maxValue}
						min={minValue}
						max={max}
						displayValue={`${prefix ?? ""}${maxValue}`}
						onChange={(_, d) => {
							const value = d.value ?? min;
							if (onChange) onChange(minValue, value);
						}}
						className={styles.spin}
					/>
				</div>
				<div style={{ padding: "0 5px" }}>
					<Range
						draggableTrack
						values={values}
						step={step}
						min={min}
						max={max}
						onChange={(values) => {
							if (onChange) onChange(Math.min(...values), Math.max(...values));
						}}
						allowOverlap
						renderTrack={({ props, children }) => (
							<div
								onMouseDown={props.onMouseDown}
								onTouchStart={props.onTouchStart}
								style={{
									...props.style,
									height: "36px",
									display: "flex",
									width: "100%",
								}}
							>
								<div
									ref={props.ref}
									style={{
										height: "4px",
										width: "100%",
										borderRadius: "6px",
										background: getTrackBackground({
											values,
											colors: [
												tokens.colorNeutralForeground4,
												tokens.colorPaletteRoyalBlueForeground2,
												tokens.colorNeutralForeground4,
											],
											min,
											max,
										}),
										alignSelf: "center",
									}}
								>
									{children}
								</div>
							</div>
						)}
						renderThumb={({ props, isDragged }) => (
							<div
								{...props}
								key={props.key}
								style={{
									...props.style,
									height: "20px",
									width: "20px",
									borderRadius: "10px",
									backgroundColor: tokens.colorNeutralBackground1,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									border: `1px solid ${tokens.colorNeutralStroke1Pressed}`,
								}}
							>
								<div
									style={{
										height: "12px",
										width: "12px",
										borderRadius: "6px",
										backgroundColor: isDragged
											? tokens.colorPaletteRoyalBlueBorderActive
											: tokens.colorPaletteRoyalBlueForeground2,
									}}
								/>
							</div>
						)}
					/>
				</div>
			</div>
		</fieldset>
	);
}
