import type { IconProps } from './icon-props';

export default function FilterIcon({
  width = '1em',
  height = '1em',
  strokeWidth = 0.6,
  color = 'currentColor',
}: Partial<IconProps>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      stroke={color}
    >
      <path d="M2.7 1.5L2.7 10.8" />
      <path d="M1.4 3H4" />
      <path d="M5 6H7" />
      <path d="M8.3 9H10.3" />
      <path d="M6 1.2L6 10.8" />
      <path d="M9.3 1.2L9.3 10.8" />
    </svg>
  );
}
