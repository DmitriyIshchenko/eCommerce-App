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
				d="M3.42578 3.7998H8.57422C8.89406 3.79992 9.16694 4.01548 9.24902 4.31348L9.27148 4.44629L9.61816 8.94629C9.64944 9.35285 9.32768 9.7002 8.91992 9.7002H3.08008C2.6977 9.7002 2.39077 9.39475 2.37988 9.02148L2.38184 8.94629L2.72852 4.44629C2.75659 4.0817 3.06014 3.79993 3.42578 3.7998Z"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<path
				d="M4.75 4V3.29999C4.75 2.7477 5.19772 2.29999 5.75 2.29999H6.25C6.80228 2.29999 7.25 2.7477 7.25 3.29999V4"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
}
