import type { IconProps } from "./icon-props";

export default function BurgerIcon({
	width = "1em",
	height = "1em",
	strokeWidth = 0.6,
	color = "currentColor",
}: Partial<IconProps>) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="presentation"
		>
			<path
				d="M1.5 3H10.5"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				id="burger-first-stick"
			/>
			<path
				d="M1.5 6H10.5"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				id="burger-second-stick"
			/>
			<path
				d="M1.5 9H10.5"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				id="burger-third-stick"
			/>
		</svg>
	);
}
