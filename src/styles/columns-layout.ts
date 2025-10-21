import { makeStyles, tokens } from '@fluentui/react-components';

export const useColumnsStyles = makeStyles({
  page: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',

    '@media(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },

  title: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',

    display: 'grid',
    placeContent: 'center',

    padding: tokens.spacingVerticalXXXL,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,

    '@media(max-width: 768px)': {
      position: 'static',
      height: 'auto',
      minHeight: '35vh',
      borderRight: 'none',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
  },

  content: {
    padding: tokens.spacingHorizontalXXXL,
    minHeight: '80vh',

    '@media(max-width: 768px)': {
      overflowY: 'visible',
      padding: tokens.spacingHorizontalM,
      border: 'none',
    },
  },
});
