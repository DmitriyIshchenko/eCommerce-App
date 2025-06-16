import {
  type BrandVariants,
  type Theme,
  createDarkTheme,
  createLightTheme,
  tokens,
} from '@fluentui/react-components';

const celestiaTheme: BrandVariants = {
  10: '#020303',
  20: '#161718',
  30: '#232527',
  40: '#2E3134',
  50: '#3A3D41',
  60: '#464A4E',
  70: '#52575C',
  80: '#5E646A',
  90: '#6B7279',
  100: '#788088',
  110: '#878E95',
  120: '#969CA3',
  130: '#A5ABB0',
  140: '#B5B9BE',
  150: '#C5C8CC',
  160: '#D5D7DA',
};

type CustomTheme = Theme & { tokenA: string };

export const lightTheme: CustomTheme = {
  ...createLightTheme(celestiaTheme),
  fontFamilyBase: 'Montserrat, sans-serif;',
  tokenA: '#020303',
  colorCompoundBrandStroke: '#002c4e',
};

export const darkTheme: Theme = {
  ...createDarkTheme(celestiaTheme),
  fontFamilyBase: 'Montserrat, sans-serif;',
};

darkTheme.colorBrandForeground1 = celestiaTheme[110];
darkTheme.colorBrandForeground2 = celestiaTheme[120];

export const customTokens: Record<keyof CustomTheme, string> = {
  ...tokens,
  tokenA: 'var(--tokenA)',
};
