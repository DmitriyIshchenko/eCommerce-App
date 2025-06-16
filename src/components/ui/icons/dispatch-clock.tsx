import type { IconProps } from './icon-props';

export default function DispatchClock({
  color = 'currentColor',
  height = '1em',
  width = '1em',
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
        d="M6 9.7C5.3754 9.7 4.76097 9.54188 4.21396 9.24038C3.66695 8.93888 3.20517 8.5038 2.87165 7.97571C2.53813 7.44761 2.34373 6.84367 2.30656 6.22018C2.26939 5.59669 2.39066 4.97394 2.65908 4.40995C2.9275 3.84597 3.33432 3.35912 3.84163 2.99476C4.34895 2.63041 4.94024 2.40041 5.56042 2.32621C6.18059 2.252 6.80946 2.336 7.38841 2.57038C7.96737 2.80476 8.47757 3.18189 8.87147 3.66662"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M8.37831 8.83436C8.08089 9.08393 7.74603 9.28513 7.38604 9.43058"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9.47686 7.26547C9.384 7.5206 9.26335 7.76473 9.11707 7.99345"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9.68592 5.67752C9.70281 5.87062 9.70451 6.06474 9.69099 6.2581"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="6" cy="6" r="0.5" fill={color} />
      <path
        d="M9 3.79999C9 3.21366 9 2.8864 9 2.29999"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9 3.79999L7.5 3.79999"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path d="M6 6L6 3.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="M6 6L7.78885 6.89443"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
