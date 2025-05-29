import CustomSpinner from "./custom";

export default function ScalableSpinner({ size }: { size: number }) {
	return (
		<div style={{ transform: `scale(${size / 16})` }}>
			<CustomSpinner size="extra-tiny"/>
		</div>
	);
}
