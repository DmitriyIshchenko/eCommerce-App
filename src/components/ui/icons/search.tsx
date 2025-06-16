import type { IconProps } from './icon-props';

export default function SearchIcon({
  width = '1em',
  height = '1em',
  color = 'currentColor',
  strokeWidth = 0.6,
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
        d="M2.49237 4.40722C2.7822 3.60954 3.37702 2.95967 4.146 2.60057C4.91498 2.24147 5.79511 2.20255 6.59278 2.49237C7.39046 2.7822 8.04033 3.37702 8.39943 4.146C8.75853 4.91498 8.79745 5.79511 8.50763 6.59278C8.2178 7.39046 7.62298 8.04033 6.854 8.39943C6.08502 8.75853 5.20489 8.79745 4.40722 8.50763C3.60954 8.2178 2.95967 7.62298 2.60057 6.854C2.24147 6.08502 2.20255 5.20489 2.49237 4.40722L2.49237 4.40722Z"
        stroke={color}
        strokeWidth={strokeWidth}
        id="search-circle"
      />
      <path
        d="M8 8L10 10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        id="search-stick"
      />
    </svg>
  );
}
