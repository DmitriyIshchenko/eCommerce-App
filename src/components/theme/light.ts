import { type Theme, createLightTheme, tokens } from '@fluentui/react-components';
import { celestiaTheme, sharedTokens } from './celestia';

export type CustomTheme = Theme & { tokenA: string };

export const lightTheme: CustomTheme = {
  ...createLightTheme(celestiaTheme),
  colorCompoundBrandStroke: '#002c4e',
  ...sharedTokens,
};

export const customTokens = {
  tokenA: 'var(--tokenA)',
};
