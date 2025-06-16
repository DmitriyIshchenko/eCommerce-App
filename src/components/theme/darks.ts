import { createDarkTheme } from '@fluentui/react-components';
import { celestiaTheme, sharedTokens } from './celestia';
import type { CustomTheme } from './light';

export const darkTheme: CustomTheme = {
  ...createDarkTheme(celestiaTheme),
  colorCompoundBrandStroke: '#9abfdc',
  ...sharedTokens,
};

darkTheme.colorBrandForeground1 = celestiaTheme[110];
darkTheme.colorBrandForeground2 = celestiaTheme[120];
