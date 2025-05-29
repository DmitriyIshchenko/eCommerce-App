import {
	ImageSwatch,
	SwatchPicker,
	type SwatchPickerOnSelectEventHandler,
	makeStyles,
} from "@fluentui/react-components";
import { useState } from "react";
import StyledTooltip from "../tooltips/styled";

const useStyles = makeStyles({
	example: {
		width: "100%",
		height: "200px",
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		margin: "20px 0",
	},
	swatch: {
		width: "88px",
		height: "88px",
	},
});

export default function ImageSwatchPicker({
	images,
	onChange,
}: {
	images: {
		swatchSrc: string;
		value: string;
		label: string;
		fullImageSrc: string;
	}[];
	onChange?: (value: string) => void;
}) {
	const [selectedValue, setSelectedValue] = useState(images[0].value);
	const [selectedImage, setSelectedImage] = useState(images[0].fullImageSrc);
	const styles = useStyles();
	if (!images.length) return;
	const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
		setSelectedValue(data.selectedValue);
		const image =
			images.find((img) => img.value === data.selectedValue) ?? images[0];
		setSelectedImage(image.fullImageSrc);
		if (onChange) onChange(data.selectedValue);
	};

	return (
		<>
			<SwatchPicker
				aria-label="SwatchPicker with images"
				selectedValue={selectedValue}
				onSelectionChange={handleSelect}
			>
				{images.map((image) => (
					<StyledTooltip key={image.value} text={image.label}>
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
					backgroundImage: `url(${selectedImage})`,
				}}
			/>
		</>
	);
}
