import { makeStyles, tokens } from '@fluentui/react-components';

export const useColumnsStyles = makeStyles({
  page: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',

    '@media(width<768px)': {
      gridTemplateColumns: '1fr',
    },
  },

  left: {
    position: 'sticky',
    top: 0,
    height: '80vh',
    overflowY: 'auto',

    display: 'grid',
    placeContent: 'center',

    padding: tokens.spacingVerticalXXXL,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,

    '@media(width<768px)': {
      position: 'static',
      height: 'auto',
      borderRight: 'none',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
  },

  right: {
    padding: tokens.spacingHorizontalXXXL,
    minHeight: '80vh',

    display: 'grid',
    alignItems: 'center',

    '@media(width<768px)': {
      overflowY: 'visible',
      padding: tokens.spacingHorizontalM,
      border: 'none',
    },
  },
});
