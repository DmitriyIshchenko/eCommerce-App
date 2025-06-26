import { makeStyles, tokens } from '@fluentui/react-components';

export const useColumnsStyles = makeStyles({
  left: {
    padding: '40px',
    width: '50%',
    minHeight: '100vh',
    float: 'left',
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    gap: '16px',
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    '@media (max-width: 768px)': {
      position: 'static',
      width: '100%',
      float: 'unset',
      minHeight: '35vh',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
      borderRight: 0,
    },
  },
  right: {
    width: '50%',
    marginLeft: '50%',
    padding: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    '@media (max-width: 768px)': {
      width: '100%',
      marginLeft: 0,
      minHeight: '35vh',
      padding: '40px',
    },
  },
});
