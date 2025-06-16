import type { IconProps } from './icon-props';

export default function PlusIcon({
  width = '1em',
  height = '1em',
  strokeWidth = 0.6,
  color = 'currentColor',
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
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      style={style}
    >
      <path d="M3 6L9 6" stroke={color} />
      <path d="M6 9L6 3" stroke={color} />
    </svg>
  );
}
