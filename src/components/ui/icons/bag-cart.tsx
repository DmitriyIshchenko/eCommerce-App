import type { IconProps } from "./icon-props";

// находим свг, заворачиваем в компонент, привязываем изменяемые значения к пропсам и привязываем цвет к цвету шрифта - currentColor (если в иконе помимо stroke используется заливка fill то нужно к ней тоже привязать цвет)

export default function BagCartIcon({
	width = "1em",
	height = "1em",
	strokeWidth = 0.5,
	color = "currentColor",
	style,
}: Partial<IconProps>) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="presentation"
			style={style}
		>
			<path
				d="M3.46094 2.2998H8.53906C9.1298 2.2998 9.62654 2.72833 9.72266 3.2998L9.73633 3.41602L10.0879 8.41602C10.1366 9.1101 9.58645 9.7002 8.89062 9.7002H3.10938C2.45708 9.7002 1.93305 9.18159 1.91016 8.54492L1.91211 8.41602L2.26367 3.41602C2.30787 2.78749 2.83086 2.2998 3.46094 2.2998Z"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinejoin="round"
			/>
			<path
				d="M4.5 2.3V2C4.5 1.17157 5.17157 0.5 6 0.5V0.5C6.82843 0.5 7.5 1.17157 7.5 2V2.3"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinejoin="round"
			/>
		</svg>
	);
}
