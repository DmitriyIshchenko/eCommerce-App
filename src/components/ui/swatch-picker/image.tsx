import {
	ImageSwatch,
	SwatchPicker,
	type SwatchPickerOnSelectEventHandler,
	makeStyles,
} from "@fluentui/react-components";
import StyledTooltip from "../tooltips/styled";

const useStyles = makeStyles({
	example: {
		width: "100%",
		height: "200px",
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		margin: "4px 0",
	},
	swatch: {
		width: "100px",
		height: "88px",
	},
});

export default function ImageSwatchPicker({
	images,
	value,
	image,
	onChange,
}: {
	images: {
		swatchSrc: string;
		value: string;
		label: string;
		fullImageSrc: string;
	}[];
	onChange?: (value: string) => void;
	value?: string;
	image?: string;
}) {
	const styles = useStyles();
	if (!images.length) return;
	const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
		const v = data.selectedValue === value ? null : data.selectedValue;
		if (onChange) onChange(v);
	};

	return (
		<>
			<SwatchPicker
				aria-label="SwatchPicker with images"
				selectedValue={value ?? undefined}
				onSelectionChange={handleSelect}
			>
				{images.map((image) => (
					<StyledTooltip key={image.value} contentChildren={image.label}>
						<ImageSwatch
							className={styles.swatch}
							src={image.swatchSrc}
							value={image.value}
							aria-label={image.label}
						/>
					</StyledTooltip>
				))}
			</SwatchPicker>
			<div
				className={styles.example}
				style={{
					backgroundImage: `url(${image})`,
					textAlign: "end",
					paddingRight: "4px",
				}}
			>
				{value}
			</div>
		</>
	);
}
